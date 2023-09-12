import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Modal, message } from 'antd';
import { auth, db, storage } from '../../../../firebase/firebaseConfig';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import defaultProfileImage from '../../../../assets/images/profile-default-image.png';
import { userNickname, userProfileImage } from '../../../../atoms/Atom';
import imageCompression from 'browser-image-compression';
import { P } from './MyProfile.styles';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
} from 'firebase/storage';

const MyProfile = () => {
  const user = auth.currentUser;
  const userUid = user?.uid;

  const [, setAtomNickname] = useAtom(userNickname); // Header에 넘겨줄 변경된 닉네임
  const [, setAtomPropileImage] = useAtom(userProfileImage); // Header에 넘겨줄 변경된 프로필 이미지
  const [modalVisible, setModalVisible] = useState(false);
  const [nickname, setNickname] = useState('');
  const [updateNick, setUpdateNick] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [updateIntro, setUpdateIntro] = useState('');
  const [previewImage, setPreviewImage] = useState(defaultProfileImage);
  const [selectedImage, setSelectedImage] = useState(null);
  const [updatedImage, setUpdatedImage] = useState(defaultProfileImage);
  const [countNickname, setCountNickname] = useState('');
  const [countIntro, setCountIntro] = useState('');

  const fileInputRef = useRef(); // 이미지 업로드 파일 입력 필드

  // 이메일에서 "@" 앞에 있는 부분을 닉네임으로 사용
  const CREATE_NICKNAME = (email) => {
    const parts = email?.split('@');
    if (parts?.length > 0) {
      return parts[0];
    }
    return '';
  };

  // 이미지 압축 함수
  const COMPRESS_IMAGE = async (imageFile) => {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 300,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      message.error('이미지 압축 실패', error);
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      const uploadUserInfo = async () => {
        const usersCollection = collection(db, 'users');

        // 사용자 이메일, 닉네임 먼저 업데이트
        const userInfo = {
          email: user.email,
          nickname: CREATE_NICKNAME(user.email),
          uid: user.uid,
        };

        // 문서가 존재하는지 확인
        const userDocRef = doc(usersCollection, user.uid);
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

      uploadUserInfo();
    }
  }, [user]);

  // 프로필 이미지 업데이트 함수
  const handleImageUpdate = async () => {
    try {
      if (selectedImage) {
        // 기존 userUID 폴더의 이미지 전체 삭제
        const userImagesRef = ref(storage, `profileImages/${userUid}`);
        const userImagesList = await listAll(userImagesRef);
        await Promise.all(
          userImagesList.items.map(async (item) => {
            await deleteObject(item);
          }),
        );

        // 압축한 프로필 이미지 Firebase에 업로드
        const compressedFile = await COMPRESS_IMAGE(selectedImage);
        if (compressedFile) {
          const imageRef = ref(storage, `profileImages/${userUid}/${nanoid()}`);
          await uploadBytes(imageRef, compressedFile); // 압축된 이미지 업로드
          const imageURL = await getDownloadURL(imageRef);
          setUpdatedImage(imageURL);
          return imageURL;
        }
      } else {
        return updatedImage === defaultProfileImage
          ? defaultProfileImage
          : updatedImage;
      }
    } catch (error) {
      message.error(
        '프로필 이미지를 업데이트 하는 데 실패했습니다. 네트워크 상태를 확인해 주시고 다시 시도해주세요.',
      );
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
      message.error(
        '프로필을 업데이트 하는 데 실패했습니다. 네트워크 상태를 확인해 주시고 다시 시도해주세요.',
      );
    }
  };

  const onChangeImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setCountNickname(e.target.value.length);
  };

  const handleIntroductionChange = (e) => {
    setIntroduction(e.target.value);
    setCountIntro(e.target.value.length);
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
          <input
            type="file"
            accept=" image/*"
            onChange={onChangeImageFile}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <P.UploadButton onClick={() => fileInputRef.current.click()}>
            프로필 이미지 업로드
          </P.UploadButton>
          <P.InfoContainer>
            <p>닉네임</p>
            <P.GuidText>{countNickname}/10자</P.GuidText>
          </P.InfoContainer>
          <P.ModalInput
            placeholder="닉네임을 작성해 주세요."
            value={nickname}
            onChange={handleNicknameChange}
            maxLength={10}
            autoFocus
          />
          <P.InfoContainer>
            <p>소개</p>
            <P.GuidText>{countIntro}/25자</P.GuidText>
          </P.InfoContainer>
          <P.ModalInput
            placeholder="소개를 작성해 주세요."
            value={introduction}
            onChange={handleIntroductionChange}
            style={{ marginBottom: '20px' }}
            maxLength={25}
          />
        </P.ProfileContainer>
      </Modal>
    </div>
  );
};

export default MyProfile;
