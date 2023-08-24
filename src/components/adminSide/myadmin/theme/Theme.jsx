import React, { useState, useEffect } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import { useAtom } from 'jotai';
import sampleImg from '../../../../assets/images/admin/sample.jpg';
import {
  backgroundImageAtom,
  modalVisibleAtom,
  themeAtom,
} from '../../../../atoms/Atom';

const Theme = () => {
  const [theme, setTheme] = useAtom(themeAtom); // Jotai의 useAtom 함수 사용
  const [modalVisible, setModalVisible] = useAtom(modalVisibleAtom);
  const [backgroundImage, setBackgroundImage] = useAtom(backgroundImageAtom);
  const [tempTheme, setTempTheme] = useState(null);
  const [tempBackgroundImage, setTempBackgroundImage] = useState(null);

  useEffect(() => {
    // 페이지 로드시나 테마 변경시 스타일
    applyThemeStyles();
  }, [theme, backgroundImage]);

  useEffect(() => {
    // 페이지가 로드될 때 로컬 스토리지에서 테마 정보 불러오기
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      // 로컬 상태에 테마 설정
      setTheme(savedTheme);
    }
    // 로컬 스토리지에서 저장된 배경 이미지 불러오기
    const savedBackgroundImage = localStorage.getItem('backgroundImage');
    if (savedBackgroundImage) {
      setBackgroundImage(savedBackgroundImage);
    }
  }, []);

  const applyThemeStyles = () => {
    document.body.style.height = '100vh';

    // 배경 이미지 설정
    if (tempTheme === 'dark' && tempBackgroundImage === null) {
      setBackgroundImage(null);
      localStorage.removeItem('backgroundImage');
    } else {
      if (tempBackgroundImage !== null) {
        setBackgroundImage(tempBackgroundImage);
        // 로컬 스토리지에 배경 이미지 저장
        localStorage.setItem('backgroundImage', tempBackgroundImage);
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

  // 적용하기 버튼 클릭 시 전역 테마 상태 변경
  const handleApplyClick = () => {
    if (tempTheme) {
      setTheme(tempTheme);
      // 로컬 스토리지에 테마 저장
      localStorage.setItem('theme', tempTheme);
    }
    if (tempBackgroundImage !== null) {
      if (tempBackgroundImage === '') {
        // 배경 이미지를 제거한 경우 로컬 스토리지에서도 제거
        localStorage.removeItem('backgroundImage');
      } else {
        // 배경 이미지 저장
        localStorage.setItem('backgroundImage', tempBackgroundImage);
      }
      setBackgroundImage(tempBackgroundImage);
    }
    applyThemeStyles();
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
