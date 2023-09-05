import { styled } from 'styled-components';

// adminSide options 공통 css
export const O = {
  HeaderStyle: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0px 60px 0px;
    position: relative;

    button {
      position: absolute;
      left: 3%;
    }
    p {
      font-size: 18px;
    }
  `,

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
    background-color: ${(props) => props.color || `var(--color-accent)`};
  `,

  // 이미지 스타일
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

      span {
        color: #d3d3d3;
      }
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

  // faqlist 스타일
  FaqList: styled.div`
    display: grid;

    div {
      display: grid;
      padding: 10px 0px;
      background-color: var(--color-secondary);
      border: 1px solid var(--color-primary);
      border-radius: 10px;
      margin: 8px;
    }

    p {
      padding: 5px 0px;
      text-align: center;
    }

    button {
      margin-right: 0px;
      padding: 5px;
      margin: 5px 20px;
      border: 2px solid #d3d3d3;
    }
  `,
};