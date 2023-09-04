import { Tabs } from 'antd';
import { styled } from 'styled-components';
export const D = {
  Tabs: styled(Tabs)`
    margin: auto;
    width: 100%;
    font-family: 'Pretendard-Regular';

    .ant-tabs-nav-wrap {
      display: flex;
      justify-content: center;
    }
  `,

  Container: styled.div`
    border: 2px solid gray;
    padding: 10px;
    margin: 10px;
    & p {
      font-size: large;
    }
  `,
};
