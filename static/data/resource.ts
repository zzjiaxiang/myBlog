export interface asideType {
  id: number,
  name: string
}
export interface mainType {
  name: string,
  resources: {
    id: number,
    title: string,
    img: string,
    describe: string,
    link: string
  }[]
}
export const aside: asideType[] = [
  {
    id: 1,
    name: "CSS"
  },
  {
    id: 2,
    name: "图标-动画素材"
  },
  {
    id: 3,
    name: "流程图"
  },
  {
    id: 4,
    name: "其他"
  }
]
export const mainData: mainType[] = [
  {
    name: "CSS",
    resources: [
      {
        id: 1,
        title: 'Grid 布局的工具',
        describe: "快速进行 grid 布局的网站",
        img: 'https://grid.layoutit.com/img/icons/icon-44x44.png',
        link: "https://grid.layoutit.com/"
      }
    ]
  },
  {
    name: "图标动画素材",
    resources: [
      {
        id: 1,
        title: 'lottiefiles',
        describe: "为您的网站和应用程序制作轻量级、可扩展的动画",
        img: 'https://static.lottiefiles.com/favicons-new/favicon-32x32.png',
        link: "https://lottiefiles.com/"
      },
      {
        id: 2,
        title: 'feathericons',
        describe: "Simply beautiful open source icons",
        img: 'https://feathericons.com/favicon-32x32.png',
        link: "https://feathericons.com"
      },
      {
        id: 3,
        title: 'iconfont-阿里巴巴矢量图标库',
        describe: "矢量图标库",
        img: 'https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg',
        link: "https://www.iconfont.cn/"
      },
      {
        id: 4,
        title: 'Yesicon - 精选全球高品质、开源、免费的矢量图标库',
        describe: "157个图标库，18万个精品矢量图标，多种语言跨图标库搜索，丰富的类型及风格筛选，快速自定义图标颜色、尺寸及代码风格，专供开发者和设计师一键复制、下载",
        img: 'https://yesicon.app/favicon.svg',
        link: "https://yesicon.app/"
      },
      {
        id: 5,
        title: 'Illustrations | unDraw',
        describe: "提供一些免费的插图",
        img: 'https://undraw.co/favicon-32x32.png',
        link: "https://undraw.co/illustrations"
      },
      {
        id: 6,
        title: 'logo设计在线制作生成',
        describe: "免费logo素材png图片搜索免费矢量logo图片素材，或AI生成你的专属logo图标",
        img: 'https://www.logosc.cn/img/logo-icons/logosc-new.svg',
        link: "https://www.logosc.cn/"
      },
      {
        id: 7,
        title: '免费正版高清图片素材库 超过4.2百万张优质图片和视频素材可供免费使用和下载 - Pixabay - Pixabay',
        describe: "寻找完美的免版税图片或视频，下载之后使用。 ✓ 免版税 ✓ 不要求署名 ✓ 高质量图片.",
        img: 'https://pixabay.com/favicon-32x32.png',
        link: "https://pixabay.com/zh/"
      }
    ]
  },
  {
    name: "流程图",
    resources: [
      {
        id: 1,
        title: 'leader-line',
        describe: "在网页中绘制引导线。",
        img: '../img/myIcon.jpeg',
        link: "https://anseki.github.io/leader-line/"
      },
      {
        id: 2,
        title: 'ChartsCSS',
        describe: "Charts.css是一个用于数据可视化的开源 CSS 框架。",
        img: 'https://chartscss.org/assets/img/logo.svg',
        link: "https://chartscss.org/"
      },
      {
        id: 3,
        title: 'LogicFlow',
        describe: "LogicFlow 是一款流程图编辑框架,如流程图、ER 图、BPMN 流程等。",
        img: 'https://site.logic-flow.cn/docs/_images/logo.svg',
        link: "https://github.com/didi/LogicFlow"
      },
      {
        id: 4,
        title: 'Apache ECharts',
        describe: "一个基于 JavaScript 的开源可视化图表库",
        img: 'https://echarts.apache.org/zh/images/favicon.png',
        link: "https://echarts.apache.org/zh/index.html"
      },
      {
        id: 5,
        title: 'ECharts demo集',
        describe: "ECharts图表集,ECharts demo集,echarts gallery社区",
        img: 'https://www.isqqw.com/favicon.ico',
        link: "https://www.isqqw.com/"
      }
    ]
  },
  {
    name: "其他",
    resources: [
      {
        id: 1,
        title: 'visualization-collection',
        describe: "一个专注于前端视觉效果的集合应用，包含CSS动效、Canvas动画、Three.js3D、人工智能应用等上百个案例",
        img: 'https://hepengwei.cn/public/favicon.ico',
        link: "https://github.com/hepengwei/visualization-collection/"
      }
    ]
  }
]
