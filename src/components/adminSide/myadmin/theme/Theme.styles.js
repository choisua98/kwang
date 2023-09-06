import { Button } from 'antd';
import { styled } from 'styled-components';
import sampleImg from '../../../../assets/images/admin/sample.jpg';

export const T = {
  ModalTitle: styled.div`
    font-size: 15px;
    font-weight: 500;
    color: #312f2e;
    margin-bottom: 15px;
  `,
  ActivButton: styled.button`
    margin: 20px auto 0;
    padding: 21.5px 0;
    width: 100%;
    border-radius: 15px;
    color: white;
    background: #ff7c38;
  `,
  ThemeMenuButton: styled(Button)`
    margin-bottom: 15px;
    padding: 18px 0;
    width: 100%;
    height: auto;
    font-size: 14px;
    color: #fff;
    border-radius: 15px;
    background: #ffbe51;
  `,

  DarkModeButton: styled.button`
    width: 100%;
    height: 100px;
    border: 1px solid #000;
    border-radius: 15px;
    background: black;
    color: #fff;
  `,

  BasicModeButton: styled.button`
    width: 100%;
    height: 100px;
    border: 1px solid #000;
    border-radius: 15px;
    background: #fff;
    color: #000;
  `,

  SelectImageButton: styled.button`
    width: 100%;
    height: 100px;
    border: 1px solid #000;
    border-radius: 15px;
  `,

  SampleImageButton: styled.button`
    width: 100%;
    height: 100px;
    border: 1px solid #000;
    border-radius: 15px;
    background-image: url(${sampleImg});
    background-size: cover;
    background-position: center;
  `,
};
