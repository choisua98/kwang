import { styled } from 'styled-components';
import { Collapse } from 'antd';

// adminSide options 공통 css
export const C = {
  HeaderStyle: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0px;
    position: relative;

    button {
      position: absolute;
      left: 1%;
      font-size: 20px;
      background-color: transparent;
    }

    p {
      font-size: 18px;
      font-weight: 500;
    }
  `,

  Container: styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;

    h1 {
      font-weight: 500;
      margin-bottom: 10px;
    }

    h2 {
      margin-bottom: 20px;
    }

    h3 {
      font-size: 20px;
      text-align: center;
      margin: 30px 10px 10px 10px;
    }
    h4 {
      text-align: center;
      margin-bottom: 30px;
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      margin: 5px 0px;
    }

    ::placeholder {
      color: #999;
      padding: 5px 7px;
    }

    input {
      margin-top: 12px;
      padding: 16.5px 16px;
      box-sizing: border-box;
      border: none;
      border-radius: 15px;
      background: #fafafa;
    }

    textarea {
      height: 120px;
      margin-top: 12px;
      padding: 16.5px 16px;
      box-sizing: border-box;
      border: none;
      border-radius: 15px;
      background: #fafafa;
    }

    p {
      font-size: 14px;
    }

    label {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }

    label span {
      color: red;
    }
  `,

  Collapse: styled(Collapse)`
    text-align: start;
    background-color: var(--color-primary);
    margin: 0px 20px;

    p {
      font-size: 14px;
      text-align: start;
    }
  `,

  ButtonArea: styled.div`
    display: gird;
    margin: 50px 0px 40px 0px;
    position: relative;
  `,

  SubmitButton: styled.button`
    display: flex;
    margin: 12px auto;
    padding: 20px 0px;
    justify-content: center;
    width: 100%;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    border-radius: 15px;
    background-color: ${(props) => props.color || '#FF7C38;'};

    &:disabled {
      border: 1px solid gray;
      color: gray;
      cursor: default;
      background-color: rgb(255, 250, 240, 0.8);
      border: none;
    }
  `,
};
