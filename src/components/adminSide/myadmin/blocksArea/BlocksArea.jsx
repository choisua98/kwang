import React, { useEffect } from 'react';
import { B } from './BlocksArea.styles';
import { useNavigate } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import { userAtom, blocksAtom } from '../../../../atoms/Atom';
import { query, collection, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';

// swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const BlocksArea = () => {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useAtom(blocksAtom);

  // Jotai에서 유저 정보 가져오기
  const user = useAtomValue(userAtom);

  // 유저의 UID 가져오기
  const userUid = user?.uid;

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

  return (
    <B.Container>
      {blocks.map((block) => (
        <div key={block.id}>
          {block.title && (
            <button
              onClick={() => moveToEditButton(block)}
              style={{
                marginBottom: '15px',
                padding: '21.5px 0',
                width: '100%',
                fontSize: '14px',
                borderRadius: '15px',
                background: '#D9D9D9',
              }}
            >
              {block.title}
            </button>
          )}
          {block.blockKind === 'bannerimage' && (
            <Swiper
              modules={[Pagination, A11y]}
              pagination={{ clickable: true }}
              a11y
            >
              {block.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`bannerimage ${index + 1}`}
                    onClick={() => moveToEditButton(block)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      ))}
    </B.Container>
  );
};
export default BlocksArea;
