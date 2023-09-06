import { styled } from 'styled-components';

export const L = {
  Container: styled.div`
    margin: 40px auto;
    padding: 40px 35px;
    background: #fff;
    border-radius: 15px;
  `,
  // ButtonContainer: styled.div`
  //   margin: 0 auto;
  //   display: flex;
  //   justify-content: center;
  //   div >
  //     & button {
  //       margin: 0 9px;
  //       padding: 0;
  //       width: 60px;
  //       height: 60px;
  //       border-radius: 50%;
  //       background: none;
  //       &:first-child {
  //         margin-left: 0;
  //       }
  //       &:last-child {
  //         margin-right: 0;
  //       }
  //       img {
  //         width: 100%;
  //         height: 100%;
  //         object-fit: cover;
  //         border-radius: 50%;
  //       }
  //     }
  //   }
  // `,
  ButtonContainer: styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 100%;
    > div {
      position: relative;
    }
    & button {
      margin: 0 9px;
      padding: 0;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: none;
      // &:first-child {
      //   margin-left: 0;
      // }
      // &:last-child {
      //   margin-right: 0;
      // }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
  `,
  ButtonDelete: styled.div`
    position: absolute;
    top: 0;
    right: 0;
    background: red;
    width: 20px;
    height: 20px;
    & button {
      margin: 0;
      width: 100%;
      height: 100%;
    }
  `,
  CustomerSideContainer: styled.div`
    margin-bottom: 20px;
  `,
};
