import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebaseConfig';
// import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useAtom } from 'jotai';
import { countAtom } from '../../../atoms/Atom';

const ChallengeComment = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]); // 댓글 데이터 저장
  const [count, setCount] = useAtom(countAtom); // 댓글 추가될 때 마다 카운트 + 1
  //   const [editMode, setEditMode] = useState(null); // 수정 input 창과 수정하기 버튼 활성화
  //   const [updateComment, setUpdateComment] = useState(''); // 수정된 댓글

  // 댓글 데이터를 가져오는 함수
  const fetchComments = async () => {
    try {
      const commentCollection = collection(db, 'comments');
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
        setCount(count - 1);
        fetchComments(); // 댓글 목록을 다시 불러옴
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //   // 댓글 수정
  //   const handleEditButton = async (id, passwordToEdit) => {
  //     try {
  //       const commentCollection = collection(db, 'comments');
  //       const querySnapshot = await getDocs(commentCollection);

  //       let commentDataToEdit = null; // 수정할 댓글 데이터 저장

  //       querySnapshot.forEach((doc) => {
  //         const commentData = doc.data();

  //         // 선택된 댓글의 id와 일치하는 댓글을 찾음
  //         if (id === commentData.id) {
  //           // 비밀번호가 일치할 경우에만 수정 가능
  //           if (commentData.password === passwordToEdit) {
  //             commentDataToEdit = commentData;
  //           }
  //         }
  //       });

  //       // 수정할 댓글 데이터가 있을 때만 수정 모드로 전환
  //       if (commentDataToEdit) {
  //         setUpdateComment(commentDataToEdit.comment);
  //         setEditMode(id); // 수정 모드로 전환
  //       } else {
  //         alert('비밀번호가 일치하지 않거나 해당 댓글이 존재하지 않습니다.');
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  // 수정하기 버튼을 클릭하면 수정 모드가 해제되고 수정 내용이 파이어스토어에 저장
  //   const handleEditSubmit = async (id) => {
  //     try {
  //       if (!updateComment) {
  //         alert('수정할 내용을 입력하세요.');
  //         return;
  //       }

  //       const commentCollection = collection(db, 'comments');
  //       const querySnapshot = await getDocs(commentCollection);
  //       let commentExists = false; // 해당 댓글이 존재하는지 여부

  //       querySnapshot.forEach((doc) => {
  //         const commentData = doc.data();

  //         // 선택된 댓글의 id와 일치하는 댓글을 찾음
  //         if (id === commentData.id) {
  //           commentExists = true;
  //         }
  //       });

  //       if (!commentExists) {
  //         alert('해당 댓글이 존재하지 않습니다.');
  //         return;
  //       }

  //       const commentRef = doc(commentCollection, id);

  //       const updatedData = {
  //         comment: updateComment,
  //       };

  //       await updateDoc(commentRef, updatedData);
  //       alert('댓글이 수정되었습니다.');
  //       fetchComments();
  //       // 수정 모드 해제
  //       setEditMode(null);
  //       setUpdateComment(''); // 수정 완료 후 상태 초기화
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

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
          {/* {!editMode || editMode !== commentData.id ? ( */}
          <>
            <p>닉네임: {commentData.nickname}</p>
            <p>댓글: {commentData.comment}</p>
            {/* <button
              onClick={() => {
                const password = prompt('비밀번호를 입력하세요.');
                if (password !== null) {
                  handleEditButton(commentData.id, password);
                }
              }}
            >
              수정
            </button> */}
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
          {/* //   ) : ( */}
          {/* // <>
            //   <CommentInput */}
          {/* //     type="text"
            //     value={updateComment}
            //     onChange={(e) => { */}
          {/* //       setUpdateComment(e.target.value);
            //     }}
            //   />
            //   <button onClick={() => handleEditSubmit(commentData.id)}>
            //     수정하기
            //   </button>
            // </> */}
          {/* )} */}
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
