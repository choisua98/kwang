import React, { useEffect } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { blocksAtom } from '../../../../atoms/Atom';

const BlocksArea = () => {
  const navigate = useNavigate();
  // const [blocks, setBlocks] = useState([]);
  const [blocks, setBlocks] = useAtom(blocksAtom);

  // firebase 불러오기
  const fetchData = async () => {
    const q = query(collection(db, 'template'), where('userId', '==', '1'));
    const querySnapshot = await getDocs(q);
    const initialDocuments = [];
    querySnapshot.forEach((doc) => {
      const data = {
        id: doc.id,
        ...doc.data(),
      };
      initialDocuments.push(data);
    });
    setBlocks(initialDocuments);
    return;
  };

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
