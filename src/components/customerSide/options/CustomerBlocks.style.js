import { styled } from 'styled-components';
import { Collapse } from 'antd';

// adminSide options 공통 css
export const C = {
  Container: styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;

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
      text-align: end;
    }

    label {
      font-size: 14px;
    }

    label span {
      color: red;
    }
  `,

  Collapse: styled(Collapse)`
    margin: 15px auto 0;
    background: #fff;
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
  `,
};
