import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useInputs from '../../../../../hooks/useInputs';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../../../../firebase/firebaseConfig';
import { useAtom } from 'jotai';
import { modalVisibleAtom } from '../../../../../atoms/Atom';
import { C } from '../../CustomerBlocks.style';
import { CC, CS } from './ChallengeService.styles';
import IconAwesome from '../../../../../assets/images/customer/icon-awesome.webp';
import { message } from 'antd';
import { DeleteOutlined, LeftOutlined } from '@ant-design/icons';
import moment from 'moment';

const ChallengeComment = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const title = location.state.title;
  const selectedDate = location.state.selectedDate;

  const { uid } = useParams();
  const userUid = uid;

  const [{ nickname, password, comment }, onChange, reset] = useInputs({
    nickname: '',
    password: '',
    comment: '',
  });

  const [comments, setComments] = useState([]); // 댓글 데이터 저장
  const [nicknameCount, setNicknameCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [count, setCount] = useState(0);
  const [modalVisibleA, setModalVisibleA] = useAtom(modalVisibleAtom);

  // 컴포넌트가 마운트 될 때와 selectedDate가 변경될 때 카운트를 Firestore에서 가져옴
  useEffect(() => {
    const fetchCount = async () => {
      const count = await fetchCountFromFirestore();
      setCount(count);
    };
    fetchCount();
    fetchComments();
  }, [selectedDate, setCount]);

  const handleCommentSubmit = () => {
    setModalVisibleA(true);
  };

  // 댓글 추가
  const handleUpdateButtom = async (e) => {
    e.preventDefault();

    // 선택된 날짜와 현재 날짜 비교
    if (!moment(selectedDate).isSame(moment(), 'day')) {
      message.error('댓글은 현재 날짜에만 작성할 수 있습니다.');
      reset();
      return;
    }

    if (!nickname || !password || !comment) {
      message.error('모두 입력해 주세요.');
      return;
    }

    if (password.length < 4) {
      message.error('비밀번호는 최소 4자리 이상이어야 합니다.');
      return;
    }

    try {
      const commentCollection = collection(db, 'comments');
      const commentDocRef = doc(commentCollection);

      const CommentInfo = {
        nickname,
        password,
        comment,
        date: moment().format('YYYY년 MM월 DD일 hh:mm:ss A'),
      };

      await setDoc(commentDocRef, CommentInfo);

      // 선택된 날짜가 현재 날짜와 같을 때만 카운트를 업데이트
      if (moment(selectedDate).isSame(moment(), 'day')) {
        const updatedCount = count + 1;
        await updateCountInFirestore(updatedCount, selectedDate);
        setCount(updatedCount);
      }

      fetchComments();

      message.success('댓글이 작성되었습니다.');
      setModalVisibleA(false);
    } catch (error) {
      message.error(error.message);
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
        message.success('댓글이 삭제되었습니다.');

        fetchComments(); // 댓글 목록을 다시 불러옴

        // 선택된 날짜가 현재 날짜와 같을 때만 카운트를 업데이트
        if (moment(selectedDate).isSame(moment(), 'day')) {
          // 기존 댓글 수에서 1을 뺀 값을 계산
          const updatedCount = count - 1;

          // 만약 업데이트된 댓글 수가 0 이하일 경우, 0으로 설정
          const newCommentCount = updatedCount < 0 ? 0 : updatedCount;

          await updateCountInFirestore(newCommentCount, selectedDate);
          setCount(newCommentCount);
        }
      } else {
        message.error('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  // Firestore에 count 업데이트하는 함수
  const updateCountInFirestore = async (newCount, selectedDate) => {
    try {
      // Firestore에서 해당 날짜에 대한 댓글 수를 가져오기
      const countDocRef = doc(db, 'commentCounts', selectedDate);
      const countDocSnap = await getDoc(countDocRef);

      if (countDocSnap.exists()) {
        await setDoc(countDocRef, { count: newCount });
      } else {
        await setDoc(countDocRef, { count: newCount });
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  // 카운트를 Firestore에서 가져오는 함수
  const fetchCountFromFirestore = async () => {
    try {
      const countDocRef = doc(db, 'commentCounts', selectedDate);
      const countDocSnap = await getDoc(countDocRef);
      if (countDocSnap.exists()) {
        return countDocSnap.data().count;
      } else {
        return 0; // 기본값 설정
      }
    } catch (error) {
      message.error(error.message);
      return 0;
    }
  };

  // 댓글 데이터를 가져오는 함수
  const fetchComments = async () => {
    try {
      const commentCollection = collection(db, 'comments');
      const querySnapshot = await getDocs(commentCollection);
      const commentList = [];

      querySnapshot.forEach((doc) => {
        const commentData = doc.data();

        // 댓글 작성 날짜가 현재 날짜와 같을 때만 추가
        if (
          moment(commentData.date, 'YYYY년 MM월 DD일').isSame(
            moment(selectedDate),
            'day',
          )
        ) {
          commentList.push(commentData);
        }
      });

      // commentList를 시간 기준으로 정렬
      commentList.sort((a, b) => {
        return (
          moment(b.date, 'YYYY년 MM월 DD일 hh:mm:ss A') -
          moment(a.date, 'YYYY년 MM월 DD일 hh:mm:ss A')
        );
      });

      setComments(commentList);
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <>
      <C.HeaderStyle>
        <button onClick={() => navigate(`/${userUid}/challenge`)}>
          <LeftOutlined />
        </button>
        <p>{title}</p>
      </C.HeaderStyle>
      <CS.GridContainer>
        <CC.CountStyle>
          <img src={IconAwesome} alt="엄지척아이콘" />
          <p>{moment(selectedDate.toString()).format('YYYY년 MM월 DD일,')}</p>
          <span>{count}명이 함께하고 있어요!</span>
        </CC.CountStyle>

        <CC.CommentButton type="button" onClick={handleCommentSubmit}>
          댓글 등록하기
        </CC.CommentButton>

        <C.Divider />

        <CC.CustomModal
          title={
            <>
              <button onClick={() => setModalVisibleA(false)}>
                <LeftOutlined />
              </button>
              <p>댓글 등록하기</p>
            </>
          }
          centered
          open={modalVisibleA}
          onCancel={() => setModalVisibleA(false)}
          footer={null}
          closable={false}
          width={330}
        >
          <CC.Container onSubmit={handleUpdateButtom}>
            <label htmlFor="nickname">
              <p>
                닉네임<span>*</span>
              </p>
              {nicknameCount}/10자
            </label>
            <input
              id="nickname"
              name="nickname"
              type="text"
              placeholder="닉네임을 입력해주세요."
              value={nickname}
              onChange={(e) => {
                onChange(e);
                setNicknameCount(e.target.value.length);
              }}
              maxLength={10}
              autoFocus
            />
            <label htmlFor="password">
              <p>
                비밀번호<span>*</span>
              </p>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={onChange}
            />
            <label htmlFor="password">
              <p>
                댓글<span>*</span>
              </p>
              {commentCount}/50자
            </label>
            <textarea
              id="comment"
              name="comment"
              type="text"
              placeholder="댓글을 입력해주세요."
              value={comment}
              onChange={(e) => {
                onChange(e);
                setCommentCount(e.target.value.length);
              }}
              maxLength={50}
            />
            <C.SubmitButton
              type="submit"
              disabled={!nickname || !password || !comment}
            >
              확인
            </C.SubmitButton>
          </CC.Container>
        </CC.CustomModal>

        {comments.map((commentData, index) => (
          <div key={index}>
            <CC.CommentsContainer>
              <CC.GridBox>
                <div>
                  <label>{commentData.nickname}</label>
                  <label>
                    {moment(
                      commentData.date,
                      'YYYY년 MM월 DD일 hh:mm:ss A',
                    ).format('hh:mm:ss A')}
                  </label>
                </div>
                <button
                  onClick={() => {
                    const password = prompt('비밀번호를 입력하세요.');
                    if (password !== null) {
                      handleDeleteButton(commentData.id, password);
                    }
                  }}
                >
                  <DeleteOutlined />
                </button>
              </CC.GridBox>
              <p>{commentData.comment}</p>
            </CC.CommentsContainer>
          </div>
        ))}
      </CS.GridContainer>
    </>
  );
};

export default ChallengeComment;
