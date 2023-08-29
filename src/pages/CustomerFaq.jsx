import React, { useEffect, useState } from 'react';
import { Collapse, Select } from 'antd';
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

  const [expandIconPosition, setExpandIconPosition] = useState('start');
  const onPositionChange = (newExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };
  const onChange = (key) => {
    console.log(key);
  };

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

        console.log('faq 리스트', fetchedFaqs);
        console.log('faq 리스트2', fetchedFaqs[0].faqs);
        fetchedFaqs.forEach((faq, index) => {
          console.log(faq.faqs);
        });

        setFaqs(fetchedFaqs);
      }
    };

    fetchData();
  }, [userUid]);

  //   console.log(faqs);
  return (
    <>
      {/* <Collapse
        defaultActiveKey={['1']}
        onChange={onChange}
        expandIconPosition={expandIconPosition}
        items={items}
        accordion
      >
        {faqs.map((faq) => (
          <>
            {faq.faqs.map((innerFaq) => (
              <Collapse.Panel header={innerFaq.question} key={innerFaq.faqId}>
                <p>{innerFaq.answer}</p>
              </Collapse.Panel>
            ))}
          </>
        ))}
      </Collapse> */}

      {/* {faqs.map((faq) => (
        <Collapse
          defaultActiveKey={['1']}
          onChange={onChange}
          expandIconPosition={expandIconPosition}
          items={items}
          accordion
          key={faq.id}
        >
          {faq.faqs.map((innerFaq) => {
            console.log(innerFaq.faqId);
            return (
              <Collapse.Panel header={innerFaq.question} key={innerFaq.faqId}>
                <p>{innerFaq.answer}</p>
              </Collapse.Panel>
            );
          })}
        </Collapse>
      ))}*/}

      <Collapse accordion>
        {faqs.map((faq) => (
          <>
            {faq.faqs.map((innerFaq) => (
              <Collapse.Panel header={innerFaq.question} key={innerFaq.faqId}>
                <p>{innerFaq.answer}</p>
              </Collapse.Panel>
            ))}
          </>
        ))}
      </Collapse>

      {/* <Collapse accordion>
        {faqs.map((faq) => (
          <Collapse.Panel header={faq.title} key={faq.id}>
            <p>{faq.answer}</p>
          </Collapse.Panel>
        ))}
      </Collapse> */}
      {/* <Collapse accordion items={items} /> */}
      {/* <Collapse accordion>
        {faqs.map((faq) => (
          <Collapse.Panel header={faq.title} key={faq.id}>
            <p>{faq.content}</p>
          </Collapse.Panel>
        ))}
      </Collapse> */}
    </>
  );
};

export default CustomerFaq;
