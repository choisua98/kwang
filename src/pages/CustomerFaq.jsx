import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { auth, db } from '../firebase/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const CustomerFaq = () => {
  const userUid = auth.currentUser?.uid; // 현재 로그인한 사용자 uid
  const [faqs, setFaqs] = useState([]); // Firebase에서 가져온 faq 데이터가 저장될 state
  const [activeKey, setActiveKey] = useState(null); // 현재 열려있는 faq 아이템의 키 값을 관리하는 state

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userUid) {
          // Firestore의 template 컬렉션 userId가 현재 로그인한 사용자의 uid와 같은 문서들을 찾기
          const q = query(
            collection(db, 'template'),
            where('userId', '==', userUid),
          );
          // 쿼리 실행하고 결과값 받기
          const querySnapshot = await getDocs(q);
          // 문서의 id와 데이터들을 객체로 만들어 fetchedFaqs 배열에 저장
          const fetchedFaqs = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          for (let i = 0; i < fetchedFaqs.length; i++) {
            if (fetchedFaqs[i].faqs.length > 0) {
              // 문서 안에 faq항목이 하나라도 있으면 첫 번째 faq의 id 값을 activeKey로 설정
              setActiveKey(fetchedFaqs[i].faqs[0].faqId);
              break;
            }
          }
          // 받아온 데이터를 faq state에 저장
          setFaqs(fetchedFaqs);
        }
      } catch (error) {
        console.error('데이터를 가져오는 동안 오류 발생:', error);
      }
    };

    fetchData();
  }, [userUid]);

  // faqs 배열 내부의 모든 FAQ 항목을 평탄화하여 반환하여 Collapse에 전달
  const items = faqs.flatMap((faq) =>
    faq.faqs.map((innerFaq) => ({
      key: innerFaq.faqId, // faq의 ID
      label: innerFaq.question, // faq의 질문
      children: <p>{innerFaq.answer}</p>, // faq의 답변
    })),
  );

  return (
    <Collapse
      activeKey={activeKey}
      onChange={(key) => setActiveKey(key)}
      accordion
      items={items}
    />
  );
};

export default CustomerFaq;
