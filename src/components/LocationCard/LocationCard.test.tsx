import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LocationCard from './LocationCard';

describe('LocationCard', () => {
  const defaultProps = {
    venueName: 'Cathedral',
    address: '123 Church St, City',
    mapsUrl: 'https://maps.google.com/test',
  };

  it('renders venue name', () => {
    render(<LocationCard {...defaultProps} />);
    expect(screen.getByText('Cathedral')).toBeInTheDocument();
  });

  it('renders address', () => {
    render(<LocationCard {...defaultProps} />);
    expect(screen.getByText('123 Church St, City')).toBeInTheDocument();
  });

  it('renders time when provided', () => {
    render(<LocationCard {...defaultProps} time="16:00" />);
    expect(screen.getByText('16:00')).toBeInTheDocument();
  });

  it('does not render time when not provided', () => {
    const { container } = render(<LocationCard {...defaultProps} />);
    const timeElements = container.querySelectorAll('p');
    // Only the address paragraph should be present (no time paragraph)
    expect(timeElements).toHaveLength(1);
  });

  it('renders Google Maps link with correct href', () => {
    render(<LocationCard {...defaultProps} />);
    const link = screen.getByRole('link', { name: /google maps/i });
    expect(link).toHaveAttribute('href', 'https://maps.google.com/test');
  });

  it('opens Google Maps link in a new tab', () => {
    render(<LocationCard {...defaultProps} />);
    const link = screen.getByRole('link', { name: /google maps/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
