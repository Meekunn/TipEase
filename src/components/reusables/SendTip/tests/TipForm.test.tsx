import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import system from '@/theme';
import { WalletProvider } from '@/context/WalletContext';
import { TipProvider } from '@/context/TipContext';
import TipForm from '../TipForm';

const renderTipForm = (props: Partial<React.ComponentProps<typeof TipForm>> = {}) => {
  return render(
    <ChakraProvider value={system}>
      <WalletProvider>
        <TipProvider>
          <TipForm btnText="Preview tip" {...props} onBtnClick={() => {}} />
        </TipProvider>
      </WalletProvider>
    </ChakraProvider>
  );
};

describe('TipForm', () => {
  it('renders all form fields', () => {
    renderTipForm();
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add recipient address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add a note')).toBeInTheDocument();
    expect(screen.getByText('Remain anonymous')).toBeInTheDocument();
  });

  it('renders the submit button with correct text', () => {
    renderTipForm({ btnText: 'Send tip' });
    expect(screen.getByRole('button', { name: 'Send tip' })).toBeInTheDocument();
  });

  it('shows error when amount is empty on submit', async () => {
    const user = userEvent.setup();
    renderTipForm();

    await user.click(screen.getByRole('button', { name: 'Preview tip' }));

    await waitFor(() => {
      expect(screen.getByText('Amount is required')).toBeInTheDocument();
    });
  });

  it('shows error when recipient address is empty on submit', async () => {
    const user = userEvent.setup();
    renderTipForm();

    await user.click(screen.getByRole('button', { name: 'Preview tip' }));

    await waitFor(() => {
      expect(screen.getByText('Recipient address is required')).toBeInTheDocument();
    });
  });

  it('accepts input in the recipient address field', async () => {
    const user = userEvent.setup();
    renderTipForm();

    const addressInput = screen.getByPlaceholderText('Add recipient address');
    await user.type(addressInput, '0x4aF934569203874072030Ed9e');

    expect(addressInput).toHaveValue('0x4aF934569203874072030Ed9e');
  });

  it('accepts input in the note field', async () => {
    const user = userEvent.setup();
    renderTipForm();

    const noteInput = screen.getByPlaceholderText('Add a note');
    await user.type(noteInput, 'Birthday gift');

    expect(noteInput).toHaveValue('Birthday gift');
  });

  it('toggles anonymous switch', async () => {
    const user = userEvent.setup();
    renderTipForm();

    const anonymousSwitch = screen.getByLabelText('Remain anonymous');
    await user.click(anonymousSwitch);

    expect(anonymousSwitch).toBeChecked();
  });

  it('calls setStep when form is submitted successfully', async () => {
    const user = userEvent.setup();
    const setStep = vi.fn();
    renderTipForm({ onBtnClick: setStep });

    await user.type(screen.getByPlaceholderText('Add recipient address'), '0x4aF934569203874072030Ed9e');

    const amountInput = screen.getByPlaceholderText('0.00');
    await user.type(amountInput, '100');

    await user.click(screen.getByRole('button', { name: 'Preview tip' }));

    await waitFor(() => {
      expect(setStep).toHaveBeenCalledWith(2);
    });
  });
});