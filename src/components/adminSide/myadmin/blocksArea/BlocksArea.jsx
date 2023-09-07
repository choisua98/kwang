import React, { useEffect, useRef, useState } from 'react';
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
import { PauseOutlined } from '@ant-design/icons';

// swiper
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Drag & Drop
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

  // Drag & Drop
  const onDragEnd = (result) => {
    // 위치 이동이 없는 경우 작동하지 않음
    if (
      !result.destination ||
      result.source.index === result.destination.index
    ) {
      return;
    }

    const updatedBlocks = [...blocks];
    const [movedBlock] = updatedBlocks.splice(result.source.index, 1); // 이동한 블록을 추출
    updatedBlocks.splice(result.destination.index, 0, movedBlock); // 이동한 블록을 새 위치에 삽입

    setBlocks(updatedBlocks);
    updateBlock(updatedBlocks);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="blocks" direction="vertical">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided, magic, snapshot) => (
                    <B.Container
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                    >
                      {block.title && (
                        <div
                          isDragging={snapshot.isDragging}
                          ref={magic.innerRef}
                          {...magic.draggableProps}
                        >
                          <button onClick={() => moveToEditButton(block)}>
                            {block.title}
                          </button>
                          <span {...magic.dragHandleProps}>
                            <PauseOutlined />
                          </span>
                        </div>
                      )}
                      {block.blockKind === 'bannerimage' && (
                        <div
                          isDragging={snapshot.isDragging}
                          ref={magic.innerRef}
                          {...magic.draggableProps}
                        >
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
                          <span {...magic.dragHandleProps}>
                            <PauseOutlined />
                          </span>
                        </div>
                      )}
                    </B.Container>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
export default BlocksArea;
