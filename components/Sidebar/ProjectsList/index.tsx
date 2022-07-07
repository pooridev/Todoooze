import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import styles from './ProjectsList.module.css';
import { openList } from '../../../redux/actions/project';
import { ArrowRight, ThreeDotsIcon } from '../../shared/Icon';
import { IProjectState } from '../../../types/RootState';
import { ProjectType } from '../../../types/ProjectType';
import { TaskType } from '../../../types/TaskType';
import { removeFalseys } from '../../../helpers/string-utils';
import { useRecoilState, useRecoilValue } from 'recoil';
import { projectsAtom } from '../../../recoil/projects';
import { ProjectListItem } from './ProjectListItem';

/**
 * @description a component that renders a list of projects on the main sidebar.
 */
const ProjectsList: FC = () => {
  const [isListOpen, setIsListOpen] = useState(false);
  const projects = useRecoilValue(projectsAtom);

  const toggleListsDropdown = () => setIsListOpen(prev => !prev);

  return (
    <div className={styles.Lists}>
      <header className={styles.Header} onClick={toggleListsDropdown}>
        <h3>
          Your projects
          <ArrowRight
            className={removeFalseys(isListOpen && styles.RotateArrow)}
          />
        </h3>
      </header>
      <ul className={removeFalseys(styles.Projects, isListOpen && styles.Open)}>
        {projects.map(project => (
          <ProjectListItem key={project.id} {...project} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;
