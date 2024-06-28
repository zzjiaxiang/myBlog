/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  intro: [
    'note/readme',
    {
      label: 'JavaScript',
      type: 'category',
      link: {
        type: 'generated-index',
      },
      items: [
        'note/js/network-request',
        'note/js/xlsx',
        'note/js/event-delegation',
        'note/js/javascript-observer',
        'note/js/canvasapi',
        'note/js/jsModule',
        'note/js/Closures',
        'note/js/Promise',
        'note/js/definePropertyProxy',
        'note/js/createProject',
        'note/js/executionContext',
        'note/js/Equality_comparisons',
      ],
    },
    {
      label: 'TypeScript',
      type: 'category',
      link: {
        type: 'generated-index',
      },
      items: ['note/ts/partialtype', 'note/ts/Generics'],
    },
    {
      label: 'Vue',
      type: 'category',
      link: {
        type: 'generated-index',
      },
      items: [
        'note/vue/vueReactivity',
        'note/vue/createApp',
        'note/vue/vueDiff',
        'note/vue/vueCompiler',
        'note/vue/vuePersistence'
      ],
    },
    {
      label: 'HTML',
      type: 'category',
      link: {
        type: 'generated-index',
      },
      items: ['note/html/element-dialog', 'note/html/html-dialog'],
    },
    {
      label: '数据处理',
      type: 'category',
      link: {
        type: 'generated-index',
      },
      items: ['note/process-data/process-data-structure','note/process-data/sort','note/process-data/list','note/process-data/slidingWindow'],
    },
    {
      label: 'CSS',
      type: 'category',
      link: {
        type: 'generated-index',
      },
      items: [
        'note/css/background',
        'note/css/Pseudo-classes',
        'note/css/Pseudo-elements',
        'note/css/css-selectors',
        'note/css/google-login',
        'note/css/content-visibility',
        'note/css/grid',
        'note/css/form-sizing',
      ],
    },
    {
      label: 'Http',
      type: 'category',
      link: {
        type: 'generated-index',
      },
      items: [
        'note/http/httpCache',
        'note/http/httpVersion',
        'note/http/httpStatus',
        'note/http/httpOther',
      ],
    },
    {
      label: 'Other',
      type: 'category',
      link: {
        type: 'generated-index',
      },
      items: [
        'other/docusaurus-syntax',
        'other/chrome-devtools',
        'other/WebPerformance',
      ],
    },
  ],
}

module.exports = sidebars
