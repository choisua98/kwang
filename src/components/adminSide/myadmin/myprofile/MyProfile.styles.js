import { styled } from 'styled-components';

export const P = {
  ProfileContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
  `,

  ProfileInput: styled.input`
    width: 96%;
    height: 25px;
  `,

  ProfileImage: styled.img`
    width: 140px;
    height: 140px;
    object-fit: cover; // 이미지가 잘리지 않도록 설정
    background-color: #d6d6d6;
    border-radius: 100%;
  `,

  PreviewImage: styled.img`
    width: 140px;
    height: 140px;
    object-fit: cover;
    background-color: #d6d6d6;
    border-radius: 100%;
  `,
};
