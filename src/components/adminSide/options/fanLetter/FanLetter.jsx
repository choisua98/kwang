import React, { useState } from 'react';
import { F } from './FanLetter.styles';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai';
import { blocksAtom } from '../../../../atoms/Atom';

const FanLetter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [blockData, setBlockData] = useState(null);

  const blockId = location.state ? location.state.blocksId : null;
  const [blocks] = useAtom(blocksAtom);
  const selectedBlock = blocks.find((block) => block.id === blockId) || null;

  const addButtonClick = async (e) => {
    e.preventDefault();

    // Firestore에 데이터 추가
    await addDoc(collection(db, 'template'), {
      title,
      description,
      blockKind: 'fanletter',
      userId: '1',
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
