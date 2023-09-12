import { styled } from 'styled-components';
import defaultProfileImage from '../../../../assets/images/profile-default-image.png';
import { Button, Col } from 'antd';
import btnEditImage from '../../../../assets/images/common/btn/btn-edit.png';
import btnEditImageDark from '../../../../assets/images/common/btn/btn-edit-dark.png';
import btnEditImageLight from '../../../../assets/images/common/btn/btn-edit-light.png';

export const P = {
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
    /*
    background-image: url(${({ theme }) =>
      theme === 'dark' ? btnEditImageDark : btnEditImageLight});
      */
    background-size: cover;
    border-radius: 50%;
    width: 35px;
    height: 35px;
  `,

  ProfileContainer: styled.div`
    display: flex;
    flex-direction: column;
  `,

  ProfileImage: styled.img`
    width: 150px;
    height: 150px;
    object-fit: cover;
    background-image: url(${defaultProfileImage});
    border-radius: 100%;
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
    border: 1px solid #ff7c38;
    color: #ff7c38;
    background-color: white;
  `,

  ActivButton: styled.button`
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
    font-size: 15px;
    font-weight: 500;
    color: #312f2e;
    margin-bottom: 20px;
  `,

  ModalInput: styled.input`
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
