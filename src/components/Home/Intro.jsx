import React from 'react';
import IntroBanner from '../../assets/images/customer/home/banner/intro/intro-banner.png';
import IconLink from '../../assets/images/common/icon/icon-link.png';
import IconCheck from '../../assets/images/common/icon/icon-check.png';

const Intro = () => {
  return (
    <>
      <div style={{ margin: '42px auto 50px' }}>
        <h1
          style={{
            padding: '0 20px',
            fontSize: '18px',
            fontWeight: '600',
            lineHeight: 'normal',
          }}
        >
          크리에이터를 위한
          <br />단 하나의 링크, 크왕
        </h1>
        <img
          src={IntroBanner}
          alt="크왕 크리에이터 이미지"
          style={{
            margin: '22px auto 31.5px',
            width: '100%',
          }}
        />
        <h2
          style={{ fontSize: '16px', lineHeight: '141% ', textAlign: 'center' }}
        >
          누구나 다양한 형태로 창작활동을 하는
          <br />
          <b style={{ fontWeight: 'bold' }}>크리에이터가 되는 시대</b>
        </h2>
        <h3
          style={{
            margin: '12.5px auto 0',
            fontSize: '14px',
            textAlign: 'center',
            lineHeight: '141%',
            color: '#a1a1a1',
          }}
        >
          멀티링크 서비스 크왕은 크리에이터가 작업을 심으면 그것의 <br /> 열매가
          발화하도록 돕는 토양의 역할을 해요.
        </h3>
      </div>

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
            <img src={IconLink} alt="링크 이미지" style={{ width: '100%' }} />
            <p
              style={{
                margin: '32px  0 0',
                fontSize: '14px',
                fontWeight: 'bold',
                lineHeight: '135%',
                color: '#000',
              }}
            >
              타이틀
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
            <img src={IconLink} alt="링크 이미지" style={{ width: '100%' }} />
            <p
              style={{
                margin: '32px  0 0',
                fontSize: '14px',
                fontWeight: 'bold',
                lineHeight: '135%',
                color: '#000',
              }}
            >
              타이틀
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

      <div style={{ padding: '50px 20px 50px' }}>
        <h1
          style={{
            fontSize: '18px',
            fontWeight: '600',
            lineHeight: 'normal',
          }}
        >
          멀티링크 서비스는
          <br />
          크왕 말고도 많지 않나요?
        </h1>
        <h2
          style={{
            marginTop: '20px',
            fontSize: '14px',
            lineHeight: '141%',
            color: '#787878',
          }}
        >
          대부분의 프로필 링크(멀티 링크) 서비스는 ‘링크를 여러 개<br />
          걸어 노출할 수 있는 하나의 링크' 를 제공하고 있지만 그 외의
          <br />
          부가적인 기능 제공이 부족했어요.
          <br />
          <br />
          크왕에서는 여러 사이트를 하나의 링크로 통합하고 챌린지,
          <br />
          팬레터 등 다양한 소통 기능들과 번거로운 예약 시스템까지
          <br />
          한곳에서 관리할 수 있어요.
        </h2>
      </div>

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
    </>
  );
};

export default Intro;
