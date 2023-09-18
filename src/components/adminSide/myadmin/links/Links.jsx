import React, { useEffect, useRef, useState } from 'react';
import { Col, Input, Row, message } from 'antd';
import { L } from './Links.styles';
import { ReactComponent as Link } from '../../../../assets/images/admin/link.svg';
import { db, storage } from '../../../../firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  orderBy,
  serverTimestamp,
  deleteDoc,
} from 'firebase/firestore';
import imageCompression from 'browser-image-compression';
import GithubIcon from '../../../../assets/images/admin/linkIcon/icon-github.webp';
import InstagramIcon from '../../../../assets/images/admin/linkIcon/icon-instagram.webp';
import KakaoIcon from '../../../../assets/images/admin/linkIcon/icon-kakao.webp';
import NaverIcon from '../../../../assets/images/admin/linkIcon/icon-naver.webp';
import TiktokIcon from '../../../../assets/images/admin/linkIcon/icon-tiktok.webp';
import TwitterIcon from '../../../../assets/images/admin/linkIcon/icon-twitter.webp';
import YoutubeIcon from '../../../../assets/images/admin/linkIcon/icon-youtube.webp';
import FacebookIcon from '../../../../assets/images/admin/linkIcon/icon-facebook.webp';
import { useAtom, useAtomValue } from 'jotai';
import { themeAtom, userAtom } from '../../../../atoms/Atom';

