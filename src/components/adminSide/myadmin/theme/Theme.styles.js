import { Button } from 'antd';
import { styled } from 'styled-components';
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
    margin: 100px auto 0;
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
    height: 60px;
    font-size: 14px;
    text-align: left;
    line-height: 60px;
    border: 1px solid #f4791c;
    border-radius: 15px;
    background: #000;
    color: #fff;
    // background-image: url(${darkIcon});
    // background-repeat: no-repeat;
    // background-position: 90% 50%;
  `,

  BasicModeButton: styled.button`
    margin-top: 20px;
    padding: 0 24px 0 22px;
    width: 100%;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    text-align: left;
    border: 1px solid #f4791c;
    border-radius: 15px;
    background: #fff;
    // background-image: url(${basicIcon});
    // background-repeat: no-repeat;
    // background-position: 90% 50%;
    color: #000;
  `,

  SelectImageButton: styled.button`
    margin-top: 20px;
    padding: 0 24px 0 22px;
    width: 100%;
    height: 60px;
    font-size: 14px;
    text-align: left;
    line-height: 60px;
    border: 1px solid #f4791c;
    border-radius: 15px;
    background: #d3d3d3;
    background-image: url(${selectIcon});
    background-repeat: no-repeat;
    background-position: 43% 50%;
  `,

  SampleImageButton: styled.button`
    margin-top: 20px;
    padding: 0 24px 0 22px;
    width: 100%;
    height: 60px;
    font-size: 14px;
    text-align: left;
    border: 1px solid #f4791c;
    border-radius: 15px;
    background-image: url(${sampleImg});
    background-size: cover;
    background-position: center;
    // background-image: url(${defaultIcon});
    // background-repeat: no-repeat;
    // background-position: 92% 50%;
  `,
};
