import React, { useEffect, useRef, useState } from 'react';
import { Col, Input, Modal, Row } from 'antd';
import { L } from './Links.styles';
import { ReactComponent as Link } from '../../../../assets/images/admin/link.svg';
import { auth, db, storage } from '../../../../firebase/firebaseConfig';
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
} from 'firebase/firestore';

const Links = () => {
  const userUid = auth.currentUser?.uid; // 현재 로그인한 사용자 UID 가져오기
  const [modalVisible, setModalVisible] = useState(false); // 모달 열림, 닫힘
  const [urlText, setUrlText] = useState(''); // URL 텍스트 입력 필드 변경
  const [imageFile, setImageFile] = useState(null); // 선택된 이미지 파일 변경(파일 업로드에 사용)
  const [uploadingImage, setUploadingImage] = useState(false); // 이미지 업로드 중인지 확인
  const [linksData, setLinksData] = useState([]); // Firestore에서 가져온 링크 데이터를 저장
  const [defaultLinks, setDefaultLinks] = useState([0, 1, 2]); // 기본으로 보여줄 링크 버튼 3개. 새 링크가 추가되면 하나씩 감소
  const [editingLinkId, setEditingLinkId] = useState(null); // 현재 편집 중인 링크의 ID. null이면 새 링크를 생성하고 아니면 해당 ID 링크를 수정
  const [imageUrl, setImageUrl] = useState(null); // 선택된 이미지 파일 대신에 사용할 이미지 URL 저장
  const fileInputRef = useRef(); // 이미지 업로드 파일 입력 필드

  // URL 입력 필드 변경
  const handleUrlChange = (e) => {
    setUrlText(e.target.value);
  };

  // 이미지 선택 변경
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  // 선택된 이미지 파일을  Firebase Storage에 업로드하고 다운로드 URL을 가져옴
  const uploadImage = async () => {
    if (!imageFile) return;
    setUploadingImage(true);
    // 업로드 할 파일 생성
    let storageRef = ref(storage, 'linkImages/' + imageFile.name);
    // 파일 업로드 스냅샷 가져오기
    let taskSnapshot;
    try {
      taskSnapshot = await uploadBytesResumable(storageRef, imageFile);
    } catch (error) {
      console.error(error);
    }
    // 다운로드 URL 가져오기
    let downloadURL = await getDownloadURL(taskSnapshot.ref);
    setUploadingImage(false);
    return downloadURL;
  };

  // 저장 버튼(링크 데이터를 Firestore에 저장 및 업데이트)
  const handleSaveClick = async () => {
    // urlText가 비어있거나 이미지가 업로드 중이면 종료
    if (!urlText || uploadingImage) return;
    // URL 유효성 검사
    const urlRegExp =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    if (!urlRegExp.test(urlText)) {
      // console.error('잘못된 URL 형식입니다.');
      alert('잘못된 URL 형식입니다.(https://kwang.com) 형식으로 입력해주세요');
      return;
    }
    // 기존 이미지 URL을 기본값으로 사용
    let imageUrlToSave = imageUrl;
    // 새 이미지 파일이 선택되면 업로드하고 새 URL을 가져오기
    if (imageFile) {
      try {
        imageUrlToSave = await uploadImage();
      } catch (error) {
        console.error('업로드 중인 이미지 오류: ', error);
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
        // 새롭게 생성된 문서 ID 설정
        setEditingLinkId(docRef.id);
        // 기본 링크 버튼 하나 삭제
        if (defaultLinks.length > 0) setDefaultLinks(defaultLinks.slice(1));
      }
      setModalVisible(false);
      // 입력 필드 초기화
      setUrlText('');
      setImageFile(null);
      // URL 초기화
      setImageUrl(null);
      // 파일 입력 필드 초기화
      fileInputRef.current.value = '';
      // 링크 저장 후 최신 데이터 가져오기
      fetchLinks();
      // 수정 중인 링크 ID 초기화
      setEditingLinkId(null);
    } catch (error) {
      console.error('업데이트 중 오류:', error);
      return;
    }
  };

  // Firestore에서 사용자의 링크 데이터를 가져오기
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
    // console.log(newLinksData);
    // timestamp를 기준으로 오름차순 정렬
    let sortedLinksData = [...newLinksData];
    // 비교하는 값들을 출력
    sortedLinksData.sort((a, b) => {
      // console.log(a.timestamp);
      // console.log(b.timestamp);
      return a.timestamp - b.timestamp;
    });
    // console.log(sortedLinksData);
    // console.log(newLinksData);
    setDefaultLinks(
      Array(3 - newLinksData.length)
        .fill()
        .map((_, i) => i),
    );
    // setLinksData(newLinksData);
    // 정렬된 데이터를 setLinksData 저장
    setLinksData(sortedLinksData);
    // console.log(sortedLinksData);
    // console.log(linksData);
  };

  // 컴포넌트가 마운트되거나 userUid가 변경되면 fetchLink 링크 데이터를 가져옴
  useEffect(() => {
    fetchLinks();
  }, [userUid]);

  useEffect(() => {
    // console.log(linksData);
  }, [linksData]);
  return (
    <>
      <L.Container>
        <Row justify="center" align="middle" style={{ padding: '20px 0' }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <p>링크와 원하는 메뉴를 추가해주세요</p>
            <L.ButtonContainer style={{ marginTop: '20px' }}>
              {linksData.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setModalVisible(true);
                    setEditingLinkId(link.id); // 수정 중인 링크의 ID
                    setUrlText(link.url); // 기존 URL 값
                    setImageUrl(link.imageUrl); // 기존 이미지 URL 값
                  }}
                >
                  <img src={link.imageUrl} alt="Link Icon" />
                </button>
              ))}
              {defaultLinks.map((_, index) => (
                <button key={index} onClick={() => setModalVisible(true)}>
                  <Link />
                </button>
              ))}
            </L.ButtonContainer>
          </Col>
        </Row>
        <Modal
          title="링크 수정"
          centered
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width={300}
        >
          <Row>
            <Col span={24}>
              <div>로고 이미지 / 아이콘 추가</div>
              {imageUrl && (
                <img
                  src={imageUrl}
                  style={{
                    margin: '0 auto',
                    display: 'block',
                    width: '100px',
                  }}
                  alt="Preview"
                />
              )}
            </Col>
            <Col span={24}>
              <input
                type="file"
                onChange={handleImageChange}
                ref={fileInputRef}
              />
            </Col>
            <Col span={24} style={{ marginTop: '10px' }}>
              <div style={{ marginBottom: '10px' }}>URL</div>
              <Input.TextArea
                placeholder="텍스트를 입력하세요"
                value={urlText}
                onChange={handleUrlChange}
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </Col>
            <Col span={24}>
              <button
                style={{
                  width: '100%',
                  border: '1px solid #000',
                  borderRadius: '5px',
                }}
                onClick={handleSaveClick}
              >
                저장하기
              </button>
            </Col>
          </Row>
        </Modal>
      </L.Container>
    </>
  );
};

export default Links;
