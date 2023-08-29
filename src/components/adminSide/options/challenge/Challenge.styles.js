import { styled } from 'styled-components';

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

    input,
    button {
      height: 30px;
    }

    textarea {
      height: 100px;
    }
  `,

  ImageContainer: styled.div`
    display: flex;
    gap: 10px;
    color: #d3d3d3;

    label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 60px;
      border-radius: 5px;
      background: #fafafa;
      cursor: pointer;
    }

    .disabled {
      pointer-events: none;
    }

    span {
      padding-top: 2px;
      font-size: 0.8rem;
    }

    input {
      display: none;
    }

    .square-preview {
      width: 60px;
      height: 60px;
      border-radius: 5px;
      background-size: cover;
      background-position: center;
    }
  `,
};
