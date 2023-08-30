import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import defaultProfileImage from '../../../assets/images/profile-default-image.png';
import { useParams } from 'react-router-dom';
import { S } from './Profile.styles';

const Profile = () => {
  const { uid } = useParams();

  const [viewNickname, setViewNickname] = useState('닉네임을 설정해 주세요');
  const [viewIntroduction, setViewIntroduction] =
    useState('소개를 작성해 주세요');
  const [viewProfileImage, setViewProfileImage] = useState(defaultProfileImage);

  // uid로 저장된 문서가 있을 경우 프로필 정보 가져오기
  useEffect(() => {
    if (uid) {
      const userDocRef = doc(db, 'users', uid);
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
  }, [uid]);

  return (
    <div>
      <Row justify="center" align="middle" style={{ padding: '20px 0' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <S.ProfileImage src={viewProfileImage} />
          <div style={{ margin: '20px 0 10px' }}>{viewNickname}</div>
          <div style={{ margin: '20px 0' }}>{viewIntroduction}</div>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
