import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { P } from '../../adminSide/myadmin/myprofile/MyProfile.styles';
import defaultProfileImage from '../../../assets/images/profile-default-image.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userUidAtom } from '../../../atoms/Atom';

const Profile = () => {
  const navigate = useNavigate();
  const { nickname } = useParams();
  const [userUid, setUserUid] = useAtom(userUidAtom);
  const [viewNickname, setViewNickname] = useState('');
  const [viewIntroduction, setViewIntroduction] = useState('');
  const [viewProfileImage, setViewProfileImage] = useState('');
  const createrNickname = nickname;
  console.log(createrNickname);
  //createrNickname이랑 같은 nickname을 가지고 있는 id -> userUid
  useEffect(() => {
    // firebase에서 데이터 불러오기
    const fetchData = async (nickname) => {
      if (createrNickname) {
        try {
          const q = query(
            collection(db, 'users'),
            where('nickname', '==', createrNickname),
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const firstDocument = querySnapshot.docs[0]; //
            // const data = firstDocument.data();
            console.log(firstDocument.id);
            setUserUid(firstDocument.id);
          }
        } catch (error) {
          console.error('데이터 가져오기 오류:', error);
        }
      }
    };
    fetchData(userUid);
    console.log(userUid);
  }, []);
  console.log(userUid);
  // userUid로 저장된 문서가 있을 경우 프로필 정보 가져오기
  useEffect(() => {
    if (userUid) {
      const userDocRef = doc(db, 'users', userUid);
      const fetchProfileInfo = async () => {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setViewNickname(userData.nickname || '');
          setViewIntroduction(userData.introduction || '');
          setViewProfileImage(userData?.profileImageURL || defaultProfileImage);
        }
      };
      fetchProfileInfo();
    }
  }, [userUid]);

  return (
    <div>
      <Row justify="center" align="middle" style={{ padding: '20px 0' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <P.ProfileImage src={viewProfileImage} />
          <div style={{ margin: '20px 0 10px' }}>{viewNickname}</div>
          <div style={{ margin: '20px 0' }}>{viewIntroduction}</div>
        </Col>
      </Row>
      <button
        onClick={() => {
          navigate(`/${nickname}/mailing`);
        }}
      >
        메일로 이동
      </button>
      {/* 테스트용도의 버튼입니다. 메일링 블록이 생겼을 때(링크로 이동하면 전역 상태관리가 사라짐)*/}
    </div>
  );
};

export default Profile;
