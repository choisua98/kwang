import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../../../../firebase/firebaseConfig';
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { blocksAtom } from '../../../../atoms/Atom';
import { useAtom } from 'jotai';
import { Modal } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import imageCompression from 'browser-image-compression';
import { O } from '../Blocks.styles';
import IconFormCheck from '../../../../assets/images/common/icon/icon-Formcheck.png';
import { LeftOutlined } from '@ant-design/icons';

const BannerImage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 사용자 UID 가져오기
  const userUid = auth.currentUser?.uid;

  // 현재 블록 ID 가져오기
  const blockId = location.state ? location.state.blocksId : null;

  // 전역 상태에서 블록 정보 가져오기
  const [blocks] = useAtom(blocksAtom);

  // blocks 배열에서 선택된 블록 찾기
  const selectedBlock = blocks.find((block) => block.id === blockId);

  // 실제로 업로드한 이미지 정보를 저장하는 배열
  const [uploadedImages, setUploadedImages] = useState([]);

  // 최대 업로드 가능한 이미지 개수
  const maxUploads = 4;

  useEffect(() => {
    if (blockId) {
      // 이미지 데이터를 가져와서 업로드된 이미지 배열을 초기화
      const initialImages = selectedBlock?.images || [];
      setUploadedImages(initialImages);
    }
  }, [blockId, selectedBlock]);

  // 이미지 업로드 시 실행되는 함수
  const handleImageChange = async (e) => {
    if (uploadedImages.length >= maxUploads) {
      // 이미지 개수가 최대 개수에 도달한 경우 모달 창을 띄워 알림 표시
      Modal.info({
        content: `이미지는 최대 ${maxUploads}장까지 첨부할 수 있어요.`,
      });
      return;
    }

    const file = e.target.files[0];

    if (file) {
      setUploadedImages([...uploadedImages, file]);
    }
  };

  // "저장하기" 버튼 클릭 시 실행되는 함수
  const handleAddButtonClick = async (e) => {
    e.preventDefault();

    if (!userUid) {
      alert('작업을 위해 로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }

    try {
      // 이미지 압축 설정 옵션
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 300,
        useWebWorker: true,
      };

      // 이미지 압축 함수
      const compressedImage = async (imageFile) => {
        try {
          const compressedFile = await imageCompression(imageFile, options);
          return compressedFile;
        } catch (error) {
          console.error('이미지 압축 실패', error);
          return null;
        }
      };

      // Firestore에 데이터 추가
      const docRef = await addDoc(collection(db, 'template'), {
        blockKind: 'bannerimage',
        createdAt: serverTimestamp(),
        userId: userUid,
      });

      // 저장된 문서의 ID 가져오기
      const docId = docRef.id;

      // 이미지 업로드 및 URL 저장
      const imageUrls = [];

      for (const imageFile of uploadedImages) {
        // 이미지 압축
        const compressedFile = await compressedImage(imageFile);

        if (compressedFile) {
          const imageRef = ref(
            storage,
            `bannerImages/${docId}/${imageFile.name}`,
          );
          await uploadBytes(imageRef, compressedFile);
          const imageUrl = await getDownloadURL(imageRef);
          imageUrls.push(imageUrl);
        }
      }

      // 이미지 URL들을 Firestore 문서에 업데이트
      await updateDoc(docRef, {
        images: imageUrls,
      });

      // 저장 완료 알림 후 어드민 페이지로 이동
      alert('저장 완료!');
      navigate(`/admin/${userUid}`);
    } catch (error) {
      console.error('저장 중 오류 발생:', error.message);
    }
  };

  // "수정하기" 버튼 클릭 시 실행되는 함수
  const handleEditButtonClick = async (e) => {
    e.preventDefault();

    try {
      // Firestore에 데이터 업로드
      const docRef = doc(db, 'template', blockId);

      // 이미지 업로드 및 URL 저장
      const imageUrls = [];
      for (const imageFile of uploadedImages) {
        if (typeof imageFile === 'string') {
          imageUrls.push(imageFile);
        } else {
          const imageRef = ref(
            storage,
            `bannerImages/${blockId}/${imageFile.name}`,
          );
          await uploadBytes(imageRef, imageFile);
          const imageUrl = await getDownloadURL(imageRef);
          imageUrls.push(imageUrl);
        }
      }

      // 이미지 URL들을 Firestore 문서에 업데이트
      await updateDoc(docRef, {
        images: imageUrls,
      });

      // 수정 완료 알림 후 어드민 페이지로 이동
      alert('수정 완료!');
      navigate(`/admin/${userUid}`);
    } catch (error) {
      console.error('수정 중 오류 발생:', error.message);
    }
  };

  // "삭제하기" 버튼 클릭 시 실행되는 함수
  const handleRemoveButtonClick = async (id) => {
    const folderRef = ref(storage, `bannerImages/${id}`);

    try {
      const shouldDelete = window.confirm('정말 삭제하시겠습니까?');
      if (shouldDelete) {
        // 폴더 내의 모든 파일 가져오기
        const fileList = await listAll(folderRef);

        // 폴더 내의 각 파일을 순회하며 삭제
        await Promise.all(
          fileList.items.map(async (file) => {
            await deleteObject(file);
          }),
        );

        // 사용자 확인 후 Firestore 문서 삭제
        await deleteDoc(doc(db, 'template', id));

        alert('삭제 완료!');
        navigate(`/admin/${userUid}`);
      }
    } catch (error) {
      console.error('삭제 중 오류 발생:', error.message);
    }
  };

  // 이미지 삭제 시 실행되는 함수
  const handleRemoveImage = (index) => {
    const updatedImages = [...uploadedImages];
    updatedImages.splice(index, 1);
    setUploadedImages(updatedImages);
  };

  return (
    <>
      <O.HeaderStyle>
        <button onClick={() => navigate(`/admin/${userUid}`)}>
          <LeftOutlined />
        </button>
        <p>설정</p>
      </O.HeaderStyle>

      <O.FormGuideStyle>
        <h2>
          배너 이미지 추가 <img src={IconFormCheck} alt="폼체크아이콘" />
        </h2>
        <p>이미지를 추가해 나만의 커스텀 배너를 꾸며보세요!</p>
      </O.FormGuideStyle>

      <O.Container
        onSubmit={blockId ? handleEditButtonClick : handleAddButtonClick}
      >
        <label>
          배너 이미지를 추가해주세요
          <span>*</span>
        </label>

        <O.ImageContainer>
          {uploadedImages.length >= maxUploads ? (
            <>
              <div onClick={handleImageChange}>
                <label
                  htmlFor="imageInput"
                  className={
                    uploadedImages.length >= maxUploads ? 'disabled' : ''
                  }
                >
                  <CameraOutlined style={{ fontSize: '30px' }} />
                  <span>{`${uploadedImages.length} / ${maxUploads}`}</span>
                </label>
              </div>
            </>
          ) : (
            <>
              <label htmlFor="imageInput">
                <div>
                  <CameraOutlined style={{ fontSize: '30px' }} />
                </div>
                <span>{`${uploadedImages.length} / ${maxUploads}`}</span>
              </label>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </>
          )}

          {uploadedImages.map((image, index) => {
            return (
              <div key={index}>
                <div
                  className="square-preview"
                  style={{
                    backgroundImage: `url(${
                      typeof image === 'string'
                        ? image
                        : URL.createObjectURL(image)
                    })`,
                  }}
                />
                <button type="button" onClick={() => handleRemoveImage(index)}>
                  -
                </button>
              </div>
            );
          })}
        </O.ImageContainer>
        <O.ButtonArea>
          <O.SubmitButton type="submit" disabled={uploadedImages.length === 0}>
            {blockId ? '수정하기' : '저장하기'}
          </O.SubmitButton>
          <O.SubmitButton
            type="button"
            color="#313733"
            onClick={() => handleRemoveButtonClick(blockId)}
          >
            삭제하기
          </O.SubmitButton>
        </O.ButtonArea>
      </O.Container>
    </>
  );
};

export default BannerImage;
