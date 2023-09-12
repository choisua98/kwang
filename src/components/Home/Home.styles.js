import { styled } from 'styled-components';

export const M = {
  MainBannerContainer: styled.div`
    padding: 0 20px;
    .swiper {
      margin: 25px auto 0;
      width: 100%;
      .swiper-slide > a > img {
        width: 100%;
      }
    }
  `,
};

export const N = {
  NewCreatorContainer: styled.div`
    margin: 28px auto 40px;
    padding: 0 20px;
    .swiper {
      margin: 20px auto 0;
      width: 349px;
      height: 170px;
      object-fit: contain;
      .swiper-slide {
        cursor: pointer;
        > img {
          width: 150px;
          height: 100px;
          border-radius: 10px;
          object-fit: cover;
        }
        > p:nth-child(2) {
          margin-top: 12px;
          font-size: 14px;
          font-weight: bold;
          line-height: normal;
          color: #000;
        }
        > p:nth-child(3) {
          margin-top: 5px;
          font-size: 12px;
          line-height: normal;
          color: #9a9ea5;
        }
      }
    }
  `,
  H1: styled.h1`
    font-size: 16px;
    font-weight: bold;
    line-height: normal;
    color: #000;
  `,
};

export const I = {
  Container: styled.div`
    > img {
      width: 100%;
    }
  `,
  Footer: styled.footer`
    padding: 43px 0 32px;
    width: 100%;
    text-align: center;
    background: #ff7a16;
    > p {
      font-size: 14px;
      font-weight: 600;
      color: #fff;
    }
    > button {
      margin-top: 20px;
      max-width: 129px;
      width: 100%;
      height: 43px;
      font-size: 14px;
      font-weight: 600;
      color: #ff7a16;
      background: #fff;
      border-radius: 15px;
      box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.25);
    }
    > address {
      padding: 73px 0 0;
      font-family: 'Roboto';
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.8);
    }
  `,
};
