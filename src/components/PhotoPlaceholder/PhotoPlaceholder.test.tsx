import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PhotoPlaceholder from './PhotoPlaceholder';

describe('PhotoPlaceholder', () => {
  it('renders placeholder with camera icon and label when no src is provided', () => {
    render(<PhotoPlaceholder />);
    expect(screen.getByText('📷')).toBeInTheDocument();
    expect(screen.getByText('Photo')).toBeInTheDocument();
  });

  it('renders placeholder with role="img" for accessibility', () => {
    render(<PhotoPlaceholder />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('uses provided alt text as aria-label on placeholder', () => {
    render(<PhotoPlaceholder alt="Hero photo" />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Hero photo');
  });

  it('uses default aria-label when no alt is provided', () => {
    render(<PhotoPlaceholder />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'Photo placeholder');
  });

  it('renders an <img> element when src is provided', () => {
    render(<PhotoPlaceholder src="https://example.com/photo.jpg" alt="Wedding photo" />);
    const img = screen.getByRole('img');
    expect(img.tagName).toBe('IMG');
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
    expect(img).toHaveAttribute('alt', 'Wedding photo');
  });

  it('does not render placeholder indicator when src is provided', () => {
    render(<PhotoPlaceholder src="https://example.com/photo.jpg" />);
    expect(screen.queryByText('Photo')).not.toBeInTheDocument();
    expect(screen.queryByText('📷')).not.toBeInTheDocument();
  });

  it('applies default aspect ratio of 4/3', () => {
    const { container } = render(<PhotoPlaceholder />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.aspectRatio).toBe('4/3');
  });

  it('applies custom aspect ratio', () => {
    const { container } = render(<PhotoPlaceholder aspectRatio="16/9" />);
    const el = container.firstChild as HTMLElement;
    expect(el.style.aspectRatio).toBe('16/9');
  });
});
