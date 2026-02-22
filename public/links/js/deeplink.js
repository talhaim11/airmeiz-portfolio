/**
 * AIRMEIZ Deep Link - shared logic for app landing pages
 * - Expiry check (?expires=unix_timestamp)
 * - Platform detection (iOS / Android / desktop)
 * - Open in app (custom scheme) with web fallback
 */
(function () {
  'use strict';

  const DEELINK = {
    apps: {
      alphaflow: { scheme: 'airmeiz-alphaflow', name: 'ALPHAFLOW', pathLabel: { screens: 'Screen', content: 'Content', auth: 'Sign in' } },
      pulsegate: { scheme: 'airmeiz-pulsegate', name: 'PULSEGATE', pathLabel: { screens: 'Screen', content: 'Content', auth: 'Sign in' } },
      swapex: { scheme: 'airmeiz-swapex', name: 'SWAPEX', pathLabel: { screens: 'Screen', content: 'Content', auth: 'Sign in' } },
      erevshabbat: { scheme: 'airmeiz-erevshabbat', name: 'EREVSHABBAT', pathLabel: { screens: 'Screen', content: 'Content', auth: 'Sign in' } },
      novapay: { scheme: 'airmeiz-novapay', name: 'Novapay', pathLabel: { screens: 'Screen', content: 'Content', auth: 'Sign in' } }
    },

    getPlatform: function () {
      const ua = navigator.userAgent || '';
      if (/iPhone|iPad|iPod/i.test(ua)) return 'ios';
      if (/Android/i.test(ua)) return 'android';
      return 'desktop';
    },

    getAppFromPath: function () {
      const m = (window.location.pathname || '').match(/\/links\/([a-z]+)/);
      return m ? m[1] : null;
    },

    getPathFromUrl: function () {
      const path = (window.location.pathname || '').replace(/^\/links\/[a-z]+\/?/, '') || '';
      return path;
    },

    getExpires: function () {
      const params = new URLSearchParams(window.location.search);
      const exp = params.get('expires');
      return exp ? parseInt(exp, 10) : null;
    },

    isExpired: function () {
      const exp = this.getExpires();
      if (!exp) return false;
      return Math.floor(Date.now() / 1000) > exp;
    },

    buildAppUrl: function (app, path) {
      const info = this.apps[app];
      if (!info) return null;
      const scheme = info.scheme + '://';
      const p = (path || '').replace(/^\//, '');
      return p ? scheme + p : scheme;
    },

    openApp: function (app, path) {
      const url = this.buildAppUrl(app, path);
      if (!url) return;
      window.location.href = url;
    },

    getPathContext: function (path) {
      if (!path) return null;
      const parts = path.split('/').filter(Boolean);
      if (parts[0] === 'screens' && parts[1]) return 'Opening ' + parts[1].replace(/-/g, ' ') + ' in app';
      if (parts[0] === 'content' && parts[1] && parts[2]) return 'Opening content in app';
      if (parts[0] === 'auth') return 'Opening sign in / sign up in app';
      return 'Opening app';
    },

    init: function (opts) {
      opts = opts || {};
      const app = opts.app || this.getAppFromPath();
      const path = opts.path != null ? opts.path : this.getPathFromUrl();
      const appInfo = app ? this.apps[app] : null;

      if (this.isExpired()) {
        const el = document.getElementById('deeplink-expired') || document.querySelector('.deeplink-expired');
        if (el) el.style.display = 'block';
        const main = document.getElementById('deeplink-main') || document.querySelector('.deeplink-main');
        if (main) main.style.display = 'none';
        return { expired: true, app, path };
      }

      const platform = this.getPlatform();
      document.body.classList.add('platform-' + platform);
      const context = this.getPathContext(path);
      const appUrl = appInfo ? this.buildAppUrl(app, path) : null;

      window.DEELINK_STATE = { app, path, platform, context, appUrl, appInfo };
      return { expired: false, app, path, platform, context, appUrl, appInfo };
    }
  };

  window.DEELINK = DEELINK;
})();
