import { SVGProps } from 'react';

const PriorityIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} fill='#8A8F98' width='16' height='16' viewBox='0 0 14 14'>
    <g opacity='0.9'>
      <rect y='7' width='3' height='6' rx='1' fillOpacity='0.4'></rect>
      <rect x='5' y='4' width='3' height='9' rx='1' fillOpacity='0.4'></rect>
      <rect x='10' y='1' width='3' height='12' rx='1' fillOpacity='0.4'></rect>
    </g>
  </svg>
);

export { PriorityIcon };
