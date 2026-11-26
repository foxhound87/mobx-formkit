import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/mobx-formkit/',
  title: 'MobX Formkit',
  description: 'Reactive MobX Form State Management — extensible validation, nested fields, event hooks, and bindings for React.',
  lang: 'en-US',

  srcDir: './docs',

  outDir: './_book',

  head: [
    ['link', { rel: 'icon', href: 'https://foxhound87.github.io/mobx-formkit-demo/favicon.ico' }],
    ['style', {}, `
      :root {
        --vp-c-brand-1: #e11d48;
        --vp-c-brand-2: #be123c;
        --vp-c-brand-3: #9f1239;
        --vp-c-brand-soft: rgba(225, 29, 72, 0.14);
        --vp-button-brand-bg: #e11d48;
        --vp-button-brand-hover-bg: #be123c;
        --vp-button-brand-active-bg: #9f1239;
        --vp-home-hero-name-color: transparent;
        --vp-home-hero-name-background: linear-gradient(135deg, #e11d48, #fb7185);
        --vp-home-hero-image-background-image: linear-gradient(135deg, #e11d48 0%, #9f1239 100%);
        --vp-home-hero-image-filter: blur(68px);
      }
    `],
    ['script', {}, `
(function() {
  var count = 0, timer = setInterval(function() {
    var a = document.querySelector('.VPHomeHero .actions');
    if (a && !a.querySelector('.hero-stars')) {
      var w = document.createElement('span');
      w.className = 'hero-stars';
      w.innerHTML = '<a href="https://github.com/foxhound87/mobx-formkit" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/github/stars/foxhound87/mobx-formkit?style=for-the-badge&logo=github&label=Stars&color=e11d48" alt="GitHub stars"></a>';
      a.appendChild(w);
      clearInterval(timer);
    }
    if (++count > 50) clearInterval(timer);
  }, 150);
})();
    `],
  ],

  themeConfig: {
    logo: false,

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/quick-start' },
      { text: 'API', link: '/api-reference/' },
      { text: 'Demo', link: 'https://foxhound87.github.io/mobx-formkit-demo/' },
      {
        text: 'Resources',
        items: [
          { text: 'NPM', link: 'https://www.npmjs.com/package/mobx-formkit' },
          { text: 'GitHub', link: 'https://github.com/foxhound87/mobx-formkit' },
          { text: 'Discord', link: 'https://discord.gg/CVV8w4zat4' },
          { text: 'AI Agent Guide', link: '/AGENTS' },
          { text: 'AI Skills', link: 'https://github.com/foxhound87/skills' },
          { text: 'Demo Code', link: 'https://github.com/foxhound87/mobx-formkit-demo' },
        ],
      },
    ],

    search: {
      provider: 'local',
    },

    sidebar: [
      {
        text: 'Introduction',
        link: '/',
        items: [
          { text: 'Quick Start', link: '/quick-start' },
          { text: 'Quick Start (class)', link: '/quick-start-class' },
          { text: 'TypeScript Usage', link: '/typescript' },
          { text: 'DevTools', link: '/devtools' },
          { text: 'UMD Setup', link: '/umd-setup' },
          { text: 'Render Engine Support', link: '/frameworks' },
          { text: 'AI Agent Skills', link: '/skills' },
          { text: 'AI Agent Guide', link: '/AGENTS' },
        ],
      },
      {
        text: 'API Reference',
        link: '/api-reference/',
        items: [
          { text: 'Form Properties', link: '/api-reference/form-properties' },
          { text: 'Form Methods', link: '/api-reference/form-methods' },
          { text: 'Fields Properties', link: '/api-reference/fields-properties' },
          { text: 'Fields Methods', link: '/api-reference/fields-methods' },
        ],
      },
      {
        text: 'Form',
        items: [
          { text: 'Form Instance', link: '/form/' },
          { text: 'Form Initialization', link: '/form/form-initialization' },
          { text: 'Form Options', link: '/form/form-options' },
          {
            text: 'Extend Form & Field',
            collapsed: true,
            items: [
              { text: 'Extend Form & generic Field', link: '/form/extend/generic' },
              { text: 'Extend custom Field', link: '/form/extend/custom' },
              { text: 'Extend in Fields Definitions', link: '/form/extend/configure' },
            ],
          },
        ],
      },
      {
        text: 'Fields',
        link: '/fields/',
        items: [
          { text: 'Flat Fields (Unified)', link: '/fields/#flat-unified-mode' },
          { text: 'Flat Fields (Separated)', link: '/fields/#flat-separated-mode' },
          { text: 'Nested Fields (Unified)', link: '/fields/#nested-unified-mode' },
          { text: 'Nested Fields (Separated)', link: '/fields/#nested-separated-mode' },
          { text: 'Mixed Mode', link: '/fields/#mixed-mode-unified-separated' },
        ],
      },
      {
        text: 'Actions',
        link: '/actions/',
        items: [
          { text: 'Form Actions', link: '/actions/form' },
          { text: 'Navigation & Iteration', link: '/actions/shared' },
          { text: 'Get, Set & Update', link: '/actions/get-set' },
          { text: 'Add, Delete & Move', link: '/actions/add-del' },
          { text: 'Clear, Reset & Focus', link: '/actions/clear-reset' },
          { text: 'Commit & Restore', link: '/actions/commit-restore' },
          { text: 'Mark Pristine', link: '/actions/mark-pristine' },
          { text: 'Validation & Submit', link: '/actions/validate' },
          { text: 'Helpers', link: '/actions/helpers' },
        ],
      },
      {
        text: 'Events & Handlers',
        link: '/events/',
        items: [
          {
            text: 'Event Handlers',
            collapsed: true,
            items: [
              { text: 'Event Handlers', link: '/events/event-handlers' },
              { text: 'Custom Event Handlers', link: '/events/event-handlers/constructor' },
              { text: 'Extend Handlers Class', link: '/events/event-handlers/extending' },
            ],
          },
          {
            text: 'Event Hooks',
            collapsed: true,
            items: [
              { text: 'Event Hooks', link: '/events/event-hooks' },
              { text: 'Custom Event Hooks', link: '/events/event-hooks/constructor' },
              { text: 'Extend Hooks Class', link: '/events/event-hooks/extending' },
            ],
          },
          {
            text: 'Validation Hooks',
            collapsed: true,
            items: [
              { text: 'Validation Hooks', link: '/events/validation-hooks' },
              { text: 'Validation Init', link: '/events/validation-hooks/constructor' },
              { text: 'Validation Extend', link: '/events/validation-hooks/extending' },
              { text: 'Validation Override', link: '/events/validation-hooks/override' },
            ],
          },
        ],
      },
      {
        text: 'Bindings',
        items: [
          { text: 'Bindings', link: '/bindings/' },
          { text: 'Default Bindings', link: '/bindings/default' },
          { text: 'Custom Bindings', link: '/bindings/custom' },
        ],
      },
      {
        text: 'Advanced',
        link: '/advanced/',
        items: [
          { text: 'Overview', link: '/advanced/' },
          { text: 'Sortable List', link: '/advanced/sortable' },
          { text: 'Interceptors', link: '/advanced/interceptors' },
          { text: 'Observers', link: '/advanced/observers' },
          { text: 'Reactive Computed', link: '/advanced/reactive-computed' },
          { text: 'Cross Validation', link: '/advanced/cross-validation' },
          { text: 'Nested Composition', link: '/advanced/nested-composition' },
          { text: 'Wizard (multi-step)', link: '/advanced/wizard' },
          { text: 'Bindings Demo', link: '/advanced/bindings-demo' },
          { text: 'Markdown Editor', link: '/advanced/markdown' },
          { text: 'File Upload', link: '/advanced/file-upload' },
          { text: 'ArrayMap', link: '/advanced/array-map' },
        ],
      },
      {
        text: 'Guides',
        items: [
          { text: 'Migration Guide', link: '/migration-guide' },
          { text: 'Error Handling', link: '/error-handling' },
          { text: 'Performance & SSR', link: '/performance-ssr' },
        ],
      },
      {
        text: 'Extra',
        link: '/extra/',
        items: [
          { text: 'Computed Field Props', link: '/extra/computed-props' },
          { text: 'Input & Output Converters', link: '/extra/converters' },
          { text: 'Validated Value & Flat Map', link: '/extra/validated-value' },
          { text: 'Observe / Intercept', link: '/extra/mobx-events' },
          { text: 'Forms Composer', link: '/extra/composer' },
          { text: 'Recipes & Patterns', link: '/recipes' },
          { text: 'Troubleshooting & FAQ', link: '/troubleshooting' },
        ],
      },
      {
        text: 'Validation',
        items: [
          { text: 'Choosing a Plugin', link: '/validation/' },
          { text: 'Plugins & Packages', link: '/validation/plugins' },
          { text: 'Validation Lifecycle', link: '/validation/lifecycle' },
          {
            text: 'Setup Plugins',
            collapsed: true,
            items: [
              { text: 'Setup VJF', link: '/validation/plugins/VJF/setup' },
              { text: 'Setup DVR', link: '/validation/plugins/DVR/setup' },
              { text: 'Setup AJV', link: '/validation/plugins/AJV/setup' },
              { text: 'Setup YUP', link: '/validation/plugins/YUP/setup' },
              { text: 'Setup JOI', link: '/validation/plugins/JOI/setup' },
              { text: 'Setup ZOD', link: '/validation/plugins/ZOD/setup' },
              { text: 'Setup VALIBOT', link: '/validation/plugins/VALIBOT/setup' },
              { text: 'Setup VINEJS', link: '/validation/plugins/VINEJS/setup' },
            ],
          },
          {
            text: 'Extend Validators',
            collapsed: true,
            items: [
              { text: 'Extend VJF', link: '/validation/plugins/VJF/extend' },
              { text: 'Extend DVR', link: '/validation/plugins/DVR/extend' },
              { text: 'Extend AJV', link: '/validation/plugins/AJV/extend' },
              { text: 'Extend VALIBOT', link: '/validation/plugins/VALIBOT/extend' },
              { text: 'Extend VINEJS', link: '/validation/plugins/VINEJS/extend' },
            ],
          },
          {
            text: 'Async Validation',
            collapsed: true,
            items: [
              { text: 'Async VJF', link: '/validation/plugins/VJF/async' },
              { text: 'Async DVR', link: '/validation/plugins/DVR/async' },
              { text: 'Async AJV', link: '/validation/plugins/AJV/async' },
              { text: 'Async VINEJS', link: '/validation/plugins/VINEJS/async' },
            ],
          },
        ],
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: '© 2016 — now<br><a href="https://github.com/foxhound87/" target="_blank" rel="noreferrer">foxhound87</a>',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/foxhound87/mobx-formkit' },
      { icon: 'discord', link: 'https://discord.gg/CVV8w4zat4' },
    ],

    editLink: {
      pattern: 'https://github.com/foxhound87/mobx-formkit/edit/master/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },

  lastUpdated: true,
  cleanUrls: true,
})
