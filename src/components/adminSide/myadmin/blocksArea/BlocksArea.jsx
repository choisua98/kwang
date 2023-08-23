import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';

const BlocksArea = () => {
  const [blocks, setBlocks] = useState([]);

  // firebase 불러오기
  const fetchData = async () => {
    const q = query(collection(db, 'template'), where('userId', '==', '111'));
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
  return (
    <div>
      {blocks.map((block) => {
        return (
          <div key={block.id}>
            <button>{block.title}</button>
            <button>삭제</button>
          </div>
        );
      })}
    </div>
  );
};
export default BlocksArea;
