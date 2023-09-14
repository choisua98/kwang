import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../../firebase/firebaseConfig';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { Col, Row, message } from 'antd';
import { L } from '../../../adminSide/myadmin/links/Links.styles';

const LinkService = () => {
  const { uid } = useParams();
  const [linkDataArray, setLinkDataArray] = useState([]); // 여러 문서 데이터를 저장할 배열

  useEffect(() => {
    setLinkDataArray([]); // 남아있는 링크 데이터를 초기화

    const fetchData = async () => {
      try {
        const q = query(
          collection(db, 'links'),
          where('uid', '==', uid),
          orderBy('createdAt'),
        );
        const querySnapshot = await getDocs(q);

        const newDataArray = []; // 3개의 문서 데이터를 임시로 담을 배열

        // forEach로 uid가 일치하는 문서 데이터 3개를 돌아가며 데이터 추출
        querySnapshot.forEach((doc) => {
          const linkData = doc.data();
          newDataArray.push(linkData);
        });

        setLinkDataArray(newDataArray);
      } catch (error) {
        message.error('에러 발생:', error);
      }
    };

    fetchData();
  }, [uid]);

  return (
    <>
      <L.CustomerSideContainer>
        <Row justify="center" align="middle">
          <Col span={24} style={{ textAlign: 'center' }}>
            <L.ButtonContainer>
              {linkDataArray.map((linkData, index) => (
                <button
                  key={index}
                  onClick={() => {
                    let url = linkData.url;
                    // www. 으로 시작되는 경우 앞에 http:// 붙여서 URL 설정하기
                    if (url.startsWith('www')) {
                      url = 'http://' + url;
                    }
                    window.open(url, '_blank'); // 새 탭에서 URL 열기
                  }}
                >
                  <img src={linkData.imageUrl} alt="Link Icon" />
                </button>
              ))}
            </L.ButtonContainer>
          </Col>
        </Row>
      </L.CustomerSideContainer>
    </>
  );
};

export default LinkService;
