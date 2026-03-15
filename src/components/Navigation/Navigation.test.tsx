import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from './Navigation';

const sections = [
  { id: 'schedule', label: 'Schedule' },
  { id: 'party', label: 'Party' },
  { id: 'gift', label: 'Gift' },
];

describe('Navigation', () => {
  it('renders a link for each section with correct href', () => {
    render(<Navigation sections={sections} />);

    for (const section of sections) {
      const link = screen.getByRole('link', { name: section.label });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `#${section.id}`);
    }
  });

  it('renders no links when sections is empty', () => {
    render(<Navigation sections={[]} />);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  it('calls scrollIntoView with smooth behavior on click', () => {
    const mockScrollIntoView = vi.fn();

    // Create a target element in the DOM
    const target = document.createElement('div');
    target.id = 'schedule';
    target.scrollIntoView = mockScrollIntoView;
    document.body.appendChild(target);

    render(<Navigation sections={sections} />);

    const link = screen.getByRole('link', { name: 'Schedule' });
    fireEvent.click(link);

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });

    document.body.removeChild(target);
  });

  it('has an accessible navigation landmark', () => {
    render(<Navigation sections={sections} />);
    const nav = screen.getByRole('navigation', { name: /wedding sections/i });
    expect(nav).toBeInTheDocument();
  });
});
