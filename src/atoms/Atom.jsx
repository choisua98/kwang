import { atom } from 'jotai';

export const userAtom = atom(null); // 사용자 정보를 담을 Atom

// 테마, 모달, 배경 이미지 atoms 생성
export const themeAtom = atom('light');
export const modalVisibleAtom = atom(false);
export const backgroundImageAtom = atom(null);

// firebase blockId
export const blockId = atom(null);

// firebase blocks 정보
export const blocksAtom = atom([]);

// bannerImage
export const bannerImageAtom = atom(null);

// reservation Image
export const reservationImageAtom = atom(null);
