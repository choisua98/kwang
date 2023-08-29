import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { P } from '../../adminSide/myadmin/myprofile/MyProfile.styles';
import defaultProfileImage from '../../../assets/images/profile-default-image.png';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { uid } = useParams();
  // console.log(id);

  const [viewNickname, setViewNickname] = useState('');
  const [viewIntroduction, setViewIntroduction] = useState('');
  const [viewProfileImage, setViewProfileImage] = useState('');

  // userUID로 저장된 문서가 있을 경우 프로필 정보 가져오기
  useEffect(() => {
    if (uid) {
      const userDocRef = doc(db, 'users', uid);
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
  }, [uid]);

  return (
    <div>
      <Row justify="center" align="middle" style={{ padding: '20px 0' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <P.ProfileImage src={viewProfileImage} />
          <div style={{ margin: '20px 0 10px' }}>{viewNickname}</div>
          <div style={{ margin: '20px 0' }}>{viewIntroduction}</div>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
