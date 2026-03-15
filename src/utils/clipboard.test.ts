import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { copyToClipboard } from './clipboard';

describe('copyToClipboard', () => {
  let originalClipboard: Clipboard;

  beforeEach(() => {
    originalClipboard = navigator.clipboard;
    // jsdom doesn't define execCommand, so we add it for testing
    if (!document.execCommand) {
      document.execCommand = vi.fn().mockReturnValue(false);
    }
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      writable: true,
      configurable: true,
    });
    vi.restoreAllMocks();
  });

  it('returns true when navigator.clipboard.writeText succeeds', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: writeTextMock },
      writable: true,
      configurable: true,
    });

    const result = await copyToClipboard('test text');

    expect(result).toBe(true);
    expect(writeTextMock).toHaveBeenCalledWith('test text');
  });

  it('falls back to execCommand when clipboard API fails', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
      writable: true,
      configurable: true,
    });

    document.execCommand = vi.fn().mockReturnValue(true);

    const result = await copyToClipboard('fallback text');

    expect(result).toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('falls back to execCommand when clipboard API is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: undefined,
      writable: true,
      configurable: true,
    });

    document.execCommand = vi.fn().mockReturnValue(true);

    const result = await copyToClipboard('no clipboard api');

    expect(result).toBe(true);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('returns false and selects text when both methods fail', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
      writable: true,
      configurable: true,
    });
    document.execCommand = vi.fn().mockReturnValue(false);

    // Add an element with the target text to the DOM
    const el = document.createElement('span');
    el.textContent = 'DE89370400440532013000';
    document.body.appendChild(el);

    const selectionMock = {
      removeAllRanges: vi.fn(),
      addRange: vi.fn(),
    };
    vi.spyOn(window, 'getSelection').mockReturnValue(selectionMock as unknown as Selection);

    const result = await copyToClipboard('DE89370400440532013000');

    expect(result).toBe(false);
    expect(selectionMock.removeAllRanges).toHaveBeenCalled();
    expect(selectionMock.addRange).toHaveBeenCalled();

    document.body.removeChild(el);
  });

  it('returns false when all methods fail and text is not found in DOM', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
      writable: true,
      configurable: true,
    });
    document.execCommand = vi.fn().mockReturnValue(false);

    const result = await copyToClipboard('nonexistent text in dom');

    expect(result).toBe(false);
  });
});
