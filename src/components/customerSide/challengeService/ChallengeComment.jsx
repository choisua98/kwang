import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebaseConfig';
// import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { nanoid } from 'nanoid';
import { useAtom } from 'jotai';
import { countAtom } from '../../../atoms/Atom';

const ChallengeComment = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]); // 댓글 데이터 저장
  const [count, setCount] = useAtom(countAtom); // 댓글 추가될 때 마다 카운트 + 1

  const commentCollection = collection(db, 'comments');

  // 댓글 데이터를 가져오는 함수
  const fetchComments = async () => {
    try {
      const querySnapshot = await getDocs(commentCollection);
      const commentList = []; // 임시로 데이터 보관
      querySnapshot.forEach((doc) => {
        commentList.push(doc.data()); // 댓글 데이터 배열에 추가
      });
      setComments(commentList);
    } catch (error) {
      console.log(error.message);
    }
  };

  // 컴포넌트가 마운트 될 때 댓글 데이터 불러오기
  useEffect(() => {
    fetchComments();
  }, []);

  // 댓글 추가
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const commentCollection = collection(db, 'comments');
      const commentDocRef = doc(commentCollection, nanoid());

      const CommentInfor = {
        nickname,
        password,
        comment,
        id: nanoid(),
      };

      await setDoc(commentDocRef, CommentInfor);
      alert('댓글이 등록되었습니다.');
      setCount(count + 1);
      setNickname('');
      setPassword('');
      setComment('');
      fetchComments();
    } catch (error) {
      console.log(error.message);
    }
  };

  // 댓글 삭제
  const handleDeleteButton = async (id, passwordToDelete) => {
    try {
      const querySnapshot = await getDocs(commentCollection);
      querySnapshot.forEach(async (doc) => {
        const commentData = doc.data();
        console.log(commentData);

        // 선택된 댓글의 id와 일치하는 댓글 --> 비밀번호가 일치할 경우에만 삭제
        if (id === commentData.id) {
          if (commentData.password === passwordToDelete) {
            await deleteDoc(doc.ref);
            alert('댓글이 삭제되었습니다.');
            setCount(count - 1); // 댓글이 삭제될 때 카운트 -1
            fetchComments(); // 댓글 목록을 다시 불러옴
          } else {
            alert('비밀번호가 일치하지 않습니다.');
          }
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // 댓글 수정
  const handleEditButton = () => {};

  return (
    <>
      <div>{count}명이 함께하고 있어요!</div>
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
        <AddButton type="submit">댓글 등록하기</AddButton>
      </form>

      {/* 불러온 댓글 데이터를 화면에 표시 */}
      {comments.map((commentData, index) => (
        <CommentBox key={index}>
          {/* {console.log(commentData)} */}

          <p>닉네임: {commentData.nickname}</p>
          <p>댓글: {commentData.comment}</p>
          <button
            onClick={() => {
              const password = prompt('비밀번호를 입력하세요.');
              if (password !== null) {
                handleEditButton();
              }
            }}
          >
            수정
          </button>
          <button
            onClick={() => {
              const password = prompt('비밀번호를 입력하세요.');
              if (password !== null) {
                handleDeleteButton(commentData.id, password);
              }
            }}
          >
            삭제
          </button>
        </CommentBox>
      ))}
    </>
  );
};

export default ChallengeComment;

const Input = styled.input`
  width: 100px;
  /* margin-bottom: 10px; */
`;
const InputBox = styled.input`
  width: 300px;
  margin-bottom: 10px;
`;

const CommentBox = styled.div`
  margin-bottom: 30px;
`;

const AddButton = styled.button`
  margin-bottom: 80px;
`;
