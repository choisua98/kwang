import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Upload } from 'antd';
import { styled } from 'styled-components';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getStorage,
} from 'firebase/storage';
import { db, storage } from '../../../../firebase/firebaseConfig';
import { nanoid } from 'nanoid';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const MyProfile = () => {
  // 로그인된 유저 정보 가져오기
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  console.log(user?.email);

  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setNickname] = useState(user?.email);
  const [introduction, setIntroduction] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [updateImage, setUpdateImage] = useState('');

  // 프로필 정보를 업데이트 하는 버튼 함수
  const handleProfileUpdate = async () => {
    try {
      // 이전 프로필 이미지 삭제
      if (updateImage) {
        const previousImageRef = ref(storage, updateImage);
        await deleteObject(previousImageRef);
      }

      // Firebase에 프로필 이미지 업로드
      if (selectedImage) {
        const imageRef = ref(storage, `profileImages/${user.uid}/${nanoid()}`);
        await uploadBytes(imageRef, selectedImage); // storage에 이미지 업로드
        const imageURL = await getDownloadURL(imageRef);
        setUpdateImage(imageURL);
      }

      // Firebase에 사용자 데이터 업데이트
      // const updatedUserData = {
      //   nickname,
      //   introduction,
      //   profileImage: updateImage, // 업로드된 이미지 URL 사용
      // };

      // TODO: Firestore 업데이트 로직 추가
      // const userDocRef = doc(db, 'users/${uid}'); // users 컬렉션의 해당 사용자 문서 참조
      // console.log(userDocRef);
      // await updateDoc(userDocRef, updatedUserData); // 문서 업데이트

      setModalVisible(false); // 모달 닫기
    } catch (error) {
      console.error('프로필 업데이트 실패', error);
    }
  };

  useEffect(() => {
    getStorage();
  }, []);

  return (
    <div>
      <Row justify="center" align="middle" style={{ padding: '20px 0' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          {/* <Profile /> */}
          <ProfileImage src={updateImage} />
          <div style={{ margin: '20px 0 10px' }}>{user?.email}</div>
          <div style={{ margin: '20px 0' }}></div>
          <Button
            onClick={() => {
              setModalVisible(true);
            }}
          >
            내 정보 수정하기
          </Button>
        </Col>
      </Row>
      <Modal
        title="내 정보 수정하기"
        centered
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
        width={300}
        footer={
          <Button
            key="upload"
            type="primary"
            onClick={handleProfileUpdate}
            style={{ width: '100%' }}
          >
            저장하기
          </Button>
        }
      >
        {/* 모달 내용 */}
        <ProfileContainer>
          {/* 프로필 이미지 미리보기 */}
          <PreviewImage src={previewImage} alt="이미지 미리보기" />
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setSelectedImage(file);
                setPreviewImage(URL.createObjectURL(file));
              }
            }}
          />
          <div style={{ marginTop: '20px' }}>닉네임</div>
          <ProfileInput
            placeholder="변경하실 닉네임을 작성해주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <div style={{ marginTop: '5px' }}>소개</div>

          <ProfileInput
            placeholder="소개를 작성해 주세요."
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
        </ProfileContainer>
      </Modal>
    </div>
  );
};

export default MyProfile;

const ProfileInput = styled.input`
  width: 96%;
  height: 25px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover; // 이미지가 잘리지 않도록 설정
  background-color: #d6d6d6;
  border-radius: 100%;
`;

const PreviewImage = styled.img`
  width: 140px;
  height: 140px;
  object-fit: cover; // 이미지가 잘리지 않도록 설정
  background-color: #d6d6d6;
  border-radius: 100%;
`;

// {/* <Upload
//   name="profileImage"
//   type="file"
//   beforeUpload={() => false}
//   onChange={() => {}}
//   showUploadList={true}
// >
//   <Button>프로필 이미지 업로드</Button>
// </Upload>; */}
