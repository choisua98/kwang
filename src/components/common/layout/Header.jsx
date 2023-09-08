import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Drawer, Space } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Logo from '../../../assets/images/logo.png';
import WhiteLogo from '../../../assets/images/logo-white.png';
import { H } from './Header.styles';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import defaultProfileImage from '../../../assets/images/profile-default-image.png';
import HomeIcon from '../../../assets/images/common/icon/Icon-home.png';
import LinkIcon from '../../../assets/images/common/icon/icon-link.png';
import EditIcon from '../../../assets/images/common/icon/icon-edit.png';
import { useAtom } from 'jotai';
import { themeAtom, userNickname, userProfileImage } from '../../../atoms/Atom';

const Header = () => {
  const [user, setUser] = useState(null); // 로그인 상태를 저장할 상태 추가

  useEffect(() => {
    // onAuthStateChanged 이용해서 로그인 상태 감시
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const userUid = auth.currentUser?.uid;
  const [theme] = useAtom(themeAtom);

  // userUid로 저장된 문서가 있을 경우 프로필 정보 가져오기
  useEffect(() => {
    if (userUid) {
      const userDocRef = doc(db, 'users', userUid);
      const fetchProfileInfo = async () => {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setViewNickname(userData.nickname || '');
          setViewProfileImage(userData.profileImageURL || defaultProfileImage);
        }
      };
      fetchProfileInfo();
    }
  }, [userUid]);

  const navigate = useNavigate();
  const location = useLocation(); // 현재 페이지의 URL 추출
  const isMyPage = location.pathname === `/${userUid}`; // 현재 페이지가 마이페이지인지 여부 확인
  const isLoginPage = location.pathname === '/login';
  const isHomePage = location.pathname === '/';
  const [viewNickname, setViewNickname] = useAtom(userNickname);
  const [viewProfileImage, setViewProfileImage] = useAtom(userProfileImage);
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
  };
  const closeMenu = () => {
    setMenuOpen(false);
  };

  // 로그아웃 버튼클릭 핸들러 -> 로그아웃 시 홈페이지로 이동시켜 놓음
  const onLogoutButtonClickHandler = async () => {
    await signOut(auth); //파이어베이스 로그아웃
    // setUser('');
    alert('로그아웃 되었습니다.'); //로그아웃누르면 signOut이 다 되지 않았는데 navigate 됨.
    navigate('/');
    window.location.reload();
  };

  const handleCopyClipBoard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert('링크가 복사 되었습니다.');
    } catch (err) {
      alert('링크 복사가 실패하였습니다.');
    }
  };

  return (
    <H.HeaderWrapper>
      <Row align="middle">
        {/* 로그아웃 상태 */}
        {!userUid && (
          <>
            <Col span={21}>
              {/* 로고 영역 */}
              <Link to="/">
                <H.Logo src={theme === 'dark' ? WhiteLogo : Logo} alt="크왕" />
              </Link>
            </Col>
            {!isLoginPage && isHomePage && (
              <Col span={3}>
                <Link to="/login">로그인</Link>
              </Col>
            )}
          </>
        )}

        {/* 로그인된 상태 */}
        {userUid && (
          <>
            <Col span={22}>
              {/* 로고 영역 */}
              <Link to="/">
                <H.Logo src={theme === 'dark' ? WhiteLogo : Logo} alt="크왕" />
              </Link>
            </Col>
            <Col span={1}>
              {/* 우측 영역 */}
              <div className="right-area">
                <Space>
                  <Button icon={<MenuOutlined />} onClick={openMenu} />
                </Space>
                <Drawer
                  placement="right"
                  width={320}
                  onClose={closeMenu}
                  open={menuOpen}
                >
                  <H.ProfileContainer>
                    <H.ProfileImage src={viewProfileImage} />
                    <H.NickName>{viewNickname}</H.NickName>
                  </H.ProfileContainer>
                  <H.Container>
                    {!isMyPage ? (
                      <H.MenuButton onClick={closeMenu}>
                        <Link to={`/${userUid}`}>
                          <H.IconImage src={HomeIcon} alt="homeIcon" />
                          <p>마이홈</p>
                        </Link>
                      </H.MenuButton>
                    ) : (
                      <H.MenuButton onClick={closeMenu}>
                        <Link to={`https://kwang-nine.vercel.app/${userUid}`}>
                          <H.IconImage src={EditIcon} alt="editIcon" />
                          <p>편집하기</p>
                        </Link>
                      </H.MenuButton>
                    )}
                    <H.MenuButton
                      onClick={() =>
                        handleCopyClipBoard(
                          `${process.env.REACT_APP_KWANG_URL}/${userUid}`,
                        )
                      }
                    >
                      <H.IconImage src={LinkIcon} alt="linkIcon" />
                      링크 공유
                    </H.MenuButton>
                  </H.Container>
                  <H.MenuContainer>
                    <H.MenuStyle onClick={closeMenu}>
                      <Link to={`/admindata`}>고객관리</Link>
                    </H.MenuStyle>
                    <H.MenuStyle onClick={onLogoutButtonClickHandler}>
                      로그아웃
                    </H.MenuStyle>
                  </H.MenuContainer>
                </Drawer>
              </div>
            </Col>
          </>
        )}
      </Row>
    </H.HeaderWrapper>
  );
};

export default Header;
