import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CreateTrip from '../src/create-trip/index';

// --- HOISTED MOCKS ---
const { toastMock } = vi.hoisted(() => ({
  toastMock: vi.fn(),
}));

vi.mock('sonner', () => ({
  toast: toastMock,
}));

vi.mock('../src/service/AiModel', () => ({
  chatSession: {
    sendMessage: vi.fn(() =>
      Promise.resolve({
        response: {
          text: () => JSON.stringify({ itinerary: 'Sample Itinerary' }),
        },
      })
    ),
  },
}));

vi.mock('firebase/firestore', async () => {
  const actual = await vi.importActual('firebase/firestore');
  return {
    ...actual,
    setDoc: vi.fn(() => Promise.resolve()),
    doc: vi.fn(() => ({})),
  };
});

const { navigateMock } = vi.hoisted(() => ({
  navigateMock: vi.fn(),
}));
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    BrowserRouter: actual.BrowserRouter,
    Route: actual.Route,
    Routes: actual.Routes,
  };
});

vi.mock('react-google-places-autocomplete', () => ({
  __esModule: true,
  default: ({ selectProps }) => (
    <input
      data-testid="places-autocomplete"
      onChange={e => selectProps.onChange({ label: e.target.value })}
      value={selectProps.place ? selectProps.place.label : ''}
    />
  ),
}));

beforeAll(() => {
  global.localStorage.setItem('user', JSON.stringify({ email: 'test@example.com' }));
});

afterEach(() => {
  toastMock.mockClear();
  navigateMock.mockClear();
});

describe('CreateTrip Component', () => {
  it('should show warning toast if form is incomplete', async () => {
    render(
      <GoogleOAuthProvider clientId="test-client-id">
        <BrowserRouter>
          <CreateTrip />
        </BrowserRouter>
      </GoogleOAuthProvider>
    );

    fireEvent.click(screen.getByText('Generate Trip'));

    await waitFor(() => {
      expect(toastMock).toHaveBeenCalledWith("Please fill all details!");
    });
  });

  it('should generate trip with valid data', async () => {
    render(
      <GoogleOAuthProvider clientId="test-client-id">
        <BrowserRouter>
          <CreateTrip />
        </BrowserRouter>
      </GoogleOAuthProvider>
    );

    // Simulate location input
    fireEvent.change(screen.getByTestId('places-autocomplete'), { target: { value: 'Paris' } });

    // Fill days
    fireEvent.change(screen.getByPlaceholderText('Ex.3'), { target: { value: '3' } });

    // Click the "Moderate" budget option by finding the text and clicking its parent
    fireEvent.click(screen.getByText('Moderate').closest('div'));

    // Click the "Just Me" traveler option by finding the text and clicking its parent
    fireEvent.click(screen.getByText('Just Me').closest('div'));

    // Submit form
    fireEvent.click(screen.getByText('Generate Trip'));

    // Spinner should appear
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeDisabled();
    });

    // Navigation should be called with the correct path
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(expect.stringMatching(/^\/view-trip\/\d+$/));
    });
  });
});
