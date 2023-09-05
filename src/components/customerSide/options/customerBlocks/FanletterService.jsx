import React, { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { Modal } from 'antd';
import { useAtom } from 'jotai';
import { modalVisibleAtom } from '../../../../atoms/Atom';
import { useParams } from 'react-router-dom';
import { db } from '../../../../firebase/firebaseConfig';
import { C } from '../CustomerBlocks.style';

const FanletterService = () => {
  const { uid } = useParams();
  const userUid = uid; // 사용자 UID 가져오기
  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom); // 모달
  const [templates, setTemplates] = useState([]); // 템플릿 데이터 저장
  const [description, setDescription] = useState(''); // TextArea 값을 저장
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const fetchTemplates = async () => {
      if (userUid) {
        // Firestore의 template 컬렉션 userId가 현재 로그인한 사용자의 uid와 같은 문서들을 찾기
        const templatesCollection = collection(db, 'template');
        // 현재 사용자에 대한 문서만 가져오기
        const q = query(
          templatesCollection,
          where('userId', '==', userUid),
          where('blockKind', '==', 'fanletter'),
        );
        // 쿼리 실행하고 결과값 받기
        const templateSnapshot = await getDocs(q);
        setTemplates(
          templateSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
        );
      }
    };

    const fetchUserData = async () => {
      if (userUid) {
        // Firestore의 users 컬렉션에서 현재 사용자의 UID와 일치하는 문서 가져오기
        const userDocRef = collection(db, 'users');
        const userQuery = query(userDocRef, where('uid', '==', userUid));
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          // 문서가 존재하면 해당 문서의 닉네임 값을 가져와 nickname 상태에 설정
          const userData = userSnapshot.docs[0].data();
          setNickname(userData.nickname);
        }
      }
    };

    fetchTemplates();
    fetchUserData();
  }, [userUid]);

  // 파이어스토어에 데이터 전송
  const submitButtonClick = async () => {
    try {
      await addDoc(collection(db, 'userTemplate'), {
        dataKind: 'fanletterData',
        description,
        createdAt: serverTimestamp(),
        userId: userUid,
      });
      setModalVisible(true);
    } catch (error) {
      console.error('팬레터 데이터 추가 오류: ', error);
    }
  };

  return (
    <C.Container>
      {templates.map((template) => {
        return (
          <div key={template.id}>
            <h1>{template.title}</h1>
            <h2>{template.description}</h2>
          </div>
        );
      })}

      <label htmlFor="description">
        TO. {nickname}에게<span>*</span>
        <p>{description.length}/100자</p>
      </label>
      <textarea
        id="description"
        name="description"
        value={description}
        maxLength={100}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="설명을 작성해 주세요"
      />

      <C.ButtonArea>
        <C.SubmitButton
          type="button"
          disabled={!description}
          onClick={() => {
            submitButtonClick();
            setModalVisible(true);
          }}
        >
          발송하기
        </C.SubmitButton>
      </C.ButtonArea>
      <Modal
        title=""
        centered
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        closable={false}
        width={300}
      >
        <p>팬레터 전송이 완료 되었습니다.</p>
        <C.SubmitButton
          type="button"
          color="#313733"
          onClick={() => setModalVisible(false)}
        >
          확인
        </C.SubmitButton>
      </Modal>
    </C.Container>
  );
};

export default FanletterService;
