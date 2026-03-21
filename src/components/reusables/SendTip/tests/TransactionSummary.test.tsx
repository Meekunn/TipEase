import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider } from '@chakra-ui/react';
import system from '@/theme';
import { TipProvider } from '@/context/TipContext';
import TransactionSummary from '../TransactionSummary';

const renderTransactionSummary = (props: { setStep: React.Dispatch<React.SetStateAction<number>> }) => {
  return render(
    <ChakraProvider value={system}>
      <TipProvider>
        <TransactionSummary isSuccess {...props} />
      </TipProvider>
    </ChakraProvider>
  );
};

describe('TransactionSummary', () => {
  it('renders success state by default', () => {
    renderTransactionSummary({ setStep: vi.fn() });
    expect(screen.getByText('Tip Successful!')).toBeInTheDocument();
  });

  it('renders the transaction ID', () => {
    renderTransactionSummary({ setStep: vi.fn() });
    expect(screen.getByText('TXN-23141312')).toBeInTheDocument();
  });

  it('renders the tip amount', () => {
    renderTransactionSummary({ setStep: vi.fn() });
    expect(screen.getByText('0.3231 ETH')).toBeInTheDocument();
    expect(screen.getByText('≈ $350.06')).toBeInTheDocument();
  });

  it('renders View receipt button on success', () => {
    renderTransactionSummary({ setStep: vi.fn() });
    expect(screen.getByRole('button', { name: 'View receipt' })).toBeInTheDocument();
  });

  it('calls setStep(1) and clears form when Back to home is clicked', async () => {
    const user = userEvent.setup();
    const setStep = vi.fn();
    renderTransactionSummary({ setStep });

    await user.click(screen.getByRole('button', { name: 'Back to home' }));
    expect(setStep).toHaveBeenCalledWith(1);
  });
});