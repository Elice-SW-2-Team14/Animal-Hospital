import { atom } from 'recoil';

export type THospital = {
  hospitalName: string;
  hospitalState: string;
};

export const hospitalLoginState = atom<THospital>({
  key: 'hospitalLoginState',
  default: {
    hospitalName: '',
    hospitalState: '',
  },
});
