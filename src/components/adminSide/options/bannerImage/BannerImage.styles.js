import { styled } from 'styled-components';

export const B = {
  Container: styled.form`
    padding: 20px;
  `,
  Title: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #afafaf;

    input {
      width: 88%;
      height: 20px;
    }
  `,
  Contents: styled.div`
    display: grid;
    padding: 20px 10px;
    background-color: #d9d9d9;

    button {
      height: 30px;
      margin: 10px 0px;
    }
    label {
      justify-content: center;
      text-align: center;
      background-color: lightgray;
      padding: 8px 0px;
      margin-bottom: 10px;
      cursor: pointer;
    }
  `,
};
