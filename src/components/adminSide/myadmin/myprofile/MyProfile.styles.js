import { styled } from 'styled-components';
import defaultProfileImage from '../../../../assets/images/profile-default-image.webp';
import { Button, Col } from 'antd';
import btnEditImage from '../../../../assets/images/common/btn/btn-edit.webp';
import btnEditImageLight from '../../../../assets/images/common/btn/btn-edit-light.webp';
import btnEditImageDark from '../../../../assets/images/common/btn/btn-edit-dark.webp';
import btnEditImageDefault from '../../../../assets/images/common/btn/btn-edit.webp';

export const P = {
  Container: styled.div`
    > div {
      padding: 20px 0;
    }
    > div:nth-child(2) {
      padding: 0;
    }
  `,
  InfoBox: styled.div`
    margin-bottom: 10px;
    font-size: 16px;
    text-align: center;
  `,

  ProfilBox: styled(Col)`
    position: relative;
    max-width: 150px;
    max-height: 150px;
    text-align: center;
  `,

  ModalOpenButton: styled(Button)`
    position: absolute;
    bottom: 4px;
    right: -5px;
    background-image: url(${btnEditImage});
    background-size: cover;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    ${({ theme }) =>
      theme === 'dark'
        ? `
        background-image: url(${btnEditImageDark}) !important;
        background-size: cover;`
        : theme === 'light'
        ? `
        background-image: url(${btnEditImageLight}) !important;
        background-size: cover;`
        : `
        background-image: url(${btnEditImageDefault}) !important;
        background-size: cover;`}
  `,

  ProfileContainer: styled.div`
    display: flex;
    flex-direction: column;
    input[type='file'] {
      display: none;
    }
  `,

  ProfileImage: styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    background-image: url(${defaultProfileImage});
    border-radius: 100%;
    ${({ theme }) =>
      theme === 'dark'
        ? `
      border:none;`
        : theme === 'light'
        ? `
      border:1px solid #ddd; 
      border-radius:50%;`
        : `
      border:none;`}
  `,

  PreviewImage: styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    background-image: url(${defaultProfileImage});
    border-radius: 100%;
  `,

  UploadButton: styled.button`
    padding: 21.5px 0;
    margin: 15px 0px 20px 0px;
    width: 100%;
    border-radius: 15px;
    border: 1px solid var(--color-accent);
    color: var(--color-accent);
    background-color: white;
  `,

  ActivButton: styled.button`
    padding: 21.5px 0;
    width: 100%;
    border-radius: 15px;
    color: white;
    background: var(--color-accent);
  `,

  ProfileImageBox: styled.div`
    display: flex;
    justify-content: center;
    /* align-content: center; */
  `,

  ModalTitle: styled.div`
    font-size: 15px;
    font-weight: 500;
    color: #312f2e;
    margin-bottom: 20px;
  `,

  ModalInput: styled.input`
    margin-bottom: 20px;
    padding: 16.5px 16px;
    box-sizing: border-box;
    border: none;
    border-radius: 15px;
    background: #fafafa;
  `,

  InfoContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin: 15px 0px 5px 0px;
  `,

  GuidText: styled.p`
    color: lightgray;
  `,

  FileUploadButton: styled.input`
    margin-top: 12px;
    color: #312f2e;
    border: none;
    cursor: pointer;
    transition:
      background-color 0.3s,
      color 0.3s;

    &:focus {
      outline: none;
    }
  `,
};
