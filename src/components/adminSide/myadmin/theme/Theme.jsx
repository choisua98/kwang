import React, { useState, useEffect } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import { useAtom } from 'jotai';
import sampleImg from '../../../../assets/images/admin/sample.jpg';
import { modalVisibleAtom, themeAtom } from '../../../../atoms/Atom';
import { auth, db } from '../../../../firebase/firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

const Theme = () => {
  // 사용자 UID 가져오기
  const userUid = auth.currentUser?.uid;

  const [theme, setTheme] = useAtom(themeAtom); // Jotai의 useAtom 함수 사용
  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [tempTheme, setTempTheme] = useState(null);
  const [tempBackgroundImage, setTempBackgroundImage] = useState(null);

  useEffect(() => {
    // 페이지 로드시나 테마 변경시 스타일
    applyThemeStyles();
  }, []);

  const applyThemeStyles = () => {
    document.body.style.height = '100vh';

    // 배경 이미지 설정
    if (tempTheme === 'dark' && tempBackgroundImage === null) {
      setBackgroundImage(null);
    } else {
      if (tempBackgroundImage !== null) {
        setBackgroundImage(tempBackgroundImage);
      }
    }

    if (theme === 'dark') {
      document.body.style.backgroundColor = '#333';
      document.body.style.color = '#fff';
    } else {
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = '#000';
    }

    // 배경 이미지 설정 (상태가 업데이트 된 후)
    if (backgroundImage) {
      document.body.style.backgroundImage = `url("${backgroundImage}")`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
    } else {
      document.body.style.backgroundImage = '';
    }
  };

  // 테마 1 버튼 클릭 시
  const handleThemeClick = () => {
    setTempTheme('dark');
    setTempBackgroundImage(null);
  };

  // 테마 2 버튼 클릭 시
  const handleTheme2Click = () => {
    setTempTheme('light');
    setTempBackgroundImage('');
  };

  // 테마 3 버튼 클릭 시 input
  const handleTheme3Click = () => {
    document.getElementById('image-upload').click();
  };

  // 이미지 저장 및 변경
  const onImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 테마 4 버튼 클릭 시
  const handleTheme4Click = () => {
    setTempBackgroundImage(sampleImg);
  };

  const handleApplyClick = async () => {
    if (tempTheme) {
      setTheme(tempTheme);
      localStorage.setItem('theme', tempTheme);
    }
    if (tempBackgroundImage !== null) {
      if (tempBackgroundImage === '') {
        localStorage.removeItem('backgroundImage');
      } else {
        localStorage.setItem('backgroundImage', tempBackgroundImage);
      }
      setBackgroundImage(tempBackgroundImage);
    }
    applyThemeStyles();
    setModalVisible(false);

    // Firestore에 사용자의 테마 정보 저장
    if (userUid) {
      const userDocRef = doc(db, 'users', userUid);
      await updateDoc(userDocRef, {
        theme: tempTheme,
        backgroundImage: tempBackgroundImage,
      });
    }
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
            <Row gutter={[10, 20]}>
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
                  onClick={handleThemeClick}
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
                  onClick={handleTheme2Click}
                >
                  테마 2(화이트)
                </button>
              </Col>
            </Row>
            <Row gutter={[10, 40]}>
              <Col span={12}>
                <button
                  style={{
                    width: '100%',
                    height: '100px',
                    border: '1px solid #000',
                    borderRadius: '5px',
                  }}
                  onClick={handleTheme3Click}
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
                  onClick={handleTheme4Click}
                >
                  샘플 이미지
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <button
              style={{
                width: '100%',
                border: '1px solid #000',
                borderRadius: '5px',
              }}
              onClick={handleApplyClick}
            >
              적용하기
            </button>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Theme;
