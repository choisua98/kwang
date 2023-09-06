import { styled } from 'styled-components';
// import EditIcon from '../../../assets/images/common/icon/icon-edit.png';
import EditIcon from '../../../../assets/images/common/icon/icon-edit.png';

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
      overflow: hidden;
      margin: 0 9px;
      padding: 0;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: none;
      position: relative;
      // &:first-child {
      //   margin-left: 0;
      // }
      // &:last-child {
      //   margin-right: 0;
      // }
      &::before {
        content: '';
        display: inline-block;
        width: 100%;
        height: 100%;
        // background: url(https://cdn.pixabay.com/photo/2020/06/28/00/04/chicago-5347435_960_720.jpg);
        // background: url(${EditIcon});
        // background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        //   url(${EditIcon});
        background-size: cover;
        opacity: 0.5;
        position: absolute;
        // top: 0px;
        // left: 0px;
        // right: 0px;
        // bottom: 0px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        // position: relative;
        // &::before {
        //   content: '';
        //   display: inline-block;
        //   width: 100%;
        //   height: 100%;
        //   background: url(https://cdn.pixabay.com/photo/2020/06/28/00/04/chicago-5347435_960_720.jpg);
        //   background-size: cover;
        //   opacity: 0.5;
        //   // position: absolute;
        //   // top: 0px;
        //   // left: 0px;
        //   // right: 0px;
        //   // bottom: 0px;
        // }
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
      &::before {
        background: none;
      }
    }
  `,
  CustomerSideContainer: styled.div`
    margin-bottom: 20px;
  `,
};
