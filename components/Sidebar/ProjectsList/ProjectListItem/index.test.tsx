import { fireEvent, render, waitFor } from '@testing-library/react';
import { ProjectType } from '../../../../types/ProjectType';
import { LowIcon, TodoIcon } from '../../../shared/Icon';
import ProjectListItem from './ProjectListItem';

const project: ProjectType = {
  id: '1',
  title: 'Project 1',
  tasks: [
    {
      id: '1',
      title: 'Task 1',
      status: {
        title: 'Todo',
        icon: <TodoIcon />
      },
      priority: {
        title: 'Low',
        icon: <LowIcon />
      }
    }
  ]
};

describe('ProjectListItem', () => {
  it('should render correctly', () => {
    render(<ProjectListItem {...project} />);
  });

  it('should rotate icon after being clicked (opened)', () => {
    const { container } = render(<ProjectListItem {...project} />);
    fireEvent.click(container.querySelector('.Title')!);

    const arrowIcon = container.querySelector('.arrow-icon');

    expect(arrowIcon).toHaveClass('RotateArrow');
  });
});
