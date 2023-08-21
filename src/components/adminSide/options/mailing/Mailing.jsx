import React, { useState } from 'react';
import { M } from './Mailing.styles';

const Mailing = () => {
  const [toggle, setToggle] = useState(true);

  const swtichToggle = () => {
    setToggle(!toggle);
  };

  return (
    <M.Container>
      <M.Title>
        <input placeholder="메일링 서비스" />
        <button onClick={swtichToggle}>{toggle === true ? '⌄' : '--'}</button>
      </M.Title>
      {toggle && (
        <M.Contents>
          <p>메일링 서비스에 대한 간략한 설명을 작성해 주세요.</p>
          <input placeholder="설명을 작성해 주세요" />
        </M.Contents>
      )}
    </M.Container>
  );
};

export default Mailing;
