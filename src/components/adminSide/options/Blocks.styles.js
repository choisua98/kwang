import { styled } from 'styled-components';

// adminSide options 공통 css
export const O = {
  HeaderStyle: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0px 40px 0px;
    position: relative;

    button {
      position: absolute;
      left: 3%;
      font-size: 20px;
      background-color: transparent;
    }

    p {
      font-size: 18px;
    }
  `,

  FormGuideStyle: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 0px 20px;

    h2 {
      font-size: 16px;
      font-weight: 600;
    }

    p {
      font-size: 14px;
      font-weight: 500;
      color: #858585;
      letter-spacing: 0.5px;
    }

    span {
      color: var(--color-text);
      font-weight: 600;
      margin-left: 5px;
      margin-right: 5px;
    }
  `,

  Container: styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
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

    label {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
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

  MenuFormButton: styled.div`
    padding: 18px 0;
    width: 100%;
    height: auto;
    border-radius: 15px;
    border: 1.5px solid var(--color-accent);
    font-size: 14px;
    font-weight: 600;
    color: var(--color-accent);
    background: none;
    text-align: center;
    margin-top: 15px;
  `,

  SubmitButton: styled.button`
    display: flex;
    margin: 12px auto;
    padding: 20px 0px;
    justify-content: center;
    width: 100%;
    font-size: 14px;
    font-weight: 700;
    color: var(--color-white);
    border-radius: 15px;
    background-color: ${(props) => props.color || `var(--color-accent)`};

    &:disabled {
      border: 1px solid gray;
      color: gray;
      cursor: default;
      background-color: rgb(255, 250, 240, 0.8);
      border: none;
    }
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
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 20px 0px;
    color: var(--color-text);

    div > p:nth-child(1) {
      height: 50px;
      border-radius: 15px 15px 0px 0px;
      background-color: var(--color-secondary);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    div > p:nth-child(2) {
      height: 70px;
      border-radius: 0px 0px 15px 15px;
      background-color: var(--color-bg);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    button {
      position: absolute;
      right: 70px;
      background-color: transparent;
      border: none;
    }
  `,
};
