import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal } from 'antd';
import { auth, db, storage } from '../../../../firebase/firebaseConfig';
import { nanoid } from 'nanoid';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import defaultProfileImage from '../../../../assets/images/profile-default-image.png';
import imageCompression from 'browser-image-compression';
import { P } from './MyProfile.styles';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';
import { useAtom } from 'jotai';
import { userNickname, userProfileImage } from '../../../../atoms/Atom';

const MyProfile = () => {
  const user = auth.currentUser;
  // const userEmail = auth.currentUser?.email;
  const userUid = auth.currentUser?.uid;

  useEffect(() => {
    if (user) {
      const uplodeUserNickname = async () => {
        const usersCollection = collection(db, 'users');
        const userUid = user.uid;

        // 이메일에서 "@" 앞에 있는 부분을 추출하여 닉네임으로 사용
        const extractNickname = (email) => {
          const parts = email?.split('@');
          if (parts?.length > 0) {
            return parts[0];
          }
          return '';
        };

        // 사용자 이메일, 닉네임 먼저 업데이트
        const userInfo = {
          email: user.email,
          nickname: extractNickname(user.email),
          uid: userUid,
        };

        // 문서가 존재하는지 확인
        const userDocRef = doc(usersCollection, userUid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          // 문서가 없는 경우 문서 생성 후 업데이트
          await setDoc(userDocRef, userInfo);
          setAtomNickname(userInfo.nickname);
        }

        // 화면 다시 그리기
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
      };

      uplodeUserNickname();
    }
  }, [user]);

  const [, setAtomNickname] = useAtom(userNickname);
  const [, setAtomPropileImage] = useAtom(userProfileImage);
  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [updateNick, setUpdateNick] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [updateIntro, setUpdateIntro] = useState('');
  const [previewImage, setPreviewImage] = useState(defaultProfileImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [updatedImage, setUpdatedImage] = useState(defaultProfileImage);

  // 프로필 이미지 업데이트 함수
  const handleImageUpdate = async () => {
    try {
      if (!selectedImage) {
        return updatedImage === defaultProfileImage
          ? defaultProfileImage
          : updatedImage;
      } else {
        // 기존 userUID 폴더의 이미지 전체 삭제
        const userImagesRef = ref(storage, `profileImages/${userUid}`);
        const userImagesList = await listAll(userImagesRef);

        // userImagesList.items 배열에 있는 모든 이미지 삭제
        await Promise.all(
          userImagesList.items.map(async (item) => {
            await deleteObject(item);
          }),
        );

        // 이미지 압축 함수
        const compressImage = async (imageFile) => {
          const options = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 300,
            useWebWorker: true,
          };
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
          const compressedFile = await compressImage(selectedImage);
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
        nickname: nickname,
        introduction: introduction,
      };

      // 프로필 이미지 업데이트 및 이미지 URL 업데이트
      const imageURL = await handleImageUpdate();
      if (imageURL) {
        userInfo.profileImageURL = imageURL;
      }

      await updateDoc(userDocRef, userInfo);
      setUpdateNick(nickname);
      setUpdateIntro(introduction);
      setAtomNickname(nickname);
      setAtomPropileImage(imageURL);

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
        <P.ProfilBox span={24}>
          <P.ProfileImage src={updatedImage} />
          <P.ModalOpenButton
            onClick={() => {
              setModalVisible(true);
            }}
          ></P.ModalOpenButton>
        </P.ProfilBox>
      </Row>
      <Row justify="center" align="middle" style={{ padding: '0' }}>
        <Col>
          <P.InfoBox>{updateNick}</P.InfoBox>
          <P.InfoBox>{updateIntro}</P.InfoBox>
        </Col>
      </Row>
      <Modal
        title={<P.ModalTitle>내 정보 수정하기</P.ModalTitle>}
        centered
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
        width={300}
        footer={
          <P.ActivButton
            key="upload"
            type="primary"
            onClick={handleProfileUpdate}
          >
            저장하기
          </P.ActivButton>
        }
      >
        {/* 모달 내용 */}
        <P.ProfileContainer>
          {/* 프로필 이미지 미리보기 */}
          <P.ProfileImageBox>
            <P.PreviewImage src={previewImage} alt="이미지 미리보기" />
          </P.ProfileImageBox>
          <P.FileUploadButton
            type="file"
            accept=" image/*"
            onChange={onChangeImgaeFile}
          />
          <P.label style={{ marginTop: '25px' }}>닉네임</P.label>
          <P.ModalInput
            placeholder="닉네임을 작성해 주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <P.label>소개</P.label>

          <P.ModalInput
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
