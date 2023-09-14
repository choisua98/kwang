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
    padding: 0 20px;
    font-family: 'Pretendard-Regular';

    .ant-tabs-nav-wrap {
      display: flex;
      justify-content: center;
      .ant-tabs-nav-list {
        justify-content: space-between;
        flex: 1;
      }
      .ant-tabs-tab {
        &:hover {
          color: #ff7a16;
        }
      }
      .ant-tabs-tab-active {
        .ant-tabs-tab-btn {
          color: #ff7a16;
        }
      }
      .ant-tabs-ink-bar {
        background: #ff7a16;
        left: 20px;
        right: 20px;
      }
    }
  `,

  Container: styled.div`
    display: flex;
    flex-direction: column;

    button {
      cursor: pointer;
      margin: 5px 0px 10px auto;
      padding: 20px 0 19px;
      width: 100%;
      font-size: 18px;
      color: #fff;
      border-radius: 15px;
      background-color: #ff7a16;
      .anticon-download {
        margin-left: 10px;
      }
    }
    div {
      background-color: #fffaf0;
      padding: 20px;
      margin-top: 5px;
      border-radius: 10px;
      &:nth-child(2) {
        margin-top: 0;
      }
    }
    & p {
      margin-top: 4px;
      font-size: 14px;
      color: #38393b;
      &:first-child {
        margin-top: 0;
      }
      > span {
        display: inline-block;
        width: 60px;
        &:last-child {
          width: 10px;
        }
      }
    }
  `,
};
