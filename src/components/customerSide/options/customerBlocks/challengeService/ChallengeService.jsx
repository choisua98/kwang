import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../../firebase/firebaseConfig';
import { A11y, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CS } from './ChallengeService.styles';
import { C } from '../../CustomerBlocks.style';
import { LeftOutlined } from '@ant-design/icons';

const ChallengeService = () => {
  const navigate = useNavigate();
  const [challengeData, setChallengeData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { uid } = useParams();
  const userUid = uid;

  // firebase에서 데이터 불러오기
  const fetchData = async () => {
    try {
      // 쿼리 실행하여 데이터 가져오기
      const q = query(
        collection(db, 'template'),
        where('userId', '==', userUid),
        where('blockKind', '==', 'challenge'),
      );
      const querySnapshot = await getDocs(q);

      const initialDocuments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 가공된 데이터를 상태에 업데이트
      setChallengeData(initialDocuments);
    } catch (error) {
      console.error('데이터 가져오기 오류:', error);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기 함수 호출
  useEffect(() => {
    if (userUid) {
      fetchData();
    }
  }, [userUid]);

  // '오늘 인증 남기기' 버튼 클릭 시 실행되는 함수
  const handleChallengeVerification = (title) => {
    navigate(`/${userUid}/challenge/verify`, {
      state: { selectedDate: `${selectedDate}`, title: `${title}` },
    });
  };

  // 달력에서 활성화/비활성화일을 결정하는 함수
  const tileDisabled = ({ date, view }) => {
    // 월간 뷰에서만 적용
    if (view === 'month') {
      for (const data of challengeData) {
        const startDate = new Date(data.startDate);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(data.endDate);
        endDate.setHours(0, 0, 0, 0);

        // 날짜가 챌린지 기간에 포함되면 활성화
        if (date >= startDate && date <= endDate) {
          return false;
        }
      }
    }
    // 그 외의 경우에는 비활성화
    return true;
  };

  return (
    <>
      {challengeData.map((data) => {
        return (
          <div key={data.id}>
            <C.HeaderStyle>
              <button onClick={() => navigate(`/admin/${userUid}`)}>
                <LeftOutlined />
              </button>
              <p>{data.title}</p>
            </C.HeaderStyle>

            {data.blockKind === 'challenge' && (
              <CS.ImageContainer>
                <Swiper
                  modules={[Pagination, A11y]}
                  pagination={{ clickable: true }}
                  a11y
                >
                  {data.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img src={image} alt={`reservationimage ${index + 1}`} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </CS.ImageContainer>
            )}
            <CS.Container>
              <div>{data.description}</div>
              <div>
                챌린지 기간
                <p>
                  {data.startDate} ~ {data.endDate}
                </p>
              </div>
            </CS.Container>

            <CS.CalendarContainer>
              <Calendar
                onChange={setSelectedDate}
                value={null}
                prev2Label={null}
                next2Label={null}
                formatDay={(_, date) =>
                  date.toLocaleString('en', { day: 'numeric' })
                }
                tileDisabled={tileDisabled}
                showNeighboringMonth={false}
              />
            </CS.CalendarContainer>

            <C.ButtonArea>
              <C.SubmitButton
                onClick={() => handleChallengeVerification(data.title)}
              >
                오늘 인증 남기기
              </C.SubmitButton>
            </C.ButtonArea>
          </div>
        );
      })}
    </>
  );
};

export default ChallengeService;