const Links = () => {
  const user = useAtomValue(userAtom);
  const userUid = user?.uid;
  const [modalVisible, setModalVisible] = useState(false);
  const [urlText, setUrlText] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [linksData, setLinksData] = useState([]);
  const [defaultLinks, setDefaultLinks] = useState([0, 1, 2]);
  const [editingLinkId, setEditingLinkId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const fileInputRef = useRef();
  const [theme] = useAtom(themeAtom);
  // Icon Image
  const [selectedIcon, setSelectedIcon] = useState('');

  const iconImages = [
    {
      id: 1,
      name: 'icon-kakao',
      src: KakaoIcon,
    },
    {
      id: 2,
      name: 'icon-youtube',
      src: YoutubeIcon,
    },
    {
      id: 3,
      name: 'icon-instagram',
      src: InstagramIcon,
    },
    {
      id: 4,
      name: 'icon-facebook',
      src: FacebookIcon,
    },
    {
      id: 5,
      name: 'icon-naver',
      src: NaverIcon,
    },
    {
      id: 6,
      name: 'icon-twitter',
      src: TwitterIcon,
    },
    {
      id: 7,
      name: 'icon-github',
      src: GithubIcon,
    },
    {
      id: 8,
      name: 'icon-tiktok',
      src: TiktokIcon,
    },
  ];

  const iconClickHandler = async (e) => {
    const clickedIcon = e.target;
    const clickedIconName = clickedIcon.getAttribute('name');

    if (selectedIcon) {
      selectedIcon.style.border = 'none';
    }
    clickedIcon.style.border = '2px solid var(--color-accent)';
    setSelectedIcon(clickedIcon);

    const iconStorageRef = ref(storage, `linkIcon/${clickedIconName}.png`);
    const iconDownloadURL = await getDownloadURL(iconStorageRef);
    setImageUrl(iconDownloadURL);
  };

  const handleUrlChange = (e) => {
    setUrlText(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setImageUrl(null);
  };

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

  const handleNewLinkClick = () => {
    setModalVisible(true);
    setEditingLinkId(null);
    setUrlText('');
    setImageUrl(null);
  };

  const uploadImage = async () => {
    if (!imageFile) return;
    setUploadingImage(true);

    let fileToUpload = imageFile;
    const compressedFile = await compressImage(imageFile);
    if (compressedFile) {
      fileToUpload = compressedFile;
      let storageRef = ref(storage, 'linkImages/' + fileToUpload.name);
      let taskSnapshot;
      try {
        taskSnapshot = await uploadBytesResumable(storageRef, fileToUpload);
      } catch (error) {
        message.error(error);
      }
      let downloadURL = await getDownloadURL(taskSnapshot.ref);
      setUploadingImage(false);
      return downloadURL;
    } else {
      message.error('이미지 압축 실패');
      setUploadingImage(false);
      return;
    }
  };

  // 저장 버튼(링크 데이터를 Firestore에 저장 및 업데이트)
  const handleSaveClick = async () => {
    // 이미지 URL 빈 값일때 알림창 띄우기
    if (!imageUrl) {
      alert('이미지를 입력해 주세요.');
      return;
    }
    if (!urlText) {
      alert('URL을 입력해 주세요.');
      return;
    }
    // URL 유효성 검사
    const urlRegExp =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (!urlRegExp.test(urlText)) {
      message.error(
        '잘못된 URL 형식입니다.(https://kwang.com) 형식으로 입력해주세요',
      );
      return;
    }

    // 기존 이미지 URL을 기본값으로 사용
    // let imageUrlToSave = imageUrl ? imageUrl : iconImageUrl;
    let imageUrlToSave = imageUrl;
    // 새 이미지 파일이 선택되면 업로드하고 새 URL을 가져오기
    if (imageFile) {
      try {
        imageUrlToSave = await uploadImage();
      } catch (error) {
        message.error('업로드 중인 이미지 오류: ', error);
        return;
      }
    }
    try {
      if (editingLinkId) {
        // editingLinkId가 있으면 기존 링크 편집
        await updateDoc(doc(db, 'links', editingLinkId), {
          uid: userUid,
          url: urlText,
          imageUrl: imageUrlToSave,
        });
      } else {
        // 없으면 새 링크 생성
        const docRef = await addDoc(collection(db, 'links'), {
          uid: userUid,
          url: urlText,
          imageUrl: imageUrlToSave,
          createdAt: serverTimestamp(),
        });
        setEditingLinkId(docRef.id); // 새롭게 생성된 문서 ID 설정
        if (defaultLinks.length > 0) setDefaultLinks(defaultLinks.slice(1)); // 기본 링크 버튼 하나 삭제
      }
      setModalVisible(false);
      setUrlText(''); // 입력 필드 초기화
      setImageFile(null);
      setImageUrl(null); // URL 초기화
      fileInputRef.current.value = ''; // 파일 입력 필드 초기화
      fetchLinks(); // 링크 저장 후 최신 데이터 가져오기
      setEditingLinkId(null); // 수정 중인 링크 ID 초기화
    } catch (error) {
      console.error('업데이트 중 오류:', error);
      return;
    }
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm('정말로 이 링크를 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'links', id));
      fetchLinks();
    } catch (error) {
      message.error('링크 삭제 중 오류:', error);
    }
    setModalVisible(false);
  };

  const fetchLinks = async () => {
    if (!userUid) return;
    const linksQuery = query(
      collection(db, 'links'),
      where('uid', '==', userUid),
      orderBy('createdAt'),
    );
    const linksSnapshot = await getDocs(linksQuery);
    let newLinksData = linksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().createdAt?.seconds,
    }));
    let sortedLinksData = [...newLinksData];
    sortedLinksData.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    setDefaultLinks(
      Array(3 - newLinksData.length)
        .fill()
        .map((_, i) => i),
    );
    setLinksData(sortedLinksData);
  };

  useEffect(() => {
    fetchLinks();
  }, [userUid]);

  return (
    <>
      <L.Container theme={theme}>
        <Row justify="center" align="middle">
          <L.Col span={24}>
            <h2>링크 추가하기</h2>
            <L.ButtonContainer>
              {linksData.map((link) => (
                <div key={link.id}>
                  <button
                    onClick={() => {
                      setModalVisible(true);
                      setEditingLinkId(link.id);
                      setUrlText(link.url);
                      setImageUrl(link.imageUrl);
                    }}
                  >
                    <img src={link.imageUrl} alt="Link Icon" />
                  </button>
                </div>
              ))}
              {defaultLinks.map((_, index) => (
                <button
                  key={`default-link-${index}`}
                  ㄴonClick={handleNewLinkClick}
                >
                  <Link />
                </button>
              ))}
            </L.ButtonContainer>
            <p>나만의 프로필 링크를 추가해주세요</p>
          </L.Col>
        </Row>
        <L.Modal
          title="링크 수정"
          centered
          open={modalVisible}
          onCancel={handleModalClose}
          footer={null}
          width={300}
        >
          <L.IconContainer>
            {iconImages.map((icon) => {
              return (
                <div key={icon.id}>
                  <button type="button" onClick={iconClickHandler}>
                    <img name={icon.name} src={icon.src} alt="icon" />
                  </button>
                </div>
              );
            })}
          </L.IconContainer>

          <Row>
            <Col span={24}>
              {imageUrl && <img src={imageUrl} alt="Preview" />}
            </Col>
            <Col span={24}>
              <input
                type="file"
                onChange={handleImageChange}
                ref={fileInputRef}
              />
              <L.MenuFormButton onClick={() => fileInputRef.current.click()}>
                아이콘 이미지 업로드
              </L.MenuFormButton>
            </Col>
            <Col span={24}>
              <p>URL</p>
              <Input.TextArea
                placeholder="링크를 입력하세요"
                value={urlText || 'https://'}
                onChange={handleUrlChange}
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </Col>
            <Col span={24}>
              <L.ButtonArea>
                <L.SubmitButton onClick={handleSaveClick}>
                  저장하기
                </L.SubmitButton>
                <L.DeleteButton
                  onClick={() => handleDeleteClick(editingLinkId)}
                >
                  삭제하기
                </L.DeleteButton>
              </L.ButtonArea>
            </Col>
          </Row>
        </L.Modal>
      </L.Container>
    </>
  );
};

export default Links;
