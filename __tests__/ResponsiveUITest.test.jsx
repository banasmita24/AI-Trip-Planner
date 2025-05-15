import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import MyTrips from '../src/my-trip/index';

describe('Responsive UI', () => {
  it('should render correctly on mobile devices', () => {
    // Simulate a mobile device screen width
    global.innerWidth = 375; // Example: iPhone screen width
    global.dispatchEvent(new Event('resize')); // Trigger resize event

    // Wrap the component with MemoryRouter to provide Router context
    const { container } = render(
      <MemoryRouter>
        <MyTrips />
      </MemoryRouter>
    );
  });
});