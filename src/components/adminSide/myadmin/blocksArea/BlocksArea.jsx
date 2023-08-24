import React, { useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { auth, db } from '../../../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const BlocksArea = () => {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState([]);

  // 사용자 UID 가져오기
  const userUid = auth.currentUser?.uid;
  console.log(userUid);

  // firebase 불러오기
  const fetchData = async () => {
    const q = query(collection(db, 'template'), where('userId', '==', userUid));
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

  const moveToEditButton = (blockKind) => navigate(`/admin/${blockKind}`);

  const deleteButton = async (id) => {
    window.confirm('정말 삭제하시겠습니까?');
    await deleteDoc(doc(db, 'template', `${id}`));
  };

  return (
    <div>
      {blocks.map((block) => {
        return (
          <div key={block.id}>
            <button onClick={() => moveToEditButton(block.blockKind)}>
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
