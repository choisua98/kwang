import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import { userAtom, blocksAtom } from '../../../../atoms/Atom';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';

const BlocksArea = () => {
  const navigate = useNavigate();
  // const [blocks, setBlocks] = useState([]);
  const [blocks, setBlocks] = useAtom(blocksAtom);

  // Jotai에서 유저 정보 가져오기
  const user = useAtomValue(userAtom);
  console.log('1', user);

  // 유저의 UID 가져오기
  const userUid = user?.uid;
  console.log('2', userUid);

  // firebase에서 데이터 불러오기
  const fetchData = async () => {
    // Firestore에서 유저에 해당하는 데이터를 가져오기 위한 쿼리 생성

    try {
      // 쿼리 실행하여 데이터 가져오기
      const q = query(
        collection(db, 'template'),
        where('userId', '==', userUid),
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
    fetchData();
  }, []);

  const moveToEditButton = (block) =>
    navigate(`/admin/${block.blockKind}`, {
      state: { blocksId: `${block.id}` },
    });

  const deleteButton = async (id) => {
    const shouldDelete = window.confirm('정말 삭제하시겠습니까?');
    if (shouldDelete) {
      await deleteDoc(doc(db, 'template', `${id}`));
      fetchData(); // 데이터 삭제 후 새로고침
    }
  };

  return (
    <div>
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
    </div>
  );
};
export default BlocksArea;
