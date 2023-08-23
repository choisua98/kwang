import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Upload } from 'antd';
import { styled } from 'styled-components';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { useAtom } from 'jotai';
import { storage } from '../firebase/firebaseConfig';
import { userAtom } from '../atoms/Atom';

const AdminProfile = () => {
  const initialUserData = {
    nickname: 'JohnDoe',
    introduction: "Hello, I'm John!",
    profileImage:
      'https://blog.kakaocdn.net/dn/BkkCC/btqAM4Aqw0K/05gsHFKwF1T7DvhGK1Z5R0/img.jpg',
  };

  const [user, setUser] = useAtom(userAtom);
  console.log({ user });

  const [nickname, setNickname] = useState(initialUserData.nickname);
  const [updateNickname, setUpdateNickname] = useState(nickname); // 닉네임 업데이트
  const [input, setInput] = useState(initialUserData.introduction);
  const [updateInput, setUpdateInput] = useState(input); // 소개 업데이트
  const [imageList, setImageList] = useState([initialUserData.profileImage]);

  const [modalVisible, setModalVisible] = useState(false);

  // 업로드된 프로필 이미지를 담을 state
  const [uploadImage, setUploadImage] = useState(null);

  // 미리보기 URL을 저장할 state
  const [imagePreview, setImagePreview] = useState(null);

  // storage에 저장되어 있는 이미지들을 담을 state
  // const [imageList, setImageList] = useState([]);

  // storage에 저장되어 있는 profileImage 폴더를 지정
  const imageListRef = ref(storage, 'pofileImage/');

  const onChangeHandleImage = (e) => {
    const selectedFile = e.target.files[0]; // 첫 번째 파일 선택
    console.log({ selectedFile });
    setUploadImage(selectedFile); // 선택한 파일 설정
    setImagePreview(URL.createObjectURL(selectedFile)); // 미리보기 URL 생성
  };

  // 이미지를 업로드하는 함수
  const handleUploadImage = () => {
    // 닉네임, 소개 업데이트
    setNickname(updateNickname);
    setInput(updateInput);

    // 선택한 이미지가 없는 경우 return.
    if (uploadImage === null) return;
    // 이미지들을 담을 파이어베이스 저장소 생성
    const imageRef = ref(
      storage,
      // storage에 저장하는 파일명이 겹칠 수 있기 때문에 nanoid로 고유 아이디 추가
      `pofileImage/ ${uploadImage.name + nanoid()}`,
    );
    // uploadBytes( 첫 번째 인자: 저장소 / 두 번째 인자: 이미지 파일 )
    uploadBytes(imageRef, uploadImage).then(() => {
      // 이미지 업로드 후 useState로 변경된 이미지 업데이트
      getDownloadURL(imageRef)
        .then((url) => {
          setImageList((prev) => [url, ...prev]);
        })
        .then(() => {
          setModalVisible(false);
        });
    });
  };

  // 이미지들을 가져와서 보여주기 위한 역할
  useEffect(() => {
    listAll(imageListRef).then((response) => {
      if (response.items.length > 0) {
        // 최근에 업데이트된 이미지 가져오기
        const latestImage = response.items[0];
        getDownloadURL(latestImage).then((url) => {
          setImageList([url]); // 가장 최근에 업데이트된 이미지만 배열에 저장
        });
      }
    });
  }, []);

  return (
    <div>
      <Row justify="center" align="middle" style={{ padding: '20px 0' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          {/* <Profile /> */}
          {imageList.length > 0 && (
            <ProfileImage src={imageList[0]} alt="프로필 이미지" />
          )}

          <div style={{ margin: '20px 0 10px' }}>{nickname}</div>
          <div style={{ margin: '20px 0' }}>{input}</div>
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
            onClick={handleUploadImage}
            style={{ width: '100%' }}
          >
            저장하기
          </Button>
        }
      >
        {/* 모달 내용 */}
        <ProfileContainer>
          {/* 프로필 이미지 미리보기 */}
          {imagePreview && <PreviewImage src={imagePreview} alt="미리보기" />}
          <input type="file" onChange={onChangeHandleImage} />
          <div style={{ marginTop: '20px' }}>닉네임</div>
          <ProfileInput
            placeholder="변경하실 닉네임을 작성해주세요."
            value={updateNickname}
            onChange={(e) => {
              setUpdateNickname(e.target.value);
            }}
          />
          <div style={{ marginTop: '5px' }}>소개</div>

          <ProfileInput
            placeholder="소개를 작성해 주세요."
            value={updateInput}
            onChange={(e) => {
              setUpdateInput(e.target.value);
            }}
            style={{ marginBottom: '20px' }}
          />
        </ProfileContainer>
      </Modal>
    </div>
  );
};

export default AdminProfile;

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
