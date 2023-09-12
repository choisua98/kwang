import { atom } from 'jotai';
import defaultProfileImage from '../assets/images/profile-default-image.png';

// 모달, 테마, 배경 이미지 atoms 생성
export const modalVisibleAtom = atom(false);
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

// 현재 모달에서 수행 중인 작업을 나타내는 상태 atom
export const currentActionAtom = atom(null);
