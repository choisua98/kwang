import React, { useEffect, useState } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';

const BlocksArea = () => {
  const [fanLetters, setFanLetters] = useState([]);

  // firebase 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'tamplate'));
      const querySnapshot = await getDocs(q);

      const initialFanLetter = [];

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };

        console.log('data', data);
        initialFanLetter.push(data);
        // console.log(initialFanLetter);
      });

      setFanLetters(initialFanLetter);
    };
    fetchData();
  }, []);

  return (
    <div>
      {fanLetters.map((letter) => {
        console.log(letter.id);
        return (
          <div key={letter.id}>
            <p>{letter.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default BlocksArea;
