import { render, screen } from '@testing-library/react';
import { Button } from '../src/components/ui/button';

describe('Button Component', () => {
  it('should render button with correct label', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });
});