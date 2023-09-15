import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebaseConfig';
import { D } from './Data.styles';
import moment from 'moment';
import * as XLSX from 'xlsx';
import { DownloadOutlined } from '@ant-design/icons';
import { LeftOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { userAtom } from '../../../atoms/Atom';

const Data = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const user = useAtomValue(userAtom);
  const userUid = user?.uid;

  const downloadButtonHandler = (value) => {
    const tab = Tabs.find((tab) => tab.name === value);
    if (tab) {
      const ws = XLSX.utils.json_to_sheet(tab.state);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, `${tab.label}.xlsx`);
    }
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
            id: doc.id,
            ...doc.data(),
          }));

          setData(data);
        } catch (error) {
          console.error('데이터 가져오기 오류:', error);
          message.error('데이터 가져오기 오류가 발생했습니다.');
        }
      };

      fetchData(userUid);
    }
  }, [userUid]);

  // 탭 정보
  const Tabs = [
    {
      key: '1',
      label: `메일링 서비스`,
      state: data.filter((item) => item.dataKind === 'mailingData'),
      name: 'mailingData',
    },
    {
      key: '2',
      label: `팬레터 서비스`,
      state: data.filter((item) => item.dataKind === 'fanletterData'),
      name: 'fanletterData',
    },
    {
      key: '3',
      label: `예약 서비스`,
      state: data.filter((item) => item.dataKind === 'reservationData'),
      name: 'reservationData',
    },
  ];

  return (
    <>
      <D.HeaderStyle>
        <Button
          icon={<LeftOutlined onClick={() => navigate(`/admin/${userUid}`)} />}
        />
        <p>고객 정보 페이지</p>
      </D.HeaderStyle>
      <D.Tabs
        defaultActiveKey="1"
        size="large"
        items={Tabs.map((tab) => ({
          key: tab.key,
          label: tab.label,
          children: (
            <>
              <D.Container>
                <button
                  value={tab.name}
                  onClick={(event) => downloadButtonHandler(event.target.value)}
                >
                  리스트 다운로드 <DownloadOutlined />
                </button>
                {tab.state?.map((data) => (
                  <div key={data.id}>
                    <p>
                      <span>작성일자</span>
                      <span>:</span>
                      {moment(data.createdAt.toDate()).format('YYYY년 M월 D일')}
                    </p>
                    {data.name && (
                      <p>
                        <span>이름</span>
                        <span>:</span>
                        {data.name}
                      </p>
                    )}
                    {data.email && (
                      <p>
                        <span>이메일</span>
                        <span>:</span>
                        {data.email}
                      </p>
                    )}
                    {data.phoneNumber && (
                      <p>
                        <span>연락처</span>
                        <span>:</span>
                        {data.phoneNumber}
                      </p>
                    )}
                    {data.description && (
                      <p>
                        <span>내용</span>
                        <span>:</span>
                        {data.description}
                      </p>
                    )}
                  </div>
                ))}
              </D.Container>
            </>
          ),
        }))}
      />
    </>
  );
};

export default Data;
