import type { Meta, StoryObj } from '@storybook/react-vite';
import TipForm from './TipForm';
import { WalletProvider } from '@/context/WalletContext';
import { TipProvider } from '@/context/TipContext';

const withProviders = (Story: React.ComponentType) => (
  <WalletProvider>
    <TipProvider>
      <div style={{ maxWidth: '480px', padding: '24px' }}>
        <Story />
      </div>
    </TipProvider>
  </WalletProvider>
);

const meta: Meta<typeof TipForm> = {
  title: 'Reusables/TipForm',
  component: TipForm,
  decorators: [withProviders],
  argTypes: {
    border: { control: 'boolean' },
    btnText: { control: 'text' },
    btnFontSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    margintop: { control: 'number' },
    btnPaddingY: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof TipForm>;

// Default — as seen on the Send a tip page
export const Default: Story = {
  args: {
    btnText: 'Preview tip',
    border: true,
  },
};

// No border — as used when embedded in another component
export const NoBorder: Story = {
  args: {
    btnText: 'Preview tip',
    border: false,
  },
};

// As used on the profile page
export const ProfileVariant: Story = {
  args: {
    btnText: 'Send tip',
    border: false,
    btnFontSize: 'sm',
    margintop: 8,
    btnPaddingY: 2,
  },
};