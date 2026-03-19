import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import SelectCurrency from './index';
import { cryptoCurrencyOptions } from '@/constants/currencies';

const meta: Meta<typeof SelectCurrency> = {
  title: 'Reusables/SelectCurrency',
  component: SelectCurrency,
};

export default meta;
type Story = StoryObj<typeof SelectCurrency>;

// Default — uncontrolled, just opens and selects
export const Default: Story = {
  args: {
    currencies: cryptoCurrencyOptions,
    onValueChange: (value) => console.log('Selected:', value),
  },
};

// With a preselected value
export const PreSelected: Story = {
  args: {
    currencies: cryptoCurrencyOptions,
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
          currencies={cryptoCurrencyOptions}
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