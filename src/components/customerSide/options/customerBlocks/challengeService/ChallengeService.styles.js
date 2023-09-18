import { Modal } from 'antd';
import { styled } from 'styled-components';

export const CS = {
  GridContainer: styled.div`
    padding: 0px 20px 20px 20px;
  `,

  Container: styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 0px;

    div {
      font-size: 14px;
      font-weight: 500;
      padding: 10px 0;
    }

    p {
      font-size: 14px;
      font-weight: 500;
      margin-top: 12px;
      padding: 16.5px 16px;
      box-sizing: border-box;
      border: none;
      border-radius: 15px;
      background: #fafafa;
    }
  `,

  Layout: styled.div`
    padding: 0 20px;
  `,

  ImageContainer: styled.div`
    margin-top: 20px;
    width: 100%;

    img {
      width: 100%;
      height: 230px;
      object-fit: cover;
      border-radius: 10px;
    }
  `,

  CalendarContainer: styled.div`
    .react-calendar {
      overflow: hidden;
      max-width: 100%;
      width: 100%;
      background-color: var(--color-white);
      color: #222;
      border-radius: 8px;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.125em;
    }
    .react-calendar__navigation button {
      color: var(--color-accent);
      min-width: 44px;
      background: none;
      font-size: 16px;
      margin-top: 8px;
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
      background-color: #f8f8fa;
    }
    .react-calendar__navigation button[disabled] {
      background-color: #f0f0f0;
    }
    abbr[title] {
      text-decoration: none;
    }

    .react-calendar__tile {
      margin-top: 0;
      margin-bottom: 0;
      background: #f8f8fa;
      color: var(--color-accent);
      border-radius: 0;
    }

    .react-calendar__tile:disabled {
      background: none;
      color: #222;
      border-radius: 0;
    }

    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
      background: var(--color-accent);
      color: white;
      border-radius: 6px;
    }
    .react-calendar__tile--now {
      background: #f8f8fa;
      color: var(--color-accent);
      border-radius: none;
      font-weight: none;
    }

    .react-calendar__tile--hasActive:enabled:hover,
    .react-calendar__tile--hasActive:enabled:focus {
      background: #f8f8fa;
    }
    .react-calendar__tile--active {
      background: var(--color-accent);
      border-radius: 6px;
      font-weight: bold;
      color: white;
    }
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
      background: var(--color-accent);
      color: white;
    }
    .react-calendar--selectRange .react-calendar__tile--hover {
      background-color: #f8f8fa;
    }
    .react-calendar__tile--range {
      background: #f8f8fa;
      color: var(--color-accent);
      border-radius: 0;
    }
    .react-calendar__tile--rangeStart {
      border-radius: 6px;
      background: var(--color-accent);
      color: white;
    }
    .react-calendar__tile--rangeEnd {
      border-radius: 6px;
      background: var(--color-accent);
      color: white;
    }
  `,
};

export const CC = {
  CountStyle: styled.div`
    position: relative;
    width: 100%;
    height: 105px;
    background: var(--color-secondary);
    border-radius: 15px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 500;
    margin: 40px 0px;
    box-sizing: border-box;

    img {
      position: absolute;
      left: 20px;
    }
    p {
      position: absolute;
      top: 31px;
      left: 101px;
      font-size: 14px;
    }
    span {
      position: absolute;
      top: 56px;
      left: 101px;
      font-size: 17px;
    }
  `,

  Container: styled.form`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 30px;

    ::placeholder {
      color: #7a7a7a;
      padding: 5px 7px;
    }

    input {
      padding: 16.5px 16px;
      box-sizing: border-box;
      border: none;
      border-radius: 15px;
      background: #fafafa;
      margin-bottom: 20px;
    }

    textarea {
      height: 120px;
      padding: 16.5px 16px;
      box-sizing: border-box;
      border: none;
      border-radius: 15px;
      background: #fafafa;
    }

    label {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
    }

    label span {
      color: red;
    }
  `,

  CustomModal: styled(Modal)`
    border-radius: 15px;

    .ant-modal-header {
      margin: 0;
      text-align: center;
    }

    .ant-modal-title {
      font-size: 14px;
      line-height: 14px;
      color: var(--color-text);

      button {
        position: absolute;
        left: 5%;
        font-size: 15px;
        color: #7a7a7a;
        background-color: transparent;
      }
    }
  `,

  CommentsContainer: styled.div`
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 30px;

    p {
      padding: 16.5px 16px;
      box-sizing: border-box;
      border: none;
      border-radius: 15px;
      background: #fafafa;
    }

    input {
      padding: 16.5px 16px;
      box-sizing: border-box;
      border: none;
      border-radius: 15px;
      background: #fafafa;
    }

    button {
      background: transparent;
    }
  `,

  CommentButton: styled.button`
    display: flex;
    margin: -20px 0px 30px 0px;
    padding: 20px 0px;
    justify-content: center;
    width: 100%;
    font-size: 14px;
    font-weight: 700;
    color: var(--color-white);
    border-radius: 15px;
    background-color: ${(props) => props.color || '#FF7C38;'};

    &:disabled {
      border: 1px solid gray;
      color: gray;
      cursor: default;
      background-color: rgb(255, 250, 240, 0.8);
      border: none;
    }
  `,

  GridBox: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 10px;
    > div {
      > label:nth-child(2) {
        padding-left: 10px;
        font-size: 13px;
        color: lightgray;
      }
    }
  `,
};
