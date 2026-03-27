/**
 * 21st.dev Toolbar - Development only.
 * Connects frontend UI to AI agents in Cursor for AI-powered editing.
 * Only loads on localhost or when ?21st=1 is in the URL.
 */
(async () => {
  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';
  const forceEnable = window.location.search.includes('21st=1');
  if (!isLocalhost && !forceEnable) return;

  try {
    const { initToolbar } = await import(
      'https://esm.sh/@21st-extension/toolbar@0.5.14'
    );
    initToolbar({ plugins: [] });
    console.log('[21st.dev] Toolbar initialized');
  } catch (e) {
    console.error('[21st.dev] Failed to load toolbar:', e);
  }
})();
