import React, { useState } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import { useAtom } from 'jotai';
import { nanoid } from 'nanoid';
import sampleImg from '../../../../assets/images/admin/sample.jpg';
import {
  backgroundImageAtom,
  modalVisibleAtom,
  themeAtom,
} from '../../../../atoms/Atom';
import { auth, db, storage } from '../../../../firebase/firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import imageCompression from 'browser-image-compression';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const imageUploadTime = 3000;
const Theme = () => {
  // 사용자 UID 가져오기
  const userUid = auth.currentUser?.uid;

  const [, setTheme] = useAtom(themeAtom); // Jotai의 useAtom 함수 사용
  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom);
  const [, setBackgroundImage] = useAtom(backgroundImageAtom);
  const [loading, setLoading] = useState(false); // 이미지 업로드 로딩 시간

  // 임시로 테마와 배경 이미지 URL을 저장
  const [tempTheme, setTempTheme] = useState(null);
  const [tempBackgroundImage, setTempBackgroundImage] = useState(null);

  // 업로드 할 배경 이미지 압축 옵션 설정
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
  };

  // 이미지 압축 함수
  const compressImage = async (imageFile) => {
    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.error('이미지 압축 실패', error);
      return null;
    }
  };

  // 테마(다크) 클릭 시
  const handleDarkModeClick = () => {
    setTempBackgroundImage('');
    setTempTheme('dark');
    // setTempBackgroundImage('url_of_black_image'); // 검은색 이미지 URL로 변경
  };

  // 테마(라이트) 클릭 시
  const handleLightModeClick = () => {
    setTempBackgroundImage('');
    setTempTheme('light');
  };

  // 테마(배경 이미지 업로드)시 input
  const handleCustomBackgroundClick = () => {
    // setTempTheme('');
    document.getElementById('image-upload').click();
  };

  // 이미지 저장 및 변경
  const onImageChange = async (event) => {
    // 이미지 업로드 시간 추가
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, imageUploadTime);

    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }

    // 압축된 배경 이미지 생성
    // console.log('시작');
    const compressedFile = await compressImage(file);

    // 압축한 배경 이미지 Firebase storage에 업로드
    if (compressedFile) {
      const imageRef = ref(storage, `backgroundImages/${userUid}/${nanoid()}`);
      await uploadBytes(imageRef, compressedFile);
      const imageURL = await getDownloadURL(imageRef);
      setTempBackgroundImage(imageURL);
      // console.log('완료');
      return imageURL;
    }
  };

  // 테마(샘플 이미지) 클릭 시
  const handleSampleBackgroundClick = () => {
    setTempBackgroundImage(sampleImg);
  };

  // 배경 적용하기
  const handleApplyClick = async () => {
    // console.log(backgroundImage);
    // console.log(tempTheme);
    // console.log(tempBackgroundImage);

    // Firestore에 사용자의 테마 및 배경 이미지 정보 저장
    if (userUid) {
      const userDocRef = doc(db, 'users', userUid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        // 문서가 있는 경우 업데이트
        await updateDoc(userDocRef, {
          theme: tempTheme,
          backgroundImage: tempBackgroundImage,
        });
      } else {
        // 문서가 없는 경우 문서 생성 후 업데이트
        await setDoc(userDocRef, {
          theme: tempTheme,
          backgroundImage: tempBackgroundImage,
        });
      }
    }
    if (tempTheme) {
      setTheme(tempTheme);
      document.body.style.backgroundColor =
        tempTheme === 'dark' ? '#333' : '#fff';
      document.body.style.color = tempTheme === 'dark' ? '#fff' : '#000';
    }
    if (tempBackgroundImage !== null) {
      setBackgroundImage(tempBackgroundImage);
      if (tempBackgroundImage) {
        document.body.style.backgroundImage = `url("${tempBackgroundImage}")`;
      } else {
        document.body.style.backgroundImage = '';
      }
    }
    setModalVisible(false);
  };

  return (
    <>
      <Row justify="center">
        <Button
          type="primary"
          onClick={() => setModalVisible(true)}
          style={{ width: '100%' }}
        >
          테마 바꾸기
        </Button>
      </Row>
      <Modal
        title="테마 수정"
        centered
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={300}
      >
        <Row justify="center">
          <Col span={24}>
            <Row gutter={[5, 0]} style={{ margin: '10px 0' }}>
              <Col span={12}>
                <button
                  style={{
                    width: '100%',
                    height: '100px',
                    border: '1px solid #000',
                    borderRadius: '5px',
                    background: 'black',
                    color: '#fff',
                  }}
                  onClick={handleDarkModeClick}
                >
                  다크모드
                </button>
              </Col>
              <Col span={12}>
                <button
                  style={{
                    width: '100%',
                    height: '100px',
                    border: '1px solid #000',
                    borderRadius: '5px',
                    background: '#fff',
                    color: '#000',
                  }}
                  onClick={handleLightModeClick}
                >
                  테마 2(화이트)
                </button>
              </Col>
            </Row>
            <Row gutter={[5, 0]} style={{ margin: '10px 0' }}>
              <Col span={12}>
                <button
                  style={{
                    width: '100%',
                    height: '100px',
                    border: '1px solid #000',
                    borderRadius: '5px',
                  }}
                  onClick={handleCustomBackgroundClick}
                >
                  배경 이미지 선택
                </button>
                {/* 파일 업로드 */}
                <input
                  id="image-upload"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                  onChange={onImageChange}
                />
              </Col>
              <Col span={12}>
                <button
                  style={{
                    width: '100%',
                    height: '100px',
                    border: '1px solid #000',
                    borderRadius: '5px',
                    backgroundImage: `url(${sampleImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  onClick={handleSampleBackgroundClick}
                >
                  샘플 이미지
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            {loading ? (
              <>이미지 파일 업로드 중...</>
            ) : (
              <button
                style={{
                  width: '100%',
                  border: '1px solid #000',
                  borderRadius: '5px',
                }}
                disabled={loading}
                onClick={handleApplyClick}
              >
                적용하기
              </button>
            )}
            {/* <button
              style={{
                width: '100%',
                border: '1px solid #000',
                borderRadius: '5px',
              }}
              disabled={loading}
              onClick={handleApplyClick}
            >
              적용하기
            </button> */}
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Theme;
