import React, { useState } from 'react';
import { R } from './Reservation.styles';

const Reservation = () => {
  const [toggle, setToggle] = useState(true);
  const [title, setTitle] = useState('');

  const swtichToggle = () => {
    setToggle(!toggle);
  };

  return (
    <R.Container>
      <R.Title>
        <input
          placeholder="예약 서비스"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <button onClick={swtichToggle}>{toggle === true ? '⌄' : '--'}</button>
      </R.Title>
      {toggle && (
        <R.Contents>
          <p>예약 서비스 설명</p>
          <input placeholder="예약 서비스에 대한 간략한 설명을 작성해 주세요" />
        </R.Contents>
      )}
    </R.Container>
  );
};

export default Reservation;
