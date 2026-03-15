/**
 * Copies text to the clipboard using a two-tier strategy:
 * 1. Primary: navigator.clipboard.writeText (modern async API)
 * 2. Fallback: document.execCommand('copy') via a temporary textarea
 *
 * On complete failure, selects the text in the source element
 * so the user can manually copy with Ctrl+C / Cmd+C.
 *
 * @param text - The text to copy to the clipboard
 * @returns Promise<boolean> - true if copy succeeded, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // Primary: modern Clipboard API
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to execCommand fallback
    }
  }

  // Fallback: execCommand('copy') with a temporary textarea
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;

    // Position off-screen to avoid visual flash
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    textarea.style.opacity = '0';

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const success = document.execCommand('copy');
    document.body.removeChild(textarea);

    if (success) {
      return true;
    }
  } catch {
    // Fall through to manual selection
  }

  // Last resort: select text in the source element for manual copy
  selectTextForManualCopy(text);
  return false;
}

/**
 * Finds an element on the page containing the given text and selects it,
 * allowing the user to manually copy with Ctrl+C / Cmd+C.
 */
function selectTextForManualCopy(text: string): void {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  let node: Node | null;
  while ((node = walker.nextNode())) {
    if (node.textContent?.includes(text) && node.parentElement) {
      const range = document.createRange();
      range.selectNodeContents(node.parentElement);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      return;
    }
  }
}
