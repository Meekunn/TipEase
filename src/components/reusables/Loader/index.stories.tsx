import type { Meta, StoryObj } from '@storybook/react-vite';
import Loader from './index';

const meta: Meta<typeof Loader> = {
  title: 'Reusables/Loader',
  component: Loader,
  argTypes: {
    open: { control: 'boolean' },
    text: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

// Basic spinner with no text
export const Default: Story = {
  args: {
    open: true,
  },
};

// With a loading message
export const WithText: Story = {
  args: {
    open: true,
    text: 'Processing transaction...',
  },
};

// Closed state — renders nothing
export const Closed: Story = {
  args: {
    open: false,
  },
};