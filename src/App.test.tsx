import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }: { children: React.ReactNode }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }: { children: React.ReactNode }) => <div data-testid="popup">{children}</div>,
  Polyline: () => <div data-testid="polyline" />,
  Tooltip: ({ children }: { children: React.ReactNode }) => <div data-testid="tooltip">{children}</div>,
  useMap: () => ({ fitBounds: vi.fn() }),
}))

import App from './App'

describe('App', () => {
  it('renders all sections in order', () => {
    render(<App />)

    // Hero content
    expect(screen.getByText('28 Giugno 2026')).toBeInTheDocument()

    // All section anchors present
    expect(document.getElementById('schedule')).toBeInTheDocument()
    expect(document.getElementById('map')).toBeInTheDocument()
    expect(document.getElementById('rsvp')).toBeInTheDocument()
    expect(document.getElementById('honeymoon')).toBeInTheDocument()

    // Sections appear in correct order
    const sections = document.querySelectorAll('section')
    const ids = Array.from(sections).map(s => s.id).filter(Boolean)
    expect(ids).toEqual(['schedule', 'map', 'rsvp', 'honeymoon', 'trip'])
  })
})
