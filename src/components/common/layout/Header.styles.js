import { styled } from 'styled-components';

export const H = {
  HeaderWrapper: styled.header`
    position: relative;
    padding: 50px 20px 11px;
    height: initial;
    line-height: initial;
    background-color: #fff;
  `,
  Logo: styled.img`
    padding-top: 8px;
    // padding-top: ${(props) => props.topPadding || '0'}px;
  `,
  MenuContentWrapper: styled.div`
    position: absolute;
    right: 15px;
    padding: 10px;
    border: 1px solid rgb(217, 217, 217);
    border-radius: 5px;
    background: #fff;
    z-index: 2;
  `,
};
