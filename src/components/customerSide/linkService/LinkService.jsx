import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { db } from '../../../firebase/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Col, Row } from 'antd';
import { L } from '../../adminSide/myadmin/links/Links.styles';
import { useAtomValue } from 'jotai';
import { userUidAtom } from '../../../atoms/Atom';

const LinkService = () => {
  // const { uid } = useParams();
  const uid = useAtomValue(userUidAtom); //여기도 userUidAtom에 담긴 값을 사용하겠습니다. -수아
  console.log(uid);

  const [linkDataArray, setLinkDataArray] = useState([]); // 여러 문서 데이터를 저장할 배열
  //   console.log(linkDataArray);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'links'), where('uid', '==', uid));
        const querySnapshot = await getDocs(q);

        const newDataArray = []; // 3개의 문서 데이터를 임시로 담을 배열

        // forEach로 uid가 일치하는 문서 데이터 3개를 돌아가며 데이터 추출
        querySnapshot.forEach((doc) => {
          //   console.log('문서 데이터:', doc.data());
          const linkData = doc.data();
          console.log(linkData);
          newDataArray.push(linkData);
          setLinkDataArray(newDataArray); // 추출된 문서 데이터를 한 번에 업데이트
        });
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };

    fetchData();
  }, [uid]);
  return (
    <>
      <L.Container>
        <Row justify="center" align="middle" style={{ padding: '20px 0' }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <L.ButtonContainer style={{ marginTop: '20px' }}>
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
      </L.Container>
    </>
  );
};

export default LinkService;
