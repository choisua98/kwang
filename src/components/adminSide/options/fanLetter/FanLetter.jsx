import React, { useEffect, useState } from 'react';
import { F } from './FanLetter.styles';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';

const FanLetter = () => {
  const [toggle, setToggle] = useState(true);
  const [fanLetters, setFanLetters] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const swtichToggle = () => {
    setToggle(!toggle);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const querySnapshot = await getDocs(collection(db, 'fanletter'));
  //     querySnapshot.forEach((doc) => {
  //       console.log(`${doc.id} => ${doc.data()}`);
  //     });
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'fanletter'));
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

  console.log('>>', fanLetters);

  return (
    <F.Container>
      <F.Title>
        <input
          placeholder="팬레터"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button onClick={swtichToggle}>{toggle === true ? '⌄' : '--'}</button>
      </F.Title>
      {toggle && (
        <F.Contents>
          <p>팬레터 설명을 작성해 주세요</p>
          <input
            placeholder="설명을 작성해 주세요"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </F.Contents>
      )}
      {fanLetters.map((letter) => {
        console.log(letter.id);
        return (
          <div key={letter.id}>
            <p>{letter.id}</p>
            <p>{letter.title}</p>
            <p>{letter.body}</p>
          </div>
        );
      })}
    </F.Container>
  );
};

export default FanLetter;
