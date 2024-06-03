export interface asideType {
  id: number
  name: string
}
export interface mainType {
  name: string
  resources: {
    id: number
    title: string
    img: string
    describe: string
    link: string
  }[]
}
export const aside: asideType[] = [
  {
    id: 1,
    name: 'CSS',
  },
  {
    id: 2,
    name: '图标-动画素材',
  },
  {
    id: 3,
    name: '流程图',
  },
  {
    id: 4,
    name: '画图工具',
  },
  {
    id: 5,
    name: 'Al助手',
  },
  {
    id: 6,
    name: '在线接口 MOCK 平台',
  },
  {
    id: 7,
    name: '官方文档及技术文档',
  },
  {
    id: 8,
    name: '在线部署',
  },
  {
    id: 9,
    name: 'ECharts网站集',
  },
  {
    id: 99,
    name: '其他',
  },
]
const CSS = [
  {
    id: 1,
    title: 'Grid 布局的工具',
    describe: '快速进行 grid 布局的网站',
    img: 'https://grid.layoutit.com/img/icons/icon-44x44.png',
    link: 'https://grid.layoutit.com/',
  },
  {
    id: 2,
    title: 'visualization-collection',
    describe:
      '一个专注于前端视觉效果的集合应用，包含CSS动效、Canvas动画、Three.js3D、人工智能应用等上百个案例',
    img: 'https://hepengwei.cn/public/favicon.ico',
    link: 'https://github.com/hepengwei/visualization-collection/',
  },
  {
    id: 3,
    title: 'Frontendin',
    describe: '包含了许多css、javascript,效果示例.',
    img: 'https://frontendin.com/wp-content/uploads/2020/04/cropped-signs-2-32x32.png',
    link: 'https://frontendin.com/',
  },
  {
    id: 4,
    title: 'CSS-Tricks',
    describe:
      ' 提供了关于网页设计和开发的教程、技巧、工具和资源。该网站的重点之一是CSS',
    img: 'https://css-tricks.com/favicon.svg',
    link: 'https://css-tricks.com/',
  },
]
const icon = [
  {
    id: 1,
    title: 'lottiefiles',
    describe: '为您的网站和应用程序制作轻量级、可扩展的动画',
    img: 'https://static.lottiefiles.com/favicons-new/favicon-32x32.png',
    link: 'https://lottiefiles.com/',
  },
  {
    id: 2,
    title: 'feathericons',
    describe: 'Simply beautiful open source icons',
    img: 'https://feathericons.com/favicon-32x32.png',
    link: 'https://feathericons.com',
  },
  {
    id: 3,
    title: 'iconfont-阿里巴巴矢量图标库',
    describe: '矢量图标库',
    img: 'https://img.alicdn.com/imgextra/i4/O1CN01Z5paLz1O0zuCC7osS_!!6000000001644-55-tps-83-82.svg',
    link: 'https://www.iconfont.cn/',
  },
  {
    id: 4,
    title: 'Yesicon - 精选全球高品质、开源、免费的矢量图标库',
    describe:
      '157个图标库，18万个精品矢量图标，多种语言跨图标库搜索，丰富的类型及风格筛选，快速自定义图标颜色、尺寸及代码风格，专供开发者和设计师一键复制、下载',
    img: 'https://yesicon.app/favicon.svg',
    link: 'https://yesicon.app/',
  },
  {
    id: 5,
    title: 'Illustrations | unDraw',
    describe: '提供一些免费的插图',
    img: 'https://undraw.co/favicon-32x32.png',
    link: 'https://undraw.co/illustrations',
  },
  {
    id: 6,
    title: 'logo设计在线制作生成',
    describe:
      '免费logo素材png图片搜索免费矢量logo图片素材，或AI生成你的专属logo图标',
    img: 'https://www.logosc.cn/img/logo-icons/logosc-new.svg',
    link: 'https://www.logosc.cn/',
  },
  {
    id: 7,
    title:
      '免费正版高清图片素材库 超过4.2百万张优质图片和视频素材可供免费使用和下载 - Pixabay - Pixabay',
    describe:
      '寻找完美的免版税图片或视频，下载之后使用。 ✓ 免版税 ✓ 不要求署名 ✓ 高质量图片.',
    img: 'https://pixabay.com/favicon-32x32.png',
    link: 'https://pixabay.com/zh/',
  },
]
const MAP = [
  {
    id: 1,
    title: 'leader-line',
    describe: '在网页中绘制引导线。',
    img: 'https://png.zjiaxiang.cn/wenjian/myIcon.webp',
    link: 'https://anseki.github.io/leader-line/',
  },
  {
    id: 2,
    title: 'ChartsCSS',
    describe: 'Charts.css是一个用于数据可视化的开源 CSS 框架。',
    img: 'https://chartscss.org/assets/img/logo.svg',
    link: 'https://chartscss.org/',
  },
  {
    id: 3,
    title: 'LogicFlow',
    describe: 'LogicFlow 是一款流程图编辑框架,如流程图、ER 图、BPMN 流程等。',
    img: 'https://site.logic-flow.cn/docs/_images/logo.svg',
    link: 'https://github.com/didi/LogicFlow',
  },
  {
    id: 4,
    title: 'makeapie echarts社区图表可视化案例',
    describe: 'makeapie echarts图表可视化案例, 分享你的可视化作品',
    img: 'https://www.makeapie.cn/favicon.ico',
    link: 'https://www.makeapie.cn/echarts',
  },
]
const DRAWTOOLS = [
  {
    id: 1,
    title: 'draw.io',
    describe:
      '一个免费的在线绘图应用程序和流程图制作程序。您可以使用它来创建UML、实体关系、组织结构图、BPMN和BPM、数据库模式和网络。也可能是电信网络、工作流程、流程图、地图叠加和GIS、电子电路图和社交网络图',
    img: 'https://www.drawio.com/favicon.ico',
    link: 'https://www.drawio.com/',
  },
  {
    id: 2,
    title: 'draw.io',
    describe: '一个免费的即时协作绘图工具。',
    img: 'https://www.tldraw.com/favicon-32x32.png',
    link: 'https://www.tldraw.com/',
  },
  {
    id: 3,
    title: 'MindLine思维导图',
    describe:
      '思维导图,逻辑思维,头脑风暴,流程图,结构图,文字大纲,脑图,幕布,mindline,mindmap,mindnode,xmind,mindmaster',
    img: 'https://www.mindline.cn/res/icon.png',
    link: 'https://www.mindline.cn/',
  },
]
const AL = [
  {
    id: 1,
    title: '通义千问',
    describe:
      '通义千问，LLM，语言大模型，阿里巴巴大模型，达摩院，文生文，自然语言处理',
    img: 'https://img.alicdn.com/imgextra/i4/O1CN01c26iB51UyR3MKMFvk_!!6000000002586-2-tps-124-122.png',
    link: 'https://qianwen.aliyun.com/',
  },
  {
    id: 2,
    title: '文心一言',
    describe: '百度大语言模型',
    img: 'https://nlp-eb.cdn.bcebos.com/logo/favicon.ico',
    link: 'https://yiyan.baidu.com/',
  },
  {
    id: 3,
    title: 'Bard - Google 推出的对话式 AI 工具，由 PaLM 2 技术驱动',
    describe:
      '这是一款 Google 推出的协作式 AI 工具，由 PaLM 2 技术驱动，可帮助你实现创意构想。',
    img: 'https://www.gstatic.com/lamda/images/favicon_v1_150160cddff7f294ce30.svg',
    link: 'https://bard.google.com/',
  },
  {
    id: 4,
    title: 'ChatGPT',
    describe:
      'ChatGPT是一个由OpenAI开发的人工智能语言模型，能够根据上下文和过去的对话生成类似人类的文本。',
    img: 'https://chat.openai.com/favicon-32x32.png',
    link: 'https://chat.openai.com/',
  },
  {
    id: 5,
    title: 'PromptPerfect - Elevate Your Prompts to Perfection.',
    describe: '专业一流的提示词工程开发工具',
    img: 'https://promptperfect.jinaai.cn/icons/favicon-32x32.png',
    link: 'https://promptperfect.jinaai.cn/',
  },
  {
    id: 6,
    title: 'Poe可让您提问、获得即时回答、并与AI机器人互动对话',
    describe:
      '提供GPT-4、gpt-3.5-turbo、Anthropic Claude以及其他多种机器人的访问权限。',
    img: 'https://psc2.cf2.poecdn.net/favicon.svg',
    link: 'https://poe.com/',
  },
]
const MOCK = [
  {
    id: 1,
    title: 'fastmock',
    describe: 'fastmock,接口实现,前后端分离,mock,在线mock,在线接口Mock平台',
    img: 'https://www.fastmock.site/resource/images/favicon.ico',
    link: 'https://www.fastmock.site',
  },
  {
    id: 2,
    title: 'JSONPlaceholder',
    describe: 'Free Fake REST API',
    img: 'https://jsonplaceholder.typicode.com/favicon.ico',
    link: 'https://jsonplaceholder.typicode.com/',
  },
  {
    id: 3,
    title: 'RAP2',
    describe: '阿里前端的接口管理模拟平台',
    img: 'http://rap2.taobao.org/favicon.png',
    link: 'http://rap2.taobao.org/',
  },
  {
    id: 4,
    title: 'httpbin.org',
    describe:
      '测试 HTTP 请求和响应的各种信息，比如 cookie、ip、headers 和登录验证等，且支持 GET、POST 等多种方法，对 web 开发和测试很有帮助。',
    img: 'https://httpbin.org/static/favicon.ico',
    link: 'https://httpbin.org/',
  },
  {
    id: 5,
    title: 'PokéAPI',
    describe:
      '专门为Pokémon游戏信息而制作的免费RESTful API 。 它是迄今为止最大的免费神奇宝贝信息数据库，该API完全免费使用。',
    img: 'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png',
    link: 'https://pokeapi.co/',
  },
  {
    id: 6,
    title: 'Lorem Picsum',
    describe: '随机生成照片',
    img: 'https://picsum.photos/assets/images/favicon/favicon-32x32.png',
    link: 'https://picsum.photos/',
  },
]
const DOCS = [
  {
    id: 1,
    title: 'Nest.js 中文文档',
    describe:
      '更优雅的 node.js 框架-用于构建高效且可伸缩的服务端应用程序的渐进式 Node.js 框架。完美支持 Typescript,面向 AOP 编程支持 typeorm,Node.js 版的 spring,构建微服务应用',
    img: 'https://docs.nestjs.cn/_media/icon.svg',
    link: 'https://docs.nestjs.cn/',
  },
  {
    id: 2,
    title: 'Rollup 中文文档',
    describe: 'JavaScript 打包器',
    img: 'https://cn.rollupjs.org/favicon.png',
    link: 'https://cn.rollupjs.org/',
  },
  {
    id: 3,
    title: 'HTML Standard',
    describe: 'HTML 标准',
    img: 'https://resources.whatwg.org/logo.svg',
    link: 'https://whatwg-cn.github.io/html/',
  },
  {
    id: 4,
    title: '现代 JavaScript 教程',
    describe:
      '以最新的 JavaScript 标准为基准。通过简单但足够详细的内容，为你讲解从基础到高阶的 JavaScript 相关知识。',
    img: 'https://zh.javascript.info/img/favicon/favicon.png',
    link: 'https://zh.javascript.info/',
  },
  {
    id: 5,
    title: 'Chrome for Developers --- 面向开发者的 Chrome',
    describe: '谷歌浏览器面向开发者的文档',
    img: 'https://developer.chrome.com/images/meta/apple-touch-icon.png',
    link: 'https://developer.chrome.com/',
  },
  {
    id: 6,
    title: 'typescriptlang',
    describe: '在线运行typescript',
    img: 'https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
    link: 'https://www.typescriptlang.org/',
  },
]
const SERVER = [
  {
    id: 1,
    title: 'Vercel',
    describe: '云原生部署平台,每月有100G免费的带宽',
    img: 'https://assets.vercel.com/image/upload/front/favicon/vercel/favicon.ico',
    link: 'https://vercel.com/',
  },
  {
    id: 2,
    title: 'Zeabur',
    describe: '在线部署,每月有免费的额度,超出收费',
    img: 'https://zeabur.com/logo-dark.svg',
    link: 'https://zeabur.com/',
  },
  {
    id: 3,
    title: 'Netlify',
    describe: '在线部署和Vercel一类产品,每月有100G免费的带宽',
    img: 'https://www.netlify.com/favicon/icon.svg',
    link: 'https://www.netlify.com/',
  },
  {
    id: 4,
    title: 'Cloudflare',
    describe:
      'Cloudflare集成化云服务平台，专注网站应用和SaaS访问加速、安全防护、稳定在线。提供免费CDN、无限制服务器ddos防御，防cc攻击、sql注入、僵尸网络攻击',
    img: 'https://www.cloudflare-cn.com/favicon.ico',
    link: 'https://www.cloudflare-cn.com/',
  },
  {
    id: 5,
    title: 'AirCode',
    describe:
      'AirCode 是一个在线开发和部署 Node.js 应用的平台，为全栈工程师量身定制，目标是让开发变得简单。',
    img: 'https://aircode.io/favicons/favicon.ico',
    link: 'https://docs-cn.aircode.io/',
  },
]
const OTHER = [
  {
    id: 1,
    title: 'Driver.js',
    describe:
      '新用户引导库,一个强大的，轻量级,没有依赖项，支持所有主要浏览器,使用原生 JavaScript 引擎开发的库。',
    img: 'https://driverjs.com/favicon.svg',
    link: 'https://driverjs.com/',
  },
  {
    id: 2,
    title: 'Component Party',
    describe:
      '提供了JS组件库的语法和功能概述包括:React，Vue 3，Vue 2，Svelte 4，Angular，Lit，Ember，SolidJS，Alpine，Mithril，Aurelia 2，Qwik，Marko，Aurelia1，Svelte 5',
    img: 'https://component-party.dev/favicon.png',
    link: 'https://component-party.dev/',
  },
  {
    id: 3,
    title: 'NGINXConfig',
    describe: '在线配置nginx服务器',
    img: 'https://www.digitalocean.com/_next/static/media/favicon.594d6067.ico',
    link: 'https://www.digitalocean.com/community/tools/nginx',
  },
  {
    id: 4,
    title: 'Best Privacy Tools',
    describe: '2023 年最佳隐私工具和软件指南',
    img: 'https://www.privacytools.io/img/favicons/favicon-32x32.png',
    link: 'https://www.privacytools.io/',
  },
  {
    id: 5,
    title: 'xLog - Write. Own. Earn.',
    describe: '一个写在区块链上的开源创意社区。',
    img: 'https://xlog.app/assets/logo.svg',
    link: 'https://xlog.app',
  },
]
const ECharts = [
  {
    id: 1,
    title: 'Apache ECharts',
    describe: '一个基于 JavaScript 的开源可视化图表库',
    img: 'https://echarts.apache.org/zh/images/favicon.png',
    link: 'https://echarts.apache.org/zh/index.html',
  },
  {
    id: 2,
    title: 'isqqw ECharts demo集',
    describe: 'ECharts图表集,ECharts demo集,echarts gallery社区',
    img: 'https://www.isqqw.com/favicon.ico',
    link: 'https://www.isqqw.com/',
  },
  {
    id: 3,
    title: 'madeapie',
    describe:
      'echarts, 可视化数据，图表，图表制作，echarts图表制作，Make A Pie，Made A Pie，echarts案例，echarts教程',
    img: 'https://madeapie.com/favicon.ico',
    link: 'https://madeapie.com/',
  },
  {
    id: 4,
    title: 'makeapie echarts社区图表可视化案例',
    describe: 'makeapie echarts图表可视化案例, 分享你的可视化作品',
    img: 'https://www.makeapie.cn/favicon.ico',
    link: 'https://www.makeapie.cn/',
  },
]
export const mainData: mainType[] = [
  {
    name: 'CSS',
    resources: CSS,
  },
  {
    name: '图标-动画素材',
    resources: icon,
  },
  {
    name: '流程图',
    resources: MAP,
  },
  {
    name: 'ECharts网站集',
    resources: ECharts,
  },
  {
    name: '画图工具',
    resources: DRAWTOOLS,
  },
  {
    name: 'Al助手',
    resources: AL,
  },
  {
    name: '在线接口 MOCK 平台',
    resources: MOCK,
  },
  {
    name: '官方文档及技术文档',
    resources: DOCS,
  },
  {
    name: '在线部署',
    resources: SERVER,
  },
  {
    name: '其他',
    resources: OTHER,
  },
]
