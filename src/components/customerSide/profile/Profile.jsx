import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import defaultProfileImage from '../../../assets/images/profile-default-image.png';

import { S } from './Profile.styles';
import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const [viewNickname, setViewNickname] = useState('');
  const [viewIntroduction, setViewIntroduction] = useState('');
  const [viewProfileImage, setViewProfileImage] = useState('');
  const { uid } = useParams();
  const userUid = uid;

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
          setViewProfileImage(userData.profileImageURL || defaultProfileImage);
        }
      };
      fetchProfileInfo();
    }
  }, [userUid]);

  return (
    <div>
      <Row justify="center" align="middle" style={{ padding: '20px 0' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <S.ProfileImage src={viewProfileImage} />
          <div style={{ margin: '20px 0 10px' }}>{viewNickname}</div>
          <div style={{ margin: '20px 0' }}>{viewIntroduction}</div>
        </Col>
      </Row>
      <button
        onClick={() => {
          navigate(`/${userUid}/mailing`);
        }}
      >
        메일로 이동
      </button>
      {/* 테스트용도의 버튼입니다. 메일링 블록이 생겼을 때(url자체를 입력해서 이동하면 전역 상태관리가 사라짐)*/}
    </div>
  );
};

export default Profile;
