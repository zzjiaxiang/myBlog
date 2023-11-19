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
        'note/js/javascript-observer',
      ],
    },
    {
      label: 'TypeScript',
      type: 'category',
      link: {
        type: 'generated-index',
      },
      items: ['note/ts/TypeScript内置数据类型'],
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
      label: 'Other',
      type: 'category',
      link: {
        type: 'generated-index',
      },
      items: ['other/docusaurus-syntax', 'other/chrome-devtools'],
    },
  ],
}

module.exports = sidebars
