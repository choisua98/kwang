import { styled } from 'styled-components';
import { SwiperSlide } from 'swiper/react';

export const CS = {
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

  SwiperSlide: styled(SwiperSlide)`
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
      max-width: 100%;
      width: 100%;
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
      background: #f8f8fa;
      color: #ff7c38;
      border-radius: none;
      font-weight: none;
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

export const CC = {
  CountStyle: styled.div`
    width: 100%;
    height: 105px;
    background: var(--color-secondary);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 500;
    margin: 40px 0px;

    img {
      position: absolute;
      left: 70px;
    }

    p {
      position: absolute;
      top: 195px;
      left: 150px;
      font-size: 14px;
    }

    span {
      position: absolute;
      top: 215px;
      left: 150px;
      font-size: 17px;
    }
  `,
  Input: styled.input`
    width: 100px;
  `,

  CommentInput: styled.input`
    width: 300px;
    margin-bottom: 10px;
  `,

  CommentBox: styled.div`
    /* margin-bottom: 30px; */
  `,

  AddButton: styled.button`
    margin-bottom: 80px;
  `,
};
