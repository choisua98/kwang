import { styled } from 'styled-components';

export const C = {
  Container: styled.form`
    padding: 20px;

    h3 {
      font-size: 20px;
      text-align: center;
      margin: 30px 10px 10px 10px;
    }
    h4 {
      text-align: center;
      margin-bottom: 30px;
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover; // 이미지가 잘리지 않도록 설정
      background-color: #d6d6d6;
      margin: 5px 0px;
    }

    p {
      margin: 5px;
    }

    button {
      width: 100%;
      padding: 15px 0px;
      margin-top: 30px;
      border-radius: 10px;
    }

    input {
      height: 30px;
      margin: 10px 0px;
    }
  `,

  CalendarContainer: styled.div`
    .react-calendar {
      max-width: 100%;
      background-color: #fff;
      color: #222;
      border-radius: 8px;
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.125em;
    }
    .react-calendar__navigation button {
      color: #ff7c38;
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
      color: #ff7c38;
      border-radius: 0;
    }

    .react-calendar__tile:disabled {
      background: none;
      color: #222;
      border-radius: 0;
    }

    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
      background: #ff7c38;
      color: white;
      border-radius: 6px;
    }
    .react-calendar__tile--now {
      background: none;
      border-radius: 6px;
      font-weight: none;
      color: none;
    }

    .react-calendar__tile--hasActive:enabled:hover,
    .react-calendar__tile--hasActive:enabled:focus {
      background: #f8f8fa;
    }
    .react-calendar__tile--active {
      background: #6f48eb;
      border-radius: 6px;
      font-weight: bold;
      color: white;
    }
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
      background: #6f48eb;
      color: white;
    }
    .react-calendar--selectRange .react-calendar__tile--hover {
      background-color: #f8f8fa;
    }
    .react-calendar__tile--range {
      background: #f8f8fa;
      color: #6f48eb;
      border-radius: 0;
    }
    .react-calendar__tile--rangeStart {
      border-radius: 6px;
      background: #6f48eb;
      color: white;
    }
    .react-calendar__tile--rangeEnd {
      border-radius: 6px;
      background: #6f48eb;
      color: white;
    }
  `,
};
