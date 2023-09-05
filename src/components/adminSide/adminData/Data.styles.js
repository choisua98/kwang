import { Tabs } from 'antd';
import { styled } from 'styled-components';

export const D = {
  HeaderStyle: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0 40px 0;
    position: relative;

    button {
      position: absolute;
      left: 3%;
    }

    p {
      font-size: 18px;
    }
  `,

  Tabs: styled(Tabs)`
    margin: auto;
    font-family: 'Pretendard-Regular';

    .ant-tabs-nav-wrap {
      display: flex;
      justify-content: center;
    }
  `,

  Container: styled.div`
    display: flex;
    flex-direction: column;

    button {
      cursor: pointer;
      margin: 5px 0px 10px auto;
      padding: 5px;
      width: 150px;
      font-size: 16px;
      border-radius: 10px;
      background-color: #fff;
    }
    div {
      background-color: var(--color-secondary);
      padding: 15px;
      margin: 5px;
      border-radius: 10px;
    }
    & p {
      font-size: 16px;
    }
  `,
};
