import { styled } from 'styled-components';

export const R = {
  Container: styled.div`
    padding: 20px;
  `,
  Contents: styled.div`
    display: grid;
    padding: 10px 10px;
    /* background-color: #d9d9d9; */

    p {
      padding: 10px 0px;
    }

    label {
      justify-content: center;
      text-align: center;
      background-color: lightgray;
      padding: 8px 0px;
      margin-bottom: 10px;
      cursor: pointer;
    }

    button {
      height: 30px;
      margin: 10px 0px;
    }

    input {
      height: 50px;
      margin: 10px 0px;
    }
    textarea {
      height: 80px;
    }
  `,
};
