import React, { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { useAtom } from 'jotai';
import { modalVisibleAtom } from '../../../../atoms/Atom';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../../firebase/firebaseConfig';
import { C } from '../CustomerBlocks.style';
import { LeftOutlined } from '@ant-design/icons';
import IconModalConfirm from '../../../../assets/images/common/icon/icon-modalConfirm.png';
import { message } from 'antd';

const FanletterService = () => {
  const navigate = useNavigate();
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
      message.error('팬레터 데이터 추가 오류: ', error);
    }
  };

  return (
    <>
      {templates.map((template) => {
        return (
          <div key={template.id}>
            <C.HeaderStyle>
              <button onClick={() => navigate(`/${userUid}`)}>
                <LeftOutlined />
              </button>
              <p>{template.title}</p>
            </C.HeaderStyle>

            <C.Container>
              <h3>크리에이터 인삿말</h3>
              <h2>{template.description}</h2>

              <label htmlFor="description">
                팬레터를 작성해주세요.<p>{description.length}/200자</p>
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                maxLength={200}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="TO. 크왕이에게"
                autoFocus
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
                <h1>발송완료!</h1>
                <p>펜레터가 발송되었습니다.</p>
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
          </div>
        );
      })}
    </>
  );
};

export default FanletterService;
