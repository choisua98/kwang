import React from 'react';
import NotFoundMessageImage from '../../assets/images/404- error-message.png';
import NotFoundImage from '../../assets/images/404-page-image.png';
import { N } from './NotFound.styles';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <N.Container>
        <N.LogoImage src={NotFoundImage} alt="404페이지" />
        <N.Text>페이지를 찾을 수 없습니다.</N.Text>
        <N.MessageImage src={NotFoundMessageImage} alt="404페이지" />
        <N.SmallText>
          페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다. 입력하신
          주소가 정확한지 가시 한 번 확인해주세요.
        </N.SmallText>
        {/* <button>이전으로</button> */}
        <N.MoveButton
          onClick={() => {
            navigate('/');
          }}
        >
          메인으로
        </N.MoveButton>
      </N.Container>
    </>
  );
};

export default NotFound;
