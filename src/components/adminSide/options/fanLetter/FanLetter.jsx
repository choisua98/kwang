import React, { useState } from 'react';
import { F } from './FanLetter.styles';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import { blocksAtom, userAtom } from '../../../../atoms/Atom';

const FanLetter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Jotai에서 유저 정보 가져오기
  const user = useAtomValue(userAtom);
  console.log('1', user);

  // 유저의 UID 가져오기
  const userUid = user?.uid;

  const blockId = location.state ? location.state.blocksId : null;
  const [blocks] = useAtom(blocksAtom);
  const selectedBlock = blocks.find((block) => block.id === blockId) || '';

  const addButtonClick = async (e) => {
    e.preventDefault();

    // Firestore에 데이터 추가
    await addDoc(collection(db, 'template'), {
      title,
      description,
      blockKind: 'fanletter',
      userId: user?.uid,
    });
    navigate('/admin');
  };

  const editButtonClick = async (e) => {
    e.preventDefault();

    // Firestore에 데이터 업로드
    const docRef = doc(db, 'template', blockId);
    await updateDoc(docRef, {
      title,
      description,
    });
    navigate('/admin');
  };

  return (
    <F.Container onSubmit={blockId ? editButtonClick : addButtonClick}>
      <F.Title>
        <input
          name="title"
          type="text"
          placeholder={blockId ? '' : '팬레터'}
          defaultValue={blockId ? selectedBlock.title : title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </F.Title>
      <F.Contents>
        <p>팬레터 설명을 작성해 주세요</p>
        <input
          name="description"
          type="text"
          placeholder={blockId ? '' : '설명을 작성해 주세요'}
          defaultValue={blockId ? selectedBlock.description : description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <button type="submit">{blockId ? '수정하기' : '저장하기'}</button>
      </F.Contents>
    </F.Container>
  );
};

export default FanLetter;
