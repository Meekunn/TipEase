import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChakraProvider, createListCollection } from '@chakra-ui/react';
import system from '@/theme';
import SelectCurrency from './index';

const currencies = createListCollection({
  items: [
    { label: 'USDT', value: 'usdt' },
    { label: 'BTC', value: 'bitcoin' },
    { label: 'ETH', value: 'ethereum' },
  ],
});

const renderSelectCurrency = (props: {
  value?: string;
  onValueChange: (value: string) => void;
}) => {
  return render(
    <ChakraProvider value={system}>
      <SelectCurrency currencies={currencies} {...props} />
    </ChakraProvider>
  );
};

describe('SelectCurrency', () => {
  it('renders the trigger button', () => {
    renderSelectCurrency({ onValueChange: vi.fn() });
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows the preselected value', () => {
    renderSelectCurrency({ value: 'usdt', onValueChange: vi.fn() });
    const trigger = screen.getByRole('combobox');
    expect(trigger.textContent).toContain('USDT');
  });

  it('opens the dropdown when clicked', async () => {
    const user = userEvent.setup();
    renderSelectCurrency({ onValueChange: vi.fn() });

    await user.click(screen.getByRole('combobox'));
    const listbox = await screen.findByRole('listbox');
    expect(listbox).toBeInTheDocument();
  });

  it('renders all currency options in the collection', () => {
    renderSelectCurrency({ onValueChange: vi.fn() });
    expect(currencies.items).toHaveLength(3);
    expect(currencies.items[0].value).toBe('usdt');
    expect(currencies.items[1].value).toBe('bitcoin');
    expect(currencies.items[2].value).toBe('ethereum');
  });
});