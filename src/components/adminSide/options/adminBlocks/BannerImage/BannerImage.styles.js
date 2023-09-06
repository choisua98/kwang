import { styled } from 'styled-components';
import IconDelete from '../../../../../assets/images/common/icon/icon-delete.png';

// adminSide options 공통 css
export const B = {
  // 이미지 스타일
  ImageContainer: styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    color: #d3d3d3;

    label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 80%;
      height: 240px;
      border-radius: 10px;
      background: #fafafa;
      cursor: pointer;

      span {
        color: #d3d3d3;
      }
    }

    .disabled {
      width: 100%;
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

    button {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background: url(${IconDelete}) no-repeat 50% 50% / cover;
      opacity: 0.7;
    }
  `,

  ImageUpload: styled.div`
    width: 80%;
  `,

  Preview: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
  `,
};
