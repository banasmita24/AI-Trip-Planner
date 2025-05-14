//Ensure user trips are fetched correctly.
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import MyTrips from '../src/my-trip/index';

// Mock UserTripCard
vi.mock('../src/my-trip/components/UserTripCard', () => ({
  default: ({ trip }) => (
    <div>
      <div>{trip.userSelection.location}</div>
      <div>{trip.userSelection.totalDays} Days trip with {trip.userSelection.budget}</div>
    </div>
  )
}));

// Mock Firestore
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  getDocs: vi.fn(() => ({
    forEach: (callback) => {
      callback({
        id: '1',
        data: () => ({
          userSelection: {
            location: 'Paris',
            totalDays: 5,
            budget: '$1000',
          },
        }),
      });
    },
  })),
}));

describe('MyTrips Component', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => JSON.stringify({ email: 'test@example.com' })),
    });
  });

  test('should fetch and display user trips', async () => {
    render(
      <MemoryRouter>
        <MyTrips />
      </MemoryRouter>
    );

    expect(await screen.findByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('5 Days trip with $1000')).toBeInTheDocument();
  });
});
