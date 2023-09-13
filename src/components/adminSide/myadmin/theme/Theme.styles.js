import { Button } from 'antd';
import { styled } from 'styled-components';
import { Progress as AntProgress } from 'antd';
import darkIcon from '../../../../assets/images/common/icon/icon-dark.png';
import basicIcon from '../../../../assets/images/common/icon/icon-light.png';
import selectIcon from '../../../../assets/images/common/icon/icon-photo.png';
import defaultIcon from '../../../../assets/images/common/icon/icon-default.png';

export const T = {
  ModalTitle: styled.div`
    font-size: 15px;
    font-weight: 500;
    color: #312f2e;
    margin-bottom: 15px;
  `,
  ActivButton: styled.button`
    margin: 80px auto 0;
    padding: 21.5px 0;
    width: 100%;
    border-radius: 15px;
    color: white;
    background: #ff7c38;
  `,
  ButtonRow: styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  `,
  ButtonColumn: styled.div`
    width: 47%;
    div > p {
      margin-top: 10px;
      font-size: 14px;
      text-align: center;
      line-height: 14px;
      color: #000;
    }
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
  // 다크 모드
  DarkModeButton: styled.button`
    margin-top: 18px;
    width: 100%;
    height: 160px;
    font-size: 14px;
    text-align: left;
    line-height: 60px;
    color: #fff;
    border: solid transparent;
    background: #fff url(${darkIcon}) no-repeat center / cover;
    &:focus,
    &:active {
      border: solid #ff7c38;
      border-radius: 15px;
    }
  `,
  // 라이트 모드
  BasicModeButton: styled.button`
    margin-top: 18px;
    width: 100%;
    height: 160px;
    line-height: 60px;
    font-size: 14px;
    text-align: left;
    color: #000;
    border: solid transparent;
    background: #fff url(${basicIcon}) no-repeat center / cover;
    &:focus,
    &:active {
      border: solid #ff7c38;
      border-radius: 15px;
    }
  `,
  // 이미지 업로드
  SelectImageButton: styled.button`
    margin-top: 20px;
    width: 100%;
    height: 160px;
    font-size: 14px;
    text-align: left;
    line-height: 60px;
    border: solid transparent;
    background: #fff url(${selectIcon}) no-repeat center / cover;
    &:focus,
    &:active {
      border: solid #ff7c38;
      border-radius: 15px;
    }
  `,
  // 기본 설정
  SampleImageButton: styled.button`
    margin-top: 20px;
    width: 100%;
    height: 160px;
    font-size: 14px;
    text-align: left;
    border: solid transparent;
    background: #fff url(${defaultIcon}) no-repeat center / cover;
    &:focus,
    &:active {
      border: solid #ff7c38;
      border-radius: 15px;
    }
  `,
  HiddenInput: styled.input`
    display: none;
  `,
  Description: styled.p`
    font-size: 14px;
    font-weight: 500;
    color: #858585;
    letter-spacing: 0.5px;
  `,
  Progress: styled(AntProgress)`
    margin: 10px 0;
  `,

  ButtonContainer: styled.div`
    p {
      margin: 30px 0 10px 0;
    }
    button {
      background-color: white;
    }

    img {
      width: 20px;
      height: 20px;
    }
  `,
};
