import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { useAtom } from 'jotai';
import { countAtom } from '../../../../../atoms/Atom';
import { nanoid } from 'nanoid';
import moment from 'moment';
import { db } from '../../../../../firebase/firebaseConfig';

const ChallengeComment = ({ selectedDate }) => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]); // 댓글 데이터 저장
  const [count, setCount] = useAtom(countAtom); // 댓글 추가될 때 마다 카운트 + 1

  // 댓글 추가
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 선택된 날짜와 현재 날짜 비교
    if (!moment(selectedDate).isSame(moment(), 'day')) {
      alert('댓글은 현재 날짜에만 작성할 수 있습니다.');

      setNickname('');
      setPassword('');
      setComment('');
      return;
    }

    if (!nickname || !password || !comment) {
      alert('모두 입력해 주세요.');
      return;
    }

    if (password.length < 4) {
      alert('비밀번호는 최소 4자리 이상이어야 합니다.');
      return;
    }

    try {
      const commentCollection = collection(db, 'comments');
      const commentDocRef = doc(commentCollection);

      const CommentInfor = {
        nickname,
        password,
        comment,
        id: nanoid(),
        timestamp: new Date(),
        date: moment().format('YYYY년 MM월 DD일'),
      };

      await setDoc(commentDocRef, CommentInfor);
      alert('댓글이 등록되었습니다.');

      // 선택된 날짜가 현재 날짜와 같을 때만 카운트를 업데이트
      if (moment(selectedDate).isSame(moment(), 'day')) {
        const updatedCount = count + 1;
        await updateCountInFirestore(updatedCount, selectedDate);
        setCount(updatedCount);
      }

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
      const commentCollection = collection(db, 'comments');
      const querySnapshot = await getDocs(commentCollection);

      let passwordMatched = false; // 비밀번호 일치 여부 플래그

      querySnapshot.forEach(async (doc) => {
        const commentData = doc.data();

        // 선택된 댓글의 id와 일치하는 댓글을 찾음
        if (id === commentData.id) {
          // 비밀번호가 일치할 경우에만 삭제 가능
          if (commentData.password === passwordToDelete) {
            passwordMatched = true;
            await deleteDoc(doc.ref);
          }
        }
      });

      if (passwordMatched) {
        alert('댓글이 삭제되었습니다.');

        fetchComments(); // 댓글 목록을 다시 불러옴

        // 선택된 날짜가 현재 날짜와 같을 때만 카운트를 업데이트
        if (moment(selectedDate).isSame(moment(), 'day')) {
          const updatedCount = count - 1;
          await updateCountInFirestore(updatedCount, selectedDate);
          setCount(updatedCount);
        }
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // 카운트 값을 Firestore에 업데이트하는 함수
  const updateCountInFirestore = async (newCount, selectedDate) => {
    try {
      // Firestore에서 해당 날짜에 대한 댓글 수를 가져오기
      const countDocRef = doc(db, 'counts', selectedDate);
      const countDocSnap = await getDoc(countDocRef);
      const currentCount = countDocSnap.exists()
        ? countDocSnap.data().count
        : 0;

      // 현재 댓글 수와 새로운 카운트 값을 더하여 업데이트
      const updatedCount = currentCount + newCount;

      // Firestore에 업데이트된 카운트 값을 저장
      await setDoc(countDocRef, { count: updatedCount });
    } catch (error) {
      console.log(error.message);
    }
  };

  // 카운트를 Firestore에서 가져오는 함수
  const fetchCountFromFirestore = async () => {
    try {
      const countDocRef = doc(db, 'counts', selectedDate);
      const countDocSnap = await getDoc(countDocRef);
      if (countDocSnap.exists()) {
        return countDocSnap.data().count;
      } else {
        return 0; // 기본값 설정
      }
    } catch (error) {
      console.log(error.message);
      return 0;
    }
  };

  // 컴포넌트가 마운트 될 때와 selectedDate가 변경될 때 카운트를 Firestore에서 가져옴
  useEffect(() => {
    const fetchCount = async () => {
      const count = await fetchCountFromFirestore();
      setCount(count);
    };
    fetchCount();
    fetchComments();
  }, [selectedDate, setCount]);

  // 댓글 데이터를 가져오는 함수
  const fetchComments = async () => {
    try {
      const commentCollection = collection(db, 'comments');
      const querySnapshot = await getDocs(commentCollection);
      const commentList = [];

      querySnapshot.forEach((doc) => {
        const commentData = doc.data();

        // 댓글의 작성 날짜를 가져옴
        const commentDate = moment(commentData.timestamp.toDate()).format(
          'YYYY년 MM월 DD일',
        );

        // 댓글 작성 날짜가 현재 날짜와 같을 때만 추가
        if (
          moment(commentDate, 'YYYY년 MM월 DD일').isSame(
            moment(selectedDate),
            'day',
          )
        ) {
          commentList.push(commentData);
        }
      });

      setComments(commentList);
    } catch (error) {
      console.log(error.message);
    }
  };

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
          type="text"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <CommentInput
          placeholder="댓글"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <AddButton type="submit">댓글 등록하기</AddButton>
      </form>
      {comments.map((commentData, index) => (
        <CommentBox key={index}>
          <>
            <p>닉네임: {commentData.nickname}</p>
            <p>댓글: {commentData.comment}</p>
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
          </>
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
const CommentInput = styled.input`
  width: 300px;
  margin-bottom: 10px;
`;

const CommentBox = styled.div`
  margin-bottom: 30px;
`;

const AddButton = styled.button`
  margin-bottom: 80px;
`;
