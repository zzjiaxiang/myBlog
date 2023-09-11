/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  intro: [
    // 'note/introduction',
    {
      label: 'JavaScript',
      type: 'category',
      link: {
        type: 'generated-index',
      },
      items: [
        'note/js/network-request',
      ]
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
        'note/css/css-selectors'
      ]
    }
  ]
  ,
};

module.exports = sidebars;
