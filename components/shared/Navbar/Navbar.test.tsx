import { render } from '@testing-library/react';

import { Navbar } from '.';

describe('Navbar.tsx', () => {
  test('should render without any errors', () => {
    render(
      <Navbar>
        <>test item</>
      </Navbar>
    );
  });

  test('should render the children', () => {
    const { getByText } = render(
      <Navbar>
        <p>test item</p>
      </Navbar>
    );

    expect(getByText('test item')).toBeInTheDocument();
  });
});
