import { SVGProps } from 'react';

const InReviewIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} width='14' height='14' viewBox='0 0 14 14' fill='none'>
    <rect
      x='1'
      y='1'
      width='12'
      height='12'
      rx='6'
      stroke='#0f783c'
      strokeWidth='2'
      fill='none'></rect>
    <path
      fill='#0f783c'
      stroke='none'
      d='M 3.5,3.5 L3.5,0 A3.5,3.5 0 1,1 0, 3.5 z'
      transform='translate(3.5,3.5)'></path>
  </svg>
);

export { InReviewIcon };
