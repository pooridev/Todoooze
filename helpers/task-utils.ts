/**
 * @description get the exptected status title.
 *
 * @param status Todo | In Progress | In Review | Done
 * @returns {string}
 */
export const getStatus = status => {
  switch (status) {
    case 'Todo':
      return 'todo';
    case 'In Progress':
      return 'in_progress';
    case 'In Review':
      return 'in_review';
    case 'Done':
      return 'done';
    default:
      throw Error('Invalid status');
  }
};
