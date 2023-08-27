import React, { useEffect } from 'react';
import { B } from './BlocksArea.styles';
import { useNavigate } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import { userAtom, blocksAtom, bannerImageAtom } from '../../../../atoms/Atom';
import {
  query,
  collection,
  where,
  orderBy,
  doc,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { db, storage } from '../../../../firebase/firebaseConfig';
import { deleteObject, getDownloadURL, ref } from 'firebase/storage';

const BlocksArea = () => {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useAtom(blocksAtom);
  const [bannerImage, setBannerImage] = useAtom(bannerImageAtom);

  // Jotai에서 유저 정보 가져오기
  const user = useAtomValue(userAtom);

  // 유저의 UID 가져오기
  const userUid = user?.uid;

  console.log('>>', userUid);

  // firebase에서 데이터 불러오기
  const fetchData = async () => {
    // Firestore에서 유저에 해당하는 데이터를 가져오기 위한 쿼리 생성
    try {
      // 쿼리 실행하여 데이터 가져오기
      const q = query(
        collection(db, 'template'),
        where('userId', '==', userUid),
        orderBy('createdAt'),
      );
      const querySnapshot = await getDocs(q);

      // 가져온 데이터를 가공하여 배열에 저장
      const initialDocuments = [];
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        initialDocuments.push(data);
      });

      // 가공된 데이터를 상태에 업데이트
      setBlocks(initialDocuments);

      // 이미지 URL 가져오기
      const imageRef = ref(storage, `bannerImages/${userUid}/bannerimage`);
      try {
        const imageUrl = await getDownloadURL(imageRef);
        setBannerImage(imageUrl);
      } catch (error) {
        console.error('프로필 이미지 업데이트 실패:', error);
      }
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기 함수 호출
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  // 수정 버튼 클릭 시 페이지 이동 함수
  const moveToEditButton = (block) =>
    navigate(`/admin/${block.blockKind}`, {
      state: { blocksId: `${block.id}` },
    });

  // 삭제 버튼 클릭 시 데이터 삭제 함수
  const deleteButton = async (id) => {
    const shouldDelete = window.confirm('정말 삭제하시겠습니까?');
    if (shouldDelete) {
      await deleteDoc(doc(db, 'template', `${id}`));
      fetchData(); // 데이터 삭제 후 새로고침
    }
  };

  const deleteImageButton = async () => {
    const shouldDelete = window.confirm('정말 삭제하시겠습니까?');
    if (shouldDelete) {
      const previousImageRef = ref(
        storage,
        `bannerImages/${user.uid}/bannerimage`,
      );
      await deleteObject(previousImageRef);
      // 이미지 삭제 후 페이지 새로고침
      window.location.reload();
    }
  };

  return (
    <B.Container>
      <>
        {blocks.map((block) => {
          return (
            <div key={block.id}>
              <button onClick={() => moveToEditButton(block)}>
                {block.title}
              </button>
              <button onClick={() => deleteButton(block.id)}>삭제</button>
            </div>
          );
        })}
      </>
      {bannerImage ? (
        <>
          <img
            src={bannerImage}
            onClick={() => navigate('/admin/bannerimage')}
            alt="bannerimage"
          />
          <button onClick={deleteImageButton}>삭제</button>
        </>
      ) : (
        ''
      )}
    </B.Container>
  );
};
export default BlocksArea;
