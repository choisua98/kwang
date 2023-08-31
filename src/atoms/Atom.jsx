import { atom } from 'jotai';

export const userAtom = atom(null); // 로그인한 사용자 정보를 담을 Atom
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
