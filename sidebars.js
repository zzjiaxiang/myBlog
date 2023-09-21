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
      items: ['note/js/network-request'],
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
