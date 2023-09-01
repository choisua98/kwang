import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import { auth, db, storage } from '../../../../firebase/firebaseConfig';
import { nanoid } from 'nanoid';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import defaultProfileImage from '../../../../assets/images/profile-default-image.png';
import imageCompression from 'browser-image-compression';
import { themeAtom } from '../../../../atoms/Atom';
import { P } from './MyProfile.styles';
import { useAtom } from 'jotai';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';

const MyProfile = () => {
  const user = auth.currentUser;
  const userEmail = user?.email;
  const userUid = auth.currentUser?.uid;
  const [theme] = useAtom(themeAtom);

  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [updateNick, setUpdateNick] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [updateIntro, setUpdateIntro] = useState('');

  // 이메일에서 "@" 앞에 있는 부분을 추출하여 닉네임으로 사용
  const extractNickname = (email) => {
    const parts = email?.split('@');
    if (parts?.length > 0) {
      return parts[0];
    }
    return '';
  };

  useEffect(() => {
    if (userEmail) {
      const extractedNickname = extractNickname(userEmail);
      setNickname(extractedNickname);
      setUpdateNick(extractedNickname);
      localStorage.setItem('userNickname', extractedNickname); // 첫 로그인 시 로컬 스토리지에 저장
    }
  }, [userEmail]);

  useEffect(() => {
    const storedNickname = localStorage.getItem('userNickname');
    if (storedNickname) {
      setNickname(storedNickname);
      setUpdateNick(storedNickname);
    }
  }, []);

  const [previewImage, setPreviewImage] = useState(defaultProfileImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [updatedImage, setUpdatedImage] = useState(defaultProfileImage);

  // userUid 저장된 문서가 있을 경우 프로필 정보 가져오기
  useEffect(() => {
    if (userUid) {
      const userDocRef = doc(db, 'users', userUid);
      const fetchProfileInfo = async () => {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setNickname(userData.nickname || '');
          setUpdateNick(userData.nickname || '');
          setIntroduction(userData.introduction || '');
          setUpdateIntro(userData.introduction || '');
          setUpdatedImage(userData?.profileImageURL || defaultProfileImage);
          setPreviewImage(userData?.profileImageURL || defaultProfileImage);
        }
      };
      fetchProfileInfo();
    }
  }, [userUid]);

  // 프로필 이미지 업데이트 함수
  const handleImageUpdate = async () => {
    try {
      if (selectedImage) {
        // 기존 userUID 폴더의 이미지 전체 삭제
        const userImagesRef = ref(storage, `profileImages/${userUid}`);
        const userImagesList = await listAll(userImagesRef);

        // userImagesList.items 배열에 있는 모든 이미지 삭제
        await Promise.all(
          userImagesList.items.map(async (item) => {
            await deleteObject(item);
          }),
        );

        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 300,
          useWebWorker: true,
        };

        // 이미지 압축 함수
        const compressedImage = async (imageFile) => {
          try {
            const compressedFile = await imageCompression(imageFile, options);
            return compressedFile;
          } catch (error) {
            console.error('이미지 압축 실패', error);
            return null;
          }
        };

        // 압축한 프로필 이미지 Firebase에 업로드
        if (selectedImage) {
          const compressedFile = await compressedImage(selectedImage);
          if (compressedFile) {
            const imageRef = ref(
              storage,
              `profileImages/${userUid}/${nanoid()}`,
            );
            await uploadBytes(imageRef, compressedFile); // 압축된 이미지 업로드
            const imageURL = await getDownloadURL(imageRef);
            setUpdatedImage(imageURL);
            return imageURL;
          }
        }
        return null;
      } else {
        return updatedImage;
      }
    } catch (error) {
      console.error('프로필 이미지 업데이트 실패', error);
      return null;
    }
  };

  // 프로필 정보를 업데이트 하는 버튼 함수
  const handleProfileUpdate = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const userDocRef = doc(usersCollection, userUid);

      // 사용자 정보 업데이트
      const userInfo = {
        email: userEmail,
        nickname: nickname,
        introduction: introduction,
        theme: theme,
        uid: userUid,
      };

      // 프로필 이미지 업데이트 및 이미지 URL 업데이트
      const imageURL = await handleImageUpdate();
      if (imageURL) {
        userInfo.profileImageURL = imageURL;
      }

      // 문서가 존재하는지 확인
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // 문서가 있는 경우 업데이트
        await updateDoc(userDocRef, userInfo);
      } else {
        // 문서가 없는 경우 문서 생성 후 업데이트
        await setDoc(userDocRef, userInfo);
      }

      setUpdateNick(nickname);
      setUpdateIntro(introduction);
      console.log('업데이트 함수 속 닉네임', nickname);

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
      // setUpdatedImage(defaultProfileImage); // 이미지 변경 시 갱신
    }
  };

  return (
    <div>
      <Row justify="center" align="middle" style={{ padding: '20px 0' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          {/* <Profile /> */}
          <P.ProfileImage src={updatedImage} />
          <div style={{ margin: '20px 0 10px' }}>{updateNick}</div>
          <div style={{ margin: '20px 0' }}>{updateIntro}</div>
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
        <P.ProfileContainer>
          {/* 프로필 이미지 미리보기 */}
          <P.PreviewImage src={previewImage} alt="이미지 미리보기" />
          <input type="file" accept=" image/*" onChange={onChangeImgaeFile} />
          <div style={{ marginTop: '20px' }}>닉네임</div>
          <P.ProfileInput
            placeholder="변경하실 닉네임을 작성해주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <div style={{ marginTop: '5px' }}>소개</div>

          <P.ProfileInput
            placeholder="소개를 작성해 주세요."
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
        </P.ProfileContainer>
      </Modal>
    </div>
  );
};

export default MyProfile;
