import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog, DialogTrigger, DialogClose, DialogContent } from '../src/components/ui/dialog';

describe('Dialog Component', () => {
  it('should open and close dialog', async () => {
    render(
      <>
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <div>
              Dialog Content
              <DialogClose data-testid="dialog-close-button">Close</DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );

    // Click the button to open the dialog
    userEvent.click(screen.getByText('Open Dialog'));

    // Wait for the dialog content to appear
    const dialogContent = await screen.findByText('Dialog Content');
    expect(dialogContent).toBeInTheDocument();

    // Click the specific "Close" button using its test ID
    userEvent.click(screen.getByTestId('dialog-close-button'));

    // Ensure the dialog content is no longer visible
    await waitFor(() => {
      expect(screen.queryByText('Dialog Content')).not.toBeInTheDocument();
    });
  });

  it('should not render dialog content by default', () => {
    render(
      <>
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>Dialog Content</DialogContent>
        </Dialog>
      </>
    );

    // Assert that the dialog content is not visible initially
    expect(screen.queryByText('Dialog Content')).not.toBeInTheDocument();
  });
});