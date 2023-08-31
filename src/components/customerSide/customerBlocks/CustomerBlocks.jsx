import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { blocksAtom } from '../../../atoms/Atom';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { C } from './CustomerBlocks.styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import { useNavigate, useParams } from 'react-router-dom';

const CustomerBlocks = () => {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useAtom(blocksAtom);

  const { uid } = useParams();
  const userUid = uid;

  // firebase에서 데이터 불러오기
  const fetchData = async () => {
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
    if (userUid) {
      fetchData();
    }
  }, [userUid]);

  const moveToPageButton = (block) =>
    navigate(`/${userUid}/${block.blockKind}`);

  return (
    <C.Container>
      {blocks.map((block) => (
        <div key={block.id}>
          {block.title && (
            <button onClick={() => moveToPageButton(block)}>
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
                    onClick={() => navigate(`/${userUid}/bannerimage`)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      ))}
    </C.Container>
  );
};

export default CustomerBlocks;
