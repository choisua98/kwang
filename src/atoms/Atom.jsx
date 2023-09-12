import { atom } from 'jotai';
import defaultProfileImage from '../assets/images/profile-default-image.png';

// export const userAtom = atom(null); // 로그인한 사용자 정보를 담을 Atom
export const userUidAtom = atom(null); // 크리에이터의 uid를 담는  Atom
// 모달, 테마, 배경 이미지 atoms 생성
export const modalVisibleAtom = atom(false);
export const themeAtom = atom('light');
export const backgroundImageAtom = atom(null);

// firebase blockId
export const blockId = atom(null);

// firebase blocks 정보
export const blocksAtom = atom([]);

// bannerImage
export const bannerImageAtom = atom(null);

// reservation Image
export const reservationImageAtom = atom(null);

// user nickname update
export const userNickname = atom(null);

// user profile image update
export const userProfileImage = atom(defaultProfileImage);

// 현재 모달에서 수행 중인 작업을 나타내는 상태 atom
export const currentActionAtom = atom(null);
