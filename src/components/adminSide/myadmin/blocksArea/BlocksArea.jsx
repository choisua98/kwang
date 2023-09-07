import React, { useEffect, useState } from 'react';
import { B } from './BlocksArea.styles';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { blocksAtom } from '../../../../atoms/Atom';
import {
  query,
  collection,
  where,
  orderBy,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../../../firebase/firebaseConfig';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import { Button } from 'antd';

// swiper
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const BlocksArea = () => {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useAtom(blocksAtom);
  const user = auth.currentUser;
  const userUid = auth.currentUser?.uid;

  // firebase에서 데이터 불러오기
  const fetchData = async () => {
    // Firestore에서 유저에 해당하는 데이터를 가져오기 위한 쿼리 생성
    try {
      // 쿼리 실행하여 데이터 가져오기
      const q = query(
        collection(db, 'heejintest'),
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

  // Block 위치 변경시 firebase에 blockId 값 업데이트
  const updateBlock = async (updatedBlocks) => {
    setBlocks(updatedBlocks);
    // 각 블록의 blockId 업데이트
    updatedBlocks.forEach(async (block, index) => {
      try {
        const docRef = doc(db, 'heejintest', block.id);
        await updateDoc(docRef, {
          blockId: index,
        });
      } catch (error) {
        return false;
      }
    });
  };

  // up & down 버튼 클릭시 block 위치 변경
  const switchBlock = (currentIndex, direction) => {
    if (
      (direction === 'up' && currentIndex > 0) ||
      (direction === 'down' && currentIndex < blocks.length - 1)
    ) {
      const updatedBlocks = [...blocks];
      const targetIndex =
        direction === 'up' ? currentIndex - 1 : currentIndex + 1;

      // 현재 블록과 대상 블록의 위치를 교환합니다.
      [updatedBlocks[currentIndex], updatedBlocks[targetIndex]] = [
        updatedBlocks[targetIndex],
        updatedBlocks[currentIndex],
      ];

      updateBlock(updatedBlocks);
    }
  };

  return (
    <B.Container>
      {blocks.map((block, index) => (
        <div key={block.id}>
          {block.title && (
            <>
              <button onClick={() => moveToEditButton(block)}>
                {block.title}
              </button>
              <B.ArrowContainer>
                <p onClick={() => switchBlock(index, 'up')}>
                  <UpOutlined />
                </p>
                <p onClick={() => switchBlock(index, 'down')}>
                  <DownOutlined />
                </p>
              </B.ArrowContainer>
            </>
          )}
          {block.blockKind === 'bannerimage' && (
            <>
              <B.Swiper
                modules={[Pagination, A11y]}
                pagination={{ clickable: true }}
                a11y
              >
                {block.images.map((image, index) => (
                  <B.SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`bannerimage ${index + 1}`}
                      onClick={() => moveToEditButton(block)}
                    />
                  </B.SwiperSlide>
                ))}
              </B.Swiper>
              <B.ArrowContainer>
                <p onClick={() => switchBlock(index, 'up')}>
                  <UpOutlined />
                </p>
                <p onClick={() => switchBlock(index, 'down')}>
                  <DownOutlined />
                </p>
              </B.ArrowContainer>
            </>
          )}
        </div>
      ))}
    </B.Container>
  );
};
export default BlocksArea;
