import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../../firebase/firebaseConfig';
import { D } from './Data.styles';
import moment from 'moment';
import * as XLSX from 'xlsx';
const Data = () => {
  const [data, setData] = useState([]);
  const [mailingData, setMailingData] = useState([]);
  const [fanletterData, setFanletterData] = useState([]);
  const [reservationData, setReservationData] = useState([]);
  const userUid = auth.currentUser?.uid;

  const onMailDataDownloadButtonClickHandler = () => {
    const ws = XLSX.utils.json_to_sheet(mailingData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'mailData.xlsx');
  };
  const onFanletterDataDownloadButtonClickHandler = () => {
    const ws = XLSX.utils.json_to_sheet(fanletterData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'fandletterData.xlsx');
  };
  const onReservationDataDownloadButtonClickHandler = () => {
    const ws = XLSX.utils.json_to_sheet(reservationData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'reservationData.xlsx');
  };
  useEffect(() => {
    // firebase에서 데이터 불러오기
    if (userUid) {
      const fetchData = async (userUid) => {
        try {
          const q = query(
            collection(db, 'userTemplate'),
            where('userId', '==', userUid),
            orderBy('createdAt'),
          );
          const querySnapshot = await getDocs(q);
          const data = querySnapshot.docs?.map((doc) => ({
            id: doc.id, // 문서 ID를 데이터 필드로 추가
            ...doc.data(), // 기존 문서 데이터 복사
          }));

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

          setData(data);
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

  // 탭 정보
  const Tabs = [
    {
      key: '1',
      label: `전체 데이터`,
      state: data,
    },
    {
      key: '2',
      label: `메일링 서비스 데이터`,
      state: mailingData,
    },
    {
      key: '3',
      label: `팬레터 서비스 데이터`,
      state: fanletterData,
    },
    {
      key: '4',
      label: `예약 서비스 데이터`,
      state: reservationData,
    },
  ];

  // Ant Design Tabs 컴포넌트에 전달할 아이템 정보
  const items = Tabs.map((tab) => ({
    key: tab.key,
    label: tab.label,
    children: (
      <>
        {tab.state?.map((data) => (
          <D.Container key={data.id}>
            <div>문서ID:{data.id}</div>
            <div>
              작성일자:
              {moment(data.createdAt.toDate()).format('YYYY년 M월 D일')}
            </div>
            {data.name && <div>이름:{data.name}</div>}
            {data.email && <div>이메일:{data.email}</div>}
            {data.phoneNumber && <div>핸드폰번호:{data.phoneNumber}</div>}
            {data.description && <div>팬레터 내용:{data.description}</div>}
          </D.Container>
        ))}
      </>
    ),
  }));

  return (
    <>
      <D.Tabs
        defaultActiveKey="1"
        size="small"
        tabBarGutter={30}
        items={items}
      />
      <div>
        <button onClick={onMailDataDownloadButtonClickHandler}>
          메일링 데이터 엑셀로 내보내기
        </button>
      </div>
      <br />
      <div>
        <button onClick={onFanletterDataDownloadButtonClickHandler}>
          팬레터 데이터 엑셀로 내보내기
        </button>
      </div>
      <br />
      <div>
        <button onClick={onReservationDataDownloadButtonClickHandler}>
          예약서비스 데이터 엑셀로 내보내기
        </button>
      </div>
    </>
  );
};

export default Data;
