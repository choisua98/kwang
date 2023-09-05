import { styled } from 'styled-components';
import defaultProfileImage from '../../../../assets/images/profile-default-image.png';

export const P = {
  ProfileContainer: styled.div`
    display: flex;
    flex-direction: column;
    gap: 13px;
  `,

  // ProfileInput: styled.input`
  //   width: 96%;
  //   height: 25px;
  // `,

  ProfileImage: styled.img`
    width: 140px;
    height: 140px;
    object-fit: cover;
    background-image: url(${defaultProfileImage});
    border-radius: 100%;
  `,

  PreviewImage: styled.img`
    width: 140px;
    height: 140px;
    object-fit: cover;
    background-image: url(${defaultProfileImage});
    border-radius: 100%;
  `,

  ActivButton: styled.button`
    margin: 20px auto 0;
    padding: 21.5px 0;
    width: 100%;
    border-radius: 15px;
    color: white;
    background: #ff7c38;
  `,

  ProfileImageBox: styled.div`
    display: flex;
    justify-content: center;
    /* align-content: center; */
  `,

  ModalTitle: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 500;
    color: #312f2e;
  `,

  ModalInput: styled.input`
    padding: 16.5px 16px;
    box-sizing: border-box;
    border: none;
    border-radius: 15px;
    background: #fafafa;
  `,

  label: styled.div`
    font-size: 14px;
    margin-bottom: -8px;
  `,

  FileUploadButton: styled.input`
    margin-top: 12px;
    color: #312f2e;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;

    &:focus {
      outline: none;
    }
  `,
};
