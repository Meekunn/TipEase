import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import system from '@/theme';
import Loader from './index';

const renderLoader = (props: { open: boolean; text?: string }) => {
  return render(
    <ChakraProvider value={system}>
      <Loader {...props} />
    </ChakraProvider>
  );
};

describe('Loader', () => {
  it('renders nothing when open is false', () => {
    const { container } = renderLoader({ open: false });
    expect(container.firstChild).toBeNull();
  });

  it('renders the spinner when open is true', () => {
    renderLoader({ open: true });
    expect(document.body.firstChild).not.toBeNull();
  });

  it('renders text when provided', () => {
    renderLoader({ open: true, text: 'Processing transaction...' });
    expect(screen.getByText('Processing transaction...')).toBeInTheDocument();
  });

  it('does not render text when not provided', () => {
    renderLoader({ open: true });
    expect(screen.queryByText('Processing transaction...')).toBeNull();
  });
});