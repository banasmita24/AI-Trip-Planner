//Ensure user trips are fetched correctly
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import UserTripCard from '../src/my-trip/components/UserTripCard';

describe('UserTripCard Component', () => {
  it('should render trip details', () => {
    const trip = {
      id: '1',
      userSelection: {
        location: 'Tokyo',
        totalDays: 7,
        budget: '$2000',
      },
    };

    render(
      <MemoryRouter> {/* Wrap the component with MemoryRouter */}
        <UserTripCard trip={trip} />
      </MemoryRouter>
    );

    // Assertions
    expect(screen.getByText('Tokyo')).toBeInTheDocument();
    expect(screen.getByText('7 Days trip with $2000')).toBeInTheDocument();
  });
});