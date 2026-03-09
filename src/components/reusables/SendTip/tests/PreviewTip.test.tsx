import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import system from '@/theme';
import PreviewTip from '../PreviewTip';

const renderPreviewTip = (props: Partial<React.ComponentProps<typeof PreviewTip>> = {}) => {
  return render(
    <ChakraProvider value={system}>
      <PreviewTip
        setStep={vi.fn()}
        setIsSending={vi.fn()}
        {...props}
      />
    </ChakraProvider>
  );
};

describe('PreviewTip', () => {
  it('renders the preview details', () => {
    renderPreviewTip();
    expect(screen.getByText('Preview and transfer')).toBeInTheDocument();
    expect(screen.getByText('0.3231 ETH')).toBeInTheDocument();
    expect(screen.getByText('≈ $350.06')).toBeInTheDocument();
  });

  it('renders the Send tip button as disabled by default', () => {
    renderPreviewTip();
    expect(screen.getByRole('button', { name: 'Send tip' })).toBeDisabled();
  });

  it('enables Send tip button when T&C is agreed', async () => {
    const user = userEvent.setup();
    renderPreviewTip();

    await user.click(screen.getByRole('checkbox'));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Send tip' })).not.toBeDisabled();
    });
  });

  it('calls setStep(1) when Back is clicked', async () => {
    const user = userEvent.setup();
    const setStep = vi.fn();
    renderPreviewTip({ setStep });

    await user.click(screen.getByRole('button', { name: 'Back' }));
    expect(setStep).toHaveBeenCalledWith(1);
  });

  it('toggle the T&C switch', async () => {
    const user = userEvent.setup();
    renderPreviewTip();

    await user.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).toBeChecked();
  })

  it('calls setIsSending(true) when Send tip is clicked', async () => {
    const user = userEvent.setup();
    const setIsSending = vi.fn();
    renderPreviewTip({ setIsSending });

    await user.click(screen.getByRole('checkbox'));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Send tip' })).not.toBeDisabled();
    });

    await user.click(screen.getByRole('button', { name: 'Send tip' }));
    expect(setIsSending).toHaveBeenCalledWith(true);
  });

  it('calls setStep(3) after sending', async () => {
    const user = userEvent.setup();
    const setStep = vi.fn();
    renderPreviewTip({ setStep });

    await user.click(screen.getByRole('checkbox'));
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Send tip' })).not.toBeDisabled();
    });

    await user.click(screen.getByRole('button', { name: 'Send tip' }));

    await waitFor(() => {
      expect(setStep).toHaveBeenCalledWith(3);
    }, { timeout: 5000 });
  });
});