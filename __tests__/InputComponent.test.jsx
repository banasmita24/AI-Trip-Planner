import { render, screen } from '@testing-library/react';
import { Input } from '../src/components/ui/input';

describe('Input Component', () => {
  it('should render input with correct attributes', () => {
    render(<Input type="text" placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveAttribute('type', 'text');
  });
});