import type { Meta, StoryObj } from '@storybook/react-vite';
import { createListCollection } from '@chakra-ui/react';
import { useState } from 'react';
import { BitcoinIcon, EthereumIcon, TronIcon, UsdtIcon } from '@/components/reusables/icon';
import SelectCurrency from './index';

const currencies = createListCollection({
  items: [
    { label: 'USDT', value: 'usdt', icon: <UsdtIcon /> },
    { label: 'BTC', value: 'bitcoin', icon: <BitcoinIcon /> },
    { label: 'TRX', value: 'tron', icon: <TronIcon /> },
    { label: 'ETH', value: 'ethereum', icon: <EthereumIcon /> },
  ],
});

const meta: Meta<typeof SelectCurrency> = {
  title: 'Reusables/SelectCurrency',
  component: SelectCurrency,
};

export default meta;
type Story = StoryObj<typeof SelectCurrency>;

// Default — uncontrolled, just opens and selects
export const Default: Story = {
  args: {
    currencies,
    onValueChange: (value) => console.log('Selected:', value),
  },
};

// With a preselected value
export const PreSelected: Story = {
  args: {
    currencies,
    value: 'ethereum',
    onValueChange: (value) => console.log('Selected:', value),
  },
};

// Controlled — reflects selection in real time
export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState('usdt');
    return (
      <div>
        <SelectCurrency
          currencies={currencies}
          value={selected}
          onValueChange={setSelected}
        />
        <p style={{ marginTop: 12, fontSize: 13, color: '#555' }}>
          Selected: <strong>{selected}</strong>
        </p>
      </div>
    );
  },
};