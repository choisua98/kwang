import { Button } from 'antd';
import { styled } from 'styled-components';
import { Progress as AntProgress } from 'antd';
import darkIcon from '../../../../assets/images/common/icon/icon-dark.webp';
import basicIcon from '../../../../assets/images/common/icon/icon-light.webp';
import selectIcon from '../../../../assets/images/common/icon/icon-photo.webp';
import defaultIcon from '../../../../assets/images/common/icon/icon-default.webp';

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
    background: var(--color-accent);
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
    color: var(--color-white);
    border-radius: 15px;
    background: var(--color-primary);
    ${({ theme }) =>
      theme === 'dark' &&
      `
      color:var(--color-white); 
      background:#2E2E2E;`}

    ${({ theme }) =>
      theme === 'light' &&
      `
      color:#000; 
      background:#DFDDE5;`}
    
    ${({ theme }) =>
      !(theme === 'dark' || theme === 'light') &&
      `
      color:var(--color-white); 
      background:var(--color-primary)`}
  `,
  // 다크 모드
  DarkModeButton: styled.button`
    margin-top: 18px;
    width: 100%;
    height: 160px;
    font-size: 14px;
    text-align: left;
    line-height: 60px;
    color: var(--color-white);
    border: solid transparent;
    background: #fff url(${darkIcon}) no-repeat center / cover;
    &:focus,
    &:active {
      border: solid var(--color-accent);
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
      border: solid var(--color-accent);
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
      border: solid var(--color-accent);
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
      border: solid var(--color-accent);
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
