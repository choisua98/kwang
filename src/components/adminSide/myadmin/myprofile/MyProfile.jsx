import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Upload } from 'antd';
import { styled } from 'styled-components';
import { db, storage } from '../../../../firebase/firebaseConfig';
import { nanoid } from 'nanoid';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import defaultProfileImage from '../../../../assets/images/profile-default-image.png';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import { useAtom } from 'jotai';
import { userAtom } from '../../../../atoms/Atom';

const MyProfile = () => {
  const user = useAtom(userAtom);
  const userEmail = user[0]?.email;
  const userUID = user[0]?.uid;
  console.log(userEmail);
  console.log(userUID);

  // 이메일에서 "@" 앞에 있는 부분을 추출하여 닉네임으로 사용
  const extractNickname = (email) => {
    const parts = email?.split('@');
    if (parts?.length > 0) {
      return parts[0];
    }
    return '';
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setNickname] = useState(extractNickname(userEmail));
  const [introduction, setIntroduction] = useState('');

  const [previewImage, setPreviewImage] = useState(defaultProfileImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [updatedImage, setUpdatedImage] = useState(defaultProfileImage);

  // 프로필 이미지 업데이트 함수
  const handleImageUpdate = async () => {
    // 기존 userUID 폴더의 이미지 전체 삭제
    const userImagesRef = ref(storage, `profileImages/${userUID}`);
    const userImagesList = await listAll(userImagesRef);

    // userImagesList.items 배열에 있는 모든 이미지 삭제
    await Promise.all(
      userImagesList.items.map(async (item) => {
        await deleteObject(item);
      }),
    );

    // Firebase에 프로필 이미지 업로드
    if (selectedImage) {
      const imageRef = ref(storage, `profileImages/${userUID}/${nanoid()}`);
      await uploadBytes(imageRef, selectedImage); // storage에 이미지 업로드
      const imageURL = await getDownloadURL(imageRef);
      setUpdatedImage(imageURL);
    }
  };

  // 프로필 정보를 업데이트 하는 버튼 함수
  const handleProfileUpdate = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const userDocRef = doc(usersCollection, userUID);

      // 사용자 정보 업데이트
      const userInfo = {
        email: userEmail,
        nickname: nickname,
        introduction: introduction,
        profileImageURL: updatedImage,
      };

      // 문서가 존재하는지 확인
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // 문서가 있는 경우 업데이트
        await updateDoc(userDocRef, userInfo);
      } else {
        // 문서가 없는 경우 문서 생성 후 업데이트
        await setDoc(userDocRef, userInfo);
      }

      await handleImageUpdate();

      setModalVisible(false); // 모달 닫기
    } catch (error) {
      console.error('프로필 업데이트 실패', error);
    }
  };

  const onChangeImgaeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Row justify="center" align="middle" style={{ padding: '20px 0' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          {/* <Profile /> */}
          <ProfileImage src={updatedImage} />
          <div style={{ margin: '20px 0 10px' }}>닉네임</div>
          <div style={{ margin: '20px 0' }}>소개</div>
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
          <input type="file" onChange={onChangeImgaeFile} />
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
