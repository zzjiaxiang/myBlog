/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  intro: [
    // 'note/introduction',
    // {
    //   label: 'JS',
    //   type: 'category',
    //   link: {
    //     type: 'generated-index',
    //   },
    //   items: [
    //     'note/js/test'
    //   ]
    // },
    {
      label: 'CSS',
      type: 'category',
      link: {
        type: 'generated-index',
      },
      items: [
        'note/css/background',
        'note/css/Pseudo-classes',
        'note/css/Pseudo-elements'
      ]
    }
  ]
  ,
};

module.exports = sidebars;
