import React from 'react';
import IconCheck from '../../assets/images/common/icon/icon-check.png';

const Intro4 = () => {
  return (
    <div style={{ padding: '50px 20px 50px', background: '#fff' }}>
      <h1
        style={{ fontSize: '18px', fontWeight: 'bold', lineHeight: 'normal' }}
      >
        이런 기능이 있어요!
      </h1>

      <ul style={{ margin: '30px 0 0', display: 'flex', flexWrap: 'wrap' }}>
        <li
          style={{
            padding: '31px 21px 31px 14px',
            boxSizing: 'border-box',
            width: 'calc(50% - 6px)',
            fontWeight: 'bold',
            borderRadius: '15px',
            backgroundImage: `url(${IconCheck})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '90% 50%',
            backgroundColor: '#FFFAF0',
          }}
        >
          방명록
        </li>
        <li
          style={{
            marginLeft: '6px',
            padding: '31px 21px 31px 14px',
            boxSizing: 'border-box',
            width: 'calc(50% - 6px)',
            fontWeight: 'bold',
            borderRadius: '15px',
            backgroundImage: `url(${IconCheck})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '90% 50%',
            backgroundColor: '#FFFAF0',
          }}
        >
          함께해요 챌린지
        </li>
        <li
          style={{
            marginTop: '6px',
            padding: '31px 21px 31px 14px',
            boxSizing: 'border-box',
            width: 'calc(50% - 6px)',
            fontWeight: 'bold',
            borderRadius: '15px',
            backgroundImage: `url(${IconCheck})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '90% 50%',
            backgroundColor: '#FFFAF0',
          }}
        >
          예약 신청
        </li>
        <li
          style={{
            marginTop: '6px',
            marginLeft: '6px',
            padding: '31px 21px 31px 14px',
            boxSizing: 'border-box',
            width: 'calc(50% - 6px)',
            fontWeight: 'bold',
            borderRadius: '15px',
            backgroundImage: `url(${IconCheck})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '90% 50%',
            backgroundColor: '#FFFAF0',
          }}
        >
          자주 묻는 질문
        </li>
      </ul>
    </div>
  );
};

export default Intro4;
