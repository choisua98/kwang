import { collection, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../../../firebase/firebaseConfig';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { nanoid } from 'nanoid';

const ChallengeComment = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [comment, setComment] = useState('');

  const { uid } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const commentCollection = collection(db, 'comment');
      const commentDocRef = doc(commentCollection, nanoid());

      const CommentInfor = {
        nickname,
        password,
        comment,
      };

      alert('댓글이 등록되었습니다.');
      await setDoc(commentDocRef, CommentInfor);
    } catch (error) {
      // 에러 발생 시의 처리
    }
  };
  return (
    <>
      <div>댓글창 구현</div>
      <div>몇 명이 함께하고 있어요!</div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <InputBox
          placeholder="댓글"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button type="submit">댓글 등록하기</button>
      </form>
    </>
  );
};

export default ChallengeComment;

const Input = styled.input`
  width: 100px;
`;
const InputBox = styled.input`
  width: 300px;
`;
