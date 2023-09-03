import React from 'react';
import IconLink from '../../assets/images/common/btn/btn-link.png';

const Intro2 = () => {
  return (
    <div
      style={{
        padding: '50px 20px 49px',
        background: '#fff',
      }}
    >
      <h1
        style={{
          padding: '0 20px',
          fontSize: '18px',
          fontWeight: '600',
          lineHeight: 'normal',
        }}
      >
        단 하나의 링크로
        <br />
        모든 활동을 연결하세요!
      </h1>
      <h2
        style={{
          marginTop: '15px',
          padding: '0 20px',
          fontSize: '14px',
          lineHeight: '141%',
          letterSpacing: '-0.3px',
          color: '#787878',
        }}
      >
        크왕은 플랫폼의 경계 없이 흩어진 사이트를 하나의 링크로
        <br />
        연동하고 예약과 소통까지 한번에 가능한 서비스입니다.
      </h2>
      <ul style={{ marginTop: '40px', display: 'flex' }}>
        <li
          style={{
            padding: '19px 27px 26px 20px',
            width: '50%',
            background: '#FFFAF0',
            borderRadius: '15px',
          }}
        >
          <img src={IconLink} alt="링크 이미지" />
          <p
            style={{
              margin: '32px  0 0',
              fontSize: '14px',
              fontWeight: 'bold',
              lineHeight: '135%',
              color: '#000',
            }}
          >
            타이틀 지정
          </p>
          <p
            style={{
              marginTop: '10px',
              fontSize: '12px',
              lineHeight: '135%',
              color: '#a1a1a1',
            }}
          >
            작가, 강연가, 여행가, 강사, 블로거 N잡러까지 당신의 크리에이티브한
            활동들을 하나의 링크로 통합해요.
          </p>
        </li>
        <li
          style={{
            marginLeft: '6px',
            padding: '19px 27px 26px 20px',
            width: '50%',
            background: '#FFFAF0',
            borderRadius: '15px',
          }}
        >
          <img src={IconLink} alt="링크 이미지" />
          <p
            style={{
              margin: '32px  0 0',
              fontSize: '14px',
              fontWeight: 'bold',
              lineHeight: '135%',
              color: '#000',
            }}
          >
            타이틀 지정
          </p>
          <p
            style={{
              marginTop: '10px',
              fontSize: '12px',
              lineHeight: '135%',
              color: '#a1a1a1',
            }}
          >
            PR과 소통, DB수집까지 한번에 할 수 있는 멀티링크 서비스 크왕!
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Intro2;
