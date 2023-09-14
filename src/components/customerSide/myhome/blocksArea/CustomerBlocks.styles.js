import { styled } from 'styled-components';

export const C = {
  Container: styled.div`
    margin-bottom: 11px;

    img {
      cursor: pointer;
      width: 100%;
      height: 200px;
      object-fit: cover; // 이미지가 잘리지 않도록 설정
      background-color: #d6d6d6;
      border-radius: 15px;
    }
  `,

  Button: styled.button`
    margin-bottom: 15px;
    padding: 21.5px 0;
    width: 100%;
    font-size: 14px;
    text-algin: center;
    border-radius: 15px;
    ${({ theme }) =>
      theme === 'dark' && {
        color: '#fff',
        background: '#2E2E2E',
      }}
    ${({ theme }) =>
      theme === 'light' && {
        color: '#2E2E2E',
        background: '#DFDDE5',
      }}
    ${({ theme }) =>
      theme !== 'dark' &&
      theme !== 'light' && {
        color: 'var(--color-white)',
        background: 'var(--color-accent)',
      }}
  `,

  SwiperWrap: styled.div`
    margin: 10px 0 23px;
  `,
};
