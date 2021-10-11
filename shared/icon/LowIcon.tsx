import { SVGProps } from 'react';

const LowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} fill='#8A8F98' width='16' height='16' viewBox='0 0 16 16'>
    <rect x='1' y='8' width='3' height='6' rx='1'></rect>
    <rect x='6' y='5' width='3' height='9' rx='1' fillOpacity='0.4'></rect>
    <rect x='11' y='2' width='3' height='12' rx='1' fillOpacity='0.4'></rect>
  </svg>
);

export { LowIcon };
