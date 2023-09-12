import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../../../../firebase/firebaseConfig';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { useAtom } from 'jotai';
import {
  blocksAtom,
  currentActionAtom,
  modalVisibleAtom,
} from '../../../../atoms/Atom';
import { O } from '../Blocks.styles';
import IconFormCheck from '../../../../assets/images/common/icon/icon-Formcheck.png';
import IconModalConfirm from '../../../../assets/images/common/icon/icon-modalConfirm.png';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Modal, Space } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import { LeftOutlined } from '@ant-design/icons';

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
// 오늘 이전의 날짜는 선택 불가능하도록 설정하는 함수
const disabledDate = (current) => {
  return current && current < dayjs().endOf('day');
};
const Reservation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userUid = auth.currentUser?.uid;
  const blockId = location.state ? location.state.blocksId : null;
  const [blocks] = useAtom(blocksAtom);
  const selectedBlock = blocks.find((block) => block.id === blockId) || '';

  const [currentAction, setCurrentAction] = useAtom(currentActionAtom);
  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom);

  const [title, setTitle] = useState(selectedBlock?.title || '');
  const [description, setDescription] = useState(
    selectedBlock?.description || '',
  );
  const [titleCount, setTitleCount] = useState(0);
  const [descriptionCount, setDescriptionCount] = useState(0);

  const [numberOfPeople, setNumberOfPeople] = useState(
    selectedBlock?.numberOfPeople || '',
  );
  const [pickDate, setPickDate] = useState(
    selectedBlock ? selectedBlock?.pickDate : '',
  );
  const [startDate, setStartDate] = useState(
    selectedBlock ? selectedBlock?.startDate : '',
  );
  const [endDate, setEndDate] = useState(
    selectedBlock ? selectedBlock?.endDate : '',
  );

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

  // 저장 버튼
  const handleAddButtonClick = async (e) => {
    e.preventDefault();

    if (!userUid) {
      alert('작업을 위해 로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/login');
      return;
    }

    // Block 정렬을 위해 숫자로 blockId 값 지정
    const querySnapshot = await getDocs(
      query(collection(db, 'template'), where('userId', '==', userUid)),
    );
    let maxNum = 0;
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.blockId && typeof data.blockId === 'number') {
        // "id" 값이 숫자이고 "userId"가 userUid와 일치하는 경우만 처리
        maxNum = Math.max(maxNum, data.blockId);
      }
    });
    const blockId = maxNum + 1;

    try {
      // Firestore에 데이터 추가
      const docRef = await addDoc(collection(db, 'template'), {
        title,
        description,
        numberOfPeople,
        pickDate,
        startDate,
        endDate,
        blockKind: 'reservation',
        createdAt: serverTimestamp(),
        blockId: blockId,
        userId: userUid,
      });

      // 저장된 문서의 ID 가져오기
      const docId = docRef.id;

      // 이미지 업로드 및 URL 저장
      const imageUrls = [];
      for (const imageFile of uploadedImages) {
        const imageRef = ref(
          storage,
          `reservationImages/${docId}/${imageFile.name}`,
        );
        await uploadBytes(imageRef, imageFile);
        const imageUrl = await getDownloadURL(imageRef);
        imageUrls.push(imageUrl);
      }

      // 이미지 URL들을 Firestore 문서에 업데이트
      await updateDoc(docRef, {
        images: imageUrls,
      });

      setModalVisible(true);
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
      await updateDoc(docRef, {
        title,
        description,
        numberOfPeople,
        pickDate,
        startDate,
        endDate,
      });
      // 이미지 업로드 및 URL 저장
      const imageUrls = [];
      for (const imageFile of uploadedImages) {
        if (typeof imageFile === 'string') {
          imageUrls.push(imageFile);
        } else {
          const imageRef = ref(
            storage,
            `reservationImages/${blockId}/${imageFile.name}`,
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

      setModalVisible(true);
    } catch (error) {
      console.error('수정 중 오류 발생:', error.message);
    }
  };

  const datePickInput = (_, dateString) => {
    setPickDate(dateString);
  };

  const periodPickInput = (_, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };
  // "삭제하기" 버튼 클릭 시 실행되는 함수
  const handleRemoveButtonClick = async (id) => {
    const folderRef = ref(storage, `reservationImages/${id}`);

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
          예약 서비스 <img src={IconFormCheck} alt="폼체크아이콘" />
        </h2>
        <p>
          팬, 구독자가 예약을 할 수 있는 신청 폼 입니다. 강연 등 인원수가 제한된
          행사를 개최한다면 <span>[예약신청 폼]</span>을 활용해보세요. 고객관리
          페이지에서 신청목록을 확인하실 수 있습니다.
        </p>
      </O.FormGuideStyle>

      <O.Container
        onSubmit={blockId ? handleEditButtonClick : handleAddButtonClick}
      >
        <label htmlFor="title">
          예약 서비스 이름
          <p>{titleCount}/20자</p>
        </label>
        <div className="input-container">
          <input
            id="title"
            placeholder="예약 서비스 🗓️"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleCount(e.target.value.length);
            }}
            maxLength={20}
            autoFocus
          />
          {!title ? <span>필수 입력 항목입니다.</span> : null}
        </div>

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
              <O.Preview key={index}>
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
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                />
              </O.Preview>
            );
          })}
        </O.ImageContainer>

        <label htmlFor="description">
          예약 상세설명
          <p>{descriptionCount}/80자</p>
        </label>
        <div className="input-container">
          <textarea
            id="description"
            placeholder="상세 설명을 입력해 주세요."
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setDescriptionCount(e.target.value.length);
            }}
            maxLength={80}
          />
          {!description ? <span>필수 입력 항목입니다.</span> : null}
        </div>

        <label htmlFor="number">모집 인원</label>
        <div className="input-container">
          <input
            id="number"
            type="number"
            placeholder={'모집 인원을 선택해주세요'}
            value={numberOfPeople}
            onChange={(e) => {
              setNumberOfPeople(e.target.value);
            }}
            min={0}
          />
          {!numberOfPeople ? <span>필수 입력 항목입니다.</span> : null}
        </div>

        <label htmlFor="datePicker">행사 날짜</label>
        <Space direction="vertical" size={12}>
          <DatePicker
            id="datePicker"
            value={pickDate ? dayjs(pickDate) : undefined}
            disabledDate={disabledDate}
            onChange={datePickInput}
            style={{ width: '100%' }}
            popupClassName="datePickerPopup"
          />
          {!pickDate ? <span>필수 입력 항목입니다.</span> : null}
        </Space>

        <label htmlFor="rangePicker">모집 기간</label>
        <Space direction="vertical" size={12}>
          <RangePicker
            id="rangePicker"
            value={[
              startDate ? dayjs(startDate) : null,
              endDate ? dayjs(endDate) : null,
            ]}
            onChange={periodPickInput}
            disabledDate={disabledDate}
            style={{ width: '100%' }}
            popupClassName="periodPickerPopup"
          />
          {!startDate || !endDate ? <span>필수 입력 항목입니다.</span> : null}
        </Space>

        <O.ButtonArea>
          <O.SubmitButton
            type="submit"
            disabled={
              !title ||
              !description ||
              !numberOfPeople ||
              !pickDate ||
              !startDate ||
              !endDate
            }
          >
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

      <O.Modal
        title=""
        centered
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          navigate(-1);
        }}
        footer={null}
        closable={false}
        width={330}
      >
        <div>
          <img src={IconModalConfirm} alt="발송완료아이콘" />
          <h1>신청완료!</h1>
          <p>예약서비스 신청이 완료되었습니다.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setModalVisible(false);
            navigate(-1);
          }}
        >
          닫기
        </button>
      </O.Modal>
    </>
  );
};
export default Reservation;
