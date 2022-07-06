import { atom } from 'recoil';
import { initialState } from '../../constants/initialState';
import { ProjectType } from '../../types/ProjectType';

export const projectsAtom = atom<ProjectType[]>({
  key: 'projects',
  default: initialState['projects']
});
