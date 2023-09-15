import React, { useEffect, useState } from 'react';
import { C } from '../CustomerBlocks.style';
import {
  query,
  collection,
  where,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import useInputs from '../../../../hooks/useInputs';
import { useAtom } from 'jotai';
import { modalVisibleAtom } from '../../../../atoms/Atom';
import { LeftOutlined } from '@ant-design/icons';
import IconModalConfirm from '../../../../assets/images/common/icon/icon-modalConfirm.png';
import { message } from 'antd';

const MailingService = () => {
  const navigate = useNavigate();
  const { uid } = useParams();
  const userUid = uid;

  const [{ name, phoneNumber, email }, onChange] = useInputs({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const [isNameValid, setIsNameValid] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom);

  useEffect(() => {
    // firebase에서 데이터 불러오기
    const fetchData = async (userUid) => {
      if (userUid) {
        // Firestore에서 유저에 해당하는 데이터를 가져오기 위한 쿼리 생성
        try {
          // 쿼리 실행하여 데이터 가져오기
          const q = query(
            collection(db, 'template'),
            where('userId', '==', userUid),
            where('blockKind', '==', 'mailing'),
            orderBy('createdAt'),
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const firstDocument = querySnapshot.docs[0]; // 첫 번째 문서를 가져옴
            const data = firstDocument.data();
            setTitle(data?.title);
            setDesc(data?.description);
          }
        } catch (error) {
          message.error('데이터 가져오기 오류:', error);
        }
      }
    };
    fetchData(userUid);
  }, [userUid]);

  const submitButtonClick = async () => {
    try {
      // Firestore에 데이터 추가
      await addDoc(collection(db, 'userTemplate'), {
        dataKind: 'mailingData',
        name,
        phoneNumber,
        email,
        createdAt: serverTimestamp(),
        userId: userUid,
      });

      setModalVisible(true);
    } catch (error) {
      message.error('저장 중 오류 발생:', error.message);
    }
  };

  return (
    <>
      <C.HeaderStyle>
        <button onClick={() => navigate(`/${userUid}`)}>
          <LeftOutlined />
        </button>
        <p>{title}</p>
      </C.HeaderStyle>

      <C.Container>
        <h2>{desc}</h2>
        <label htmlFor="name">
          <p>이름</p>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          placeholder="이름을 입력해주세요."
          onChange={(e) => {
            onChange(e);
            setIsNameValid(e.target.value === '');
          }}
          autoFocus
        />
        {isNameValid && <span>필수입력 항목입니다.</span>}

        <label htmlFor="phoneNumber">
          <p>연락처</p>
        </label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          value={phoneNumber}
          placeholder="010-1234-5678"
          onChange={(e) => {
            onChange(e);
            setIsPhoneNumberValid(e.target.value === '');
          }}
          pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        />
        {isPhoneNumberValid && <span>필수입력 항목입니다.</span>}

        <label htmlFor="email">
          <p>이메일 주소</p>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          placeholder="이메일 주소"
          onChange={(e) => {
            onChange(e);
            setIsEmailValid(e.target.value === '');
          }}
        />
        {isEmailValid && <span>필수입력 항목입니다.</span>}

        <C.ButtonArea>
          <C.SubmitButton
            type="button"
            disabled={!name || !phoneNumber || !email}
            onClick={() => {
              submitButtonClick();
              setModalVisible(true);
            }}
          >
            신청하기
          </C.SubmitButton>
        </C.ButtonArea>
      </C.Container>

      <C.Modal
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
          <img src={IconModalConfirm} alt="완료아이콘" />
          <h1>신청완료!</h1>
          <p>메일링 서비스 신청이 완료되었습니다.</p>
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
      </C.Modal>
    </>
  );
};

export default MailingService;
