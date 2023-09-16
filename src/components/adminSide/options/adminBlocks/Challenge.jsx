import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useInputs from '../../../../hooks/useInputs';
import { useAtom, useAtomValue } from 'jotai';
import {
  blocksAtom,
  deleteModalVisibleAtom,
  modalVisibleAtom,
  userAtom,
} from '../../../../atoms/Atom';
import { db, storage } from '../../../../firebase/firebaseConfig';
import { uploadImagesAndUpdateFirestore } from '../../../../utils/uploadUtils';
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
import { deleteObject, listAll, ref } from 'firebase/storage';
import {
  handleCloseDeleteModal,
  handleCloseModal,
} from '../../../../utils/\butils';
import _ from 'lodash';
import { O } from '../Blocks.styles';
import IconFormCheck from '../../../../assets/images/common/icon/icon-Formcheck.webp';
import IconModalConfirm from '../../../../assets/images/common/icon/icon-modalConfirm.webp';

// ant Design
import { CameraOutlined, LeftOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Modal, Space, message } from 'antd';

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;

// 오늘 이전의 날짜는 선택 불가능하도록 설정하는 함수
const disabledDate = (current) => {
  return current && current < dayjs().endOf('day');
};

const Challenge = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAtomValue(userAtom);
  const userUid = user?.uid;

  // 현재 블록 ID 가져오기
  const blockId = location.state ? location.state.blocksId : null;

  // 전역 상태에서 블록 정보 가져오기
  const [blocks] = useAtom(blocksAtom);

  // blocks 배열에서 선택된 블록 찾기
  const selectedBlock = blocks.find((block) => block.id === blockId);

  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom);
  const [deleteModalVisible, setDeleteModalVisible] = useAtom(
    deleteModalVisibleAtom,
  );

  const [{ title, description }, onChange] = useInputs({
    title: selectedBlock?.title || '',
    description: selectedBlock?.description || '',
  });

  // 제목과 설명의 글자 수를 추적하는 상태
  const [titleTextCount, setTitleTextCount] = useState(0);
  const [descriptionTextCount, setDescriptionTextCount] = useState(0);

  // 데이터 저장 작업 중인지 여부를 나타내는 상태 변수
  const [isSaving, setIsSaving] = useState(false);

  // 제목, 설명 필드의 유효성을 나타내는 상태 변수
  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);

  // 선택한 날짜 정보를 저장할 상태 변수들
  const [startDate, setStartDate] = useState(
    selectedBlock ? selectedBlock?.startDate : '',
  );
  const [endDate, setEndDate] = useState(
    selectedBlock ? selectedBlock?.endDate : '',
  );

  // 실제로 업로드한 이미지 정보를 저장하는 배열
  const [uploadedImages, setUploadedImages] = useState(
    selectedBlock?.images || [],
  );

  // 최대 업로드 가능한 이미지 개수
  const MAX_UPLOADS = 4;

  // 이미지 업로드 시 실행되는 함수
  const handleImageChange = async (e) => {
    const selectedFiles = e.target.files;

    if (uploadedImages.length >= MAX_UPLOADS) {
      // 이미지 개수가 최대 개수에 도달한 경우 모달 창을 띄워 알림 표시
      Modal.info({
        content: `이미지는 최대 ${MAX_UPLOADS}장까지 첨부할 수 있어요.`,
      });
      return;
    }

    // 선택한 이미지들을 새로운 배열로 만들어 업로드 이미지 배열에 합침
    const newImages = [...uploadedImages, ...Array.from(selectedFiles)];

    setUploadedImages(newImages);
  };

  // "저장하기" 버튼 클릭 시 실행되는 함수
  const handleAddButtonClick = useCallback(async () => {
    if (!userUid) {
      message.error(
        '작업을 위해 로그인이 필요합니다. 로그인 페이지로 이동합니다.',
      );
      navigate('/login');
      return;
    }

    setIsSaving(true);

    try {
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

      // Firestore에 데이터 추가
      const docRef = await addDoc(collection(db, 'template'), {
        title,
        description,
        startDate,
        endDate,
        blockKind: 'challenge',
        createdAt: serverTimestamp(),
        userId: userUid,
        blockId: blockId,
      });

      // 이미지 업로드 및 URL 저장
      await uploadImagesAndUpdateFirestore(
        uploadedImages,
        blockId,
        docRef,
        storage,
        'callengeImages',
      );

      setModalVisible(true);
    } catch (error) {
      message.error('저장 중 오류 발생:', error.message);
    }
  }, [
    userUid,
    navigate,
    setIsSaving,
    title,
    description,
    startDate,
    endDate,
    uploadedImages,
    setModalVisible,
  ]);

  // "수정하기" 버튼 클릭 시 실행되는 함수
  const handleEditButtonClick = useCallback(async () => {
    try {
      // Firestore에 데이터 업로드
      const docRef = doc(db, 'template', blockId);
      await updateDoc(docRef, {
        title,
        description,
        startDate,
        endDate,
      });

      // 이미지 업로드 및 URL 저장
      await uploadImagesAndUpdateFirestore(
        uploadedImages,
        blockId,
        docRef,
        storage,
        'callengeImages',
      );

      setModalVisible(true);
    } catch (error) {
      message.error('수정 중 오류 발생:', error.message);
    }
  }, [
    blockId,
    title,
    description,
    startDate,
    endDate,
    uploadedImages,
    setModalVisible,
  ]);

  // 디바운싱된 함수 생성
  const debouncedSubmit = _.debounce(
    blockId ? handleEditButtonClick : handleAddButtonClick,
    300,
  );

  // "삭제하기" 버튼 클릭 시 실행되는 함수
  const handleRemoveButtonClick = useCallback(
    async (id) => {
      const folderRef = ref(storage, `callengeImages/${id}`);

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

          setDeleteModalVisible(true);
        }
      } catch (error) {
        message.error('삭제 중 오류 발생:', error.message);
      }
    },
    [setDeleteModalVisible],
  );

  // 챌린지 기간 선택 시 실행되는 함수
  const periodPickInput = (_, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  // 이미지 삭제 시 실행되는 함수
  const handleRemoveImage = useCallback(
    (index) => {
      const updatedImages = [...uploadedImages];
      updatedImages.splice(index, 1);
      setUploadedImages(updatedImages);
    },
    [uploadedImages],
  );

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
          함께해요 챌린지 <img src={IconFormCheck} alt="폼체크아이콘" />
        </h2>
        <p>
          팬, 구독자들과 함께 챌린지활동을 하고 싶은 경우
          <span>[함께 챌린지 하기 폼]</span>을 추가해보세요! 댓글기능이 있어
          참여 하고 있는 사람들을 서로가 볼 수 있어요.
        </p>
      </O.FormGuideStyle>

      <O.Container
        onSubmit={(e) => {
          e.preventDefault();
          debouncedSubmit();
        }}
      >
        <label htmlFor="title">
          함께해요 챌린지 이름
          <p>{titleTextCount}/20자</p>
        </label>
        <div className="input-container">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="함께해요 챌린지 🔥"
            value={title}
            onChange={(e) => {
              onChange(e);
              setIsTitleValid(e.target.value === '');
              setTitleTextCount(e.target.value.length);
            }}
            maxLength={20}
            autoFocus
          />
          {isTitleValid && <span>필수입력 항목입니다.</span>}
        </div>

        <O.ImageContainer>
          {uploadedImages.length >= MAX_UPLOADS ? (
            <>
              <div onClick={handleImageChange}>
                <label>
                  <CameraOutlined />
                  <span>{`${uploadedImages.length} / ${MAX_UPLOADS}`}</span>
                </label>
              </div>
            </>
          ) : (
            <>
              <label htmlFor="file">
                <CameraOutlined />
                <span>{`${uploadedImages.length} / ${MAX_UPLOADS}`}</span>
              </label>
              <input
                id="file"
                type="file"
                accept="image/*"
                multiple // 다중 선택
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
          챌린지 상세설명
          <p>{descriptionTextCount}/80자</p>
        </label>
        <div className="input-container">
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="상세 설명을 입력해주세요."
            value={description}
            onChange={(e) => {
              onChange(e);
              setIsDescriptionValid(e.target.value === '');
              setDescriptionTextCount(e.target.value.length);
            }}
            maxLength={80}
          />
          {isDescriptionValid && <span>필수입력 항목입니다.</span>}
        </div>

        <label htmlFor="rangePicker">챌린지 기간</label>
        <Space direction="vertical" size={12}>
          <RangePicker
            id="rangePicker"
            disabledDate={disabledDate}
            popupClassName="customRangePickerPopup"
            value={[
              startDate ? dayjs(startDate) : null,
              endDate ? dayjs(endDate) : null,
            ]}
            onChange={periodPickInput}
          />
          {!startDate || !endDate ? <span>필수 입력 항목입니다.</span> : null}
        </Space>

        <O.ButtonArea>
          <O.SubmitButton
            type="submit"
            disabled={!title || !description || !startDate || !endDate}
          >
            {isSaving ? '저장 중...' : blockId ? '수정하기' : '저장하기'}
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
        onCancel={() => handleCloseModal(setModalVisible, navigate)}
        footer={null}
        closable={false}
        width={330}
      >
        <div>
          <img src={IconModalConfirm} alt="완료아이콘" />
          <h1>{blockId ? '수정완료!' : '저장완료!'}</h1>
          <p>{blockId ? '수정이 완료되었습니다.' : '저장이 완료되었습니다.'}</p>
        </div>
        <button
          type="button"
          onClick={() => handleCloseModal(setModalVisible, navigate)}
        >
          닫기
        </button>
      </O.Modal>

      <O.Modal
        title=""
        centered
        open={deleteModalVisible}
        onCancel={() => handleCloseDeleteModal(setDeleteModalVisible, navigate)}
        footer={null}
        closable={false}
        width={330}
      >
        <div>
          <img src={IconModalConfirm} alt="완료아이콘" />
          <h1>삭제완료!</h1>
          <p>삭제가 완료되었습니다.</p>
        </div>
        <button
          type="button"
          onClick={() =>
            handleCloseDeleteModal(setDeleteModalVisible, navigate)
          }
        >
          닫기
        </button>
      </O.Modal>
    </>
  );
};

export default Challenge;
