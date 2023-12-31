import { styled } from 'styled-components';
import { Col, Modal } from 'antd';

export const L = {
  Container: styled.div`
    margin: 40px auto;
    padding: 40px 35px;
    background: var(--color-white);
    border-radius: 15px;

    h2 {
      font-size: 16px;
      font-weight: 600;
      text-align: left;
    }

    p {
      margin-top: 31px;
      font-size: 14px;
    }

    ${({ theme }) =>
      theme === 'dark' &&
      `
    color: var(--color-white);
    background: #2E2E2E;
    p {
      color: var(--color-white);
    }
  `}
    ${({ theme }) =>
      theme === 'light' &&
      `
    color: #000;
    background: var(--color-white);
    border: 1px solid #ddd;
    p {
      color: #000;
    }
  `}
  ${({ theme }) =>
      theme !== 'dark' &&
      theme !== 'light' &&
      `
     color: 'var(--color-white)';
     p {
       color: '#000';
     }
   `}
  `,

  Col: styled(Col)`
    text-align: center;
  `,

  Modal: styled(Modal)`
    img {
      margin: 5px auto 0;
      display: block;
      width: 100%;
      height: 100px;
      object-fit: cover;
    }

    p {
      margin-bottom: 10px;
    }

    input {
      display: none;
    }
  `,

  ButtonContainer: styled.div`
    margin: 0 auto;
    margin-top: 24px;
    display: flex;
    justify-content: center;
    width: 100%;
    > div {
      position: relative;
    }

    & button {
      overflow: hidden;
      margin: 0 9px;
      padding: 0;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: none;
      position: relative;

      &::before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 100%;
        background-size: cover;
        opacity: 0.5;
        position: absolute;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  `,

  MenuFormButton: styled.button`
    margin: 10px auto;
    padding: 17px 0;
    display: block;
    width: 100%;
    font-size: 14px;
    line-height: 14px;
    color: var(--color-accent);
    background: var(--color-white);
    border: 1px solid var(--color-accent);
    border-radius: 5px;
  `,

  ButtonArea: styled.div`
    margin: 10px auto 0;
    display: flex;
    gap: 5px;
  `,

  SubmitButton: styled.button`
    width: 100%;
    padding: 10px 0;
    display: block;
    font-size: 14px;
    line-height: 30px;
    color: var(--color-white);
    background: var(--color-accent);
    border-radius: 5px;
  `,
  DeleteButton: styled.button`
    width: 100%;
    padding: 10px 0;
    display: block;
    font-size: 14px;
    line-height: 30px;
    color: var(--color-white);
    background: var(--color-text);
    border-radius: 5px;
  `,

  CustomerSideContainer: styled.div`
    margin-bottom: 20px;
    > div {
      > div {
        text-align: center;
      }
    }
  `,

  IconContainer: styled.div`
    display: flex;
    flex-wrap: wrap;

    button {
      background-color: white;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 100%;
      background-size: cover;
      cursor: pointer;
    }
  `,
};
