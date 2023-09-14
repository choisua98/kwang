import { styled } from 'styled-components';

export const H = {
  HeaderWrapper: styled.header`
    position: relative;
    padding: 30px 20px 11px;
    height: initial;
    line-height: initial;
  `,
  Logo: styled.img`
    // padding-top: ${(props) => props.topPadding || '0'}px;
    height: 17px;
  `,
  Container: styled.div`
    display: flex;
    height: 80px;
    padding: 20px;
    justify-content: space-between;
  `,

  MenuButton: styled.button`
    display: grid;
    align-items: center;
    width: 100px;
    padding: 10px;
    background-color: #fffaf0;

    p {
      padding-top: 10px;
    }
  `,

  MenuContainer: styled.div`
    display: grid;
    justify-content: left;
    /* background-color: orange; */
    margin: 20px;
  `,

  MenuStyle: styled.p`
    margin: 15px 0px;
    color: black;
    padding-left: 20px;
    cursor: pointer;

    &:hover {
      color: white;
      text-decoration: none;
      color: inherit;
    }
  `,

  ProfileContainer: styled.div`
    display: flex;
    padding: 30px 20px 20px;
    align-items: center;
    margin-left: 15px;
  `,

  ProfileImage: styled.img`
    width: 70px;
    height: 70px;
    object-fit: cover; // 이미지가 잘리지 않도록 설정
    background-color: #d6d6d6;
    border-radius: 100%;
  `,

  NickName: styled.p`
    color: black;
    padding-left: 20px;
    font-size: 18px;
  `,

  IconImage: styled.img`
    width: 20px;
    margin: 0 auto;
  `,
};
