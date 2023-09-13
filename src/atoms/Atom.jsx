import { atom } from 'jotai';
import defaultProfileImage from '../assets/images/profile-default-image.png';

// user 데이터를 담는 atom
export const userAtom = atom(null);

// 모달 atoms
export const modalVisibleAtom = atom(false);
export const deleteModalVisibleAtom = atom(false);

// 테마, 배경 이미지 atoms
export const themeAtom = atom('light');
export const backgroundImageAtom = atom(null);

// firebase blockId
export const blockId = atom(null);

// firebase blocks 정보
export const blocksAtom = atom([]);

// user nickname update
export const userNickname = atom(null);

// user profile image update
export const userProfileImage = atom(defaultProfileImage);
