import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import { H } from './Header.styles';
import { useAtom } from 'jotai';
import { userAtom } from '../../../atoms/Atom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/firebaseConfig';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(userAtom);
  console.log(user?.uid);
  const userUid = user?.uid;

  // 메뉴 열림
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 메뉴 열렸을 때 바깥 영역 클릭시 닫힘
  const menuRef = useRef();

  // 상단 메뉴 클릭시 메뉴 열기/닫기 토글
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // 로그아웃 버튼클릭 핸들러 -> 로그아웃 시 로그인 페이지로 이동시켜 놓음
  const onLogoutButtonClickHandler = async () => {
    if (user) {
      console.log('유저가있습니다. 로그아웃하겠습니다.');
    }
    await signOut(auth); //파이어베이스 로그아웃
    setUser('');
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  // 마운트 시 외부 영역 클릭시 이벤트 추가, 언마운트 시 제거
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isMenuOpen && // 메뉴가 열려 있을때
        menuRef.current && // menuRef가 존재
        !menuRef.current.contains(e.target) // 클릭된 요소가 메뉴 내부에 없는 경우에만
      ) {
        setIsMenuOpen(false); // isMenuOpen 메뉴 닫음
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [isMenuOpen]);

  return (
    <H.HeaderWrapper>
      <Row align="middle">
        <Col span={22}>
          {/* 로고 영역 */}
          <Link to="/">
            <Logo />
          </Link>
        </Col>
        <Col span={1}>
          {/* 우측 영역 */}
          <div className="right-area">
            <Button icon={<MenuOutlined />} onClick={handleMenuClick} />
          </div>
        </Col>
      </Row>

      {/* 메뉴 */}
      {isMenuOpen && (
        <H.MenuContentWrapper ref={menuRef}>
          <ul>
            <li>
              <Link to="/login">로그인</Link>
            </li>
            <li>
              <button onClick={onLogoutButtonClickHandler}>로그아웃</button>
            </li>
            <li>
              <Link to={`/${userUid}`}>마이페이지</Link>
            </li>
          </ul>
        </H.MenuContentWrapper>
      )}
    </H.HeaderWrapper>
  );
};

export default Header;
