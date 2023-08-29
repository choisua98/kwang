import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd';
import { auth, db, storage } from '../firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];

const CustomerFaq = () => {
  const [faqs, setFaqs] = useState([]);
  const userUid = auth.currentUser?.uid; // 현재 로그인한 사용자 UID 가져오기

  useEffect(() => {
    // 데이터 가져오기
    const fetchData = async () => {
      if (userUid) {
        const q = query(
          collection(db, 'template'),
          where('userId', '==', userUid),
          //   orderBy('createdAt', 'desc'), // 최신 순서대로 정렬
        );

        const querySnapshot = await getDocs(q);
        const fetchedFaqs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log('Fetched FAQs:', fetchedFaqs);
        console.log('Fetched FAQs:', fetchedFaqs);
        console.log('Fetched FAQs:', fetchedFaqs[0].title);
        setFaqs(fetchedFaqs);
      }
    };

    fetchData();
  }, [userUid]);

  //   console.log(faqs);
  return (
    <div>
      <Collapse accordion>
        {faqs.map((faq) => (
          <Collapse.Panel header={faq.title} key={faq.id}>
            <p>{faq.answer}</p>
          </Collapse.Panel>
        ))}
      </Collapse>
      {/* <Collapse accordion items={items} /> */}
      {/* <Collapse accordion>
        {faqs.map((faq) => (
          <Collapse.Panel header={faq.title} key={faq.id}>
            <p>{faq.content}</p>
          </Collapse.Panel>
        ))}
      </Collapse> */}
    </div>
  );
};

export default CustomerFaq;
