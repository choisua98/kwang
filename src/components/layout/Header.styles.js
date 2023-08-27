import { styled } from 'styled-components';

export const H = {
  HeaderWrapper: styled.header`
    position: relative;
    padding: 15px 20px;
    height: initial;
    line-height: initial;
    background-color: #fff;
  `,
  MenuContentWrapper: styled.div`
    position: absolute;
    right: 0;
    padding: 10px;
    border: 1px solid rgb(217, 217, 217);
    border-radius: 5px;
    background: #fff;
    z-index: 2;
  `,
};
