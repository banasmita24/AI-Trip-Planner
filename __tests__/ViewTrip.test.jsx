import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ViewTrip from '../src/view-trip/[tripId]/index';
import { vi } from 'vitest';
import { getDoc } from 'firebase/firestore';

// Mock Firestore
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(),
  getDoc: vi.fn(),
  doc: vi.fn(),
}));

// Mock useParams to return a fake tripId
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ tripId: 'test-trip-id' }),
  };
});

// Mock child components
vi.mock('../src/view-trip/components/InfoSection', () => ({
  default: ({ trip }) => <div>{trip?.userSelection?.location}</div>
}));

vi.mock('../src/view-trip/components/Hotels', () => ({
  default: () => <div>Hotels Component</div>
}));

vi.mock('../src/view-trip/components/TripPlace', () => ({
  default: () => <div>TripPlace Component</div>
}));

vi.mock('../src/view-trip/components/Footer', () => ({
  default: () => <div>Footer Component</div>
}));

describe('ViewTrip Component', () => {
  it('should fetch and display trip details', async () => {
    const mockTrip = {
      userSelection: { location: 'London', totalDays: 3 }
    };

    getDoc.mockResolvedValueOnce({
      exists: () => true,
      data: () => mockTrip,
    });

    render(
      <MemoryRouter>
        <ViewTrip />
      </MemoryRouter>
    );

    // Check if 'London' appears from InfoSection mock
    expect(await screen.findByText('London')).toBeInTheDocument();
    expect(screen.getByText('Hotels Component')).toBeInTheDocument();
    expect(screen.getByText('TripPlace Component')).toBeInTheDocument();
    expect(screen.getByText('Footer Component')).toBeInTheDocument();
  });
});
