import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { blocksAtom, themeAtom } from '../../../../atoms/Atom';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';
import { Pagination, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { C } from './CustomerBlocks.styles';

import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';

const CustomerBlocks = () => {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useAtom(blocksAtom);
  const [theme] = useAtom(themeAtom);
  console.log(theme);

  const { uid } = useParams();
  const userUid = uid;

  // firebase에서 데이터 불러오기
  const fetchData = async () => {
    try {
      // 쿼리 실행하여 데이터 가져오기
      const q = query(
        collection(db, 'template'),
        where('userId', '==', userUid),
        orderBy('blockId'),
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
      message.error('데이터 가져오기 오류:', error);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기 함수 호출
  useEffect(() => {
    if (userUid) {
      fetchData();
    }
  }, [userUid]);

  const moveToPageButton = (block) => {
    block.blockKind !== 'addlink'
      ? navigate(`/${userUid}/${block?.blockKind}`)
      : window.open(block.addLink, '_blank');
  };

  return (
    <C.Container>
      {blocks.map((block) => (
        <div key={block.id}>
          {block.title && (
            <C.Button onClick={() => moveToPageButton(block)} theme={theme}>
              {block.title}
            </C.Button>
          )}
          {block.blockKind === 'bannerimage' && (
            <C.SwiperWrap>
              <Swiper
                modules={[Pagination, A11y]}
                pagination={{ clickable: true }}
                a11y
              >
                {block.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image} alt={`bannerimage ${index + 1}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </C.SwiperWrap>
          )}
        </div>
      ))}
    </C.Container>
  );
};

export default CustomerBlocks;
