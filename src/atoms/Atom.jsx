import { atom } from 'jotai';

export const userAtom = atom(null); // 사용자 정보를 담을 Atom

// mailingStateAtom 정의
export const mailingStateAtom = atom({
  title: '',
  content: '',
});
