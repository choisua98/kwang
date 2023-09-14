import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';
import defaultProfileImage from '../../../../assets/images/profile-default-image.png';

import { S } from './Profile.styles';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [viewNickname, setViewNickname] = useState('');
  const [viewIntroduction, setViewIntroduction] = useState('');
  const [viewProfileImage, setViewProfileImage] = useState(defaultProfileImage);
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
    <S.Container>
      <Row justify="center" align="middle" s>
        <Col span={24}>
          <S.ProfileImage src={viewProfileImage} />
          <div>{viewNickname}</div>
          <div>{viewIntroduction}</div>
        </Col>
      </Row>
    </S.Container>
  );
};

export default Profile;
