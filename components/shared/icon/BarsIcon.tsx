import { SVGProps } from 'react';

const BarsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} width='14' height='10' viewBox='0 0 14 10' fill='#8A8F98'>
    <rect width='14' height='2'></rect>
    <rect y='4' width='14' height='2'></rect>
    <rect y='8' width='14' height='2'></rect>
  </svg>
);

export { BarsIcon };
