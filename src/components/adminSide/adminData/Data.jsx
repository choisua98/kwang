import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../../firebase/firebaseConfig';
import { D } from './Data.styles';
const Data = () => {
  const [mailingData, setMailingData] = useState([]);
  const [fanletterData, setFanletterData] = useState([]);
  const [reservationData, setReservationData] = useState([]);
  const userUid = auth.currentUser?.uid;

  console.log(userUid);

  useEffect(() => {
    // firebase에서 데이터 불러오기
    if (userUid) {
      console.log('useruid 있당');
      const fetchData = async (userUid) => {
        console.log('fetchData한당');
        try {
          const q = query(
            collection(db, 'userTemplate'),
            where('userId', '==', userUid),
          );
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs?.map((doc) => doc.data());

          // 메일링 데이터와 팬레터 데이터 예약 데이터 분리
          const mailingData = data?.filter(
            (item) => item.dataKind === 'mailingData',
          );
          const fanletterData = data?.filter(
            (item) => item.dataKind === 'fanletterData',
          );
          const reservationData = data?.filter(
            (item) => item.dataKind === 'reservationData',
          );
          setMailingData(mailingData);
          setFanletterData(fanletterData);
          setReservationData(reservationData);
        } catch (error) {
          console.error('데이터 가져오기 오류:', error);
        }
      };

      fetchData(userUid);
    }
  }, [userUid]);
  console.log(mailingData);
  console.log(fanletterData);
  console.log(reservationData);

  return (
    <div>
      <D.Container>
        <p>메일링 서비스 데이터</p>
        {mailingData.map((data) => (
          <div key={data.createdAt}>
            <br />
            <div>이름:{data.name}</div>
            <div>이메일:{data.email}</div>
            <div>번호:{data.number}</div>
            <br />
          </div>
        ))}
      </D.Container>

      <D.Container>
        <p>팬레터 서비스 데이터</p>
        {fanletterData.map((data) => (
          <div key={data.createdAt}>
            <br />
            <div>팬레터내용: {data.description}</div>
            <br />
          </div>
        ))}
      </D.Container>

      <D.Container>
        <p>예약 서비스 데이터</p>
        {reservationData.map((data) => (
          <div key={data.createdAt}>
            <br />
            <div>이름: {data.name}</div>
            <div>번호: {data.phoneNumber}</div>
            <br />
          </div>
        ))}
      </D.Container>
    </div>
  );
};

export default Data;
