import { Button } from 'antd';
import { styled } from 'styled-components';
import { Progress as AntProgress } from 'antd';
import sampleImg from '../../../../assets/images/admin/sample.jpg';
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
    margin-top: 18px;
    padding: 0 24px 0 22px;
    width: 100%;
    height: 160px;
    font-size: 14px;
    text-align: left;
    line-height: 60px;
    color: #fff;
    background-color: #fff;
    background-image: url(${darkIcon});
    background-repeat: no-repeat;
  `,

  BasicModeButton: styled.button`
    margin-top: 18px;
    padding: 0 24px 0 22px;
    width: 100%;
    height: 160px;
    line-height: 60px;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    background-image: url(${basicIcon});
    background-repeat: no-repeat;
    color: #000;
  `,

  SelectImageButton: styled.button`
    margin-top: 20px;
    padding: 0 24px 0 22px;
    width: 100%;
    height: 160px;
    font-size: 14px;
    text-align: left;
    line-height: 60px;
    background-color: #fff;
    background-image: url(${selectIcon});
    background-repeat: no-repeat;
  `,

  SampleImageButton: styled.button`
    margin-top: 20px;
    padding: 0 24px 0 22px;
    width: 100%;
    height: 160px;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    background-image: url(${defaultIcon});
    background-repeat: no-repeat;
  `,
  Description: styled.p`
    /* margin-top: 20px; */
    font-size: 14px;
    font-weight: 500;
    color: #858585;
    letter-spacing: 0.5px;
  `,
  Progress: styled(AntProgress)`
    margin: 10px 0;
  `,
};
