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
    name: "图标动画素材"
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
        describe: "轻量级、可扩展的动画",
        img: 'https://static.lottiefiles.com/favicons-new/android-icon-192x192.png',
        link: "https://lottiefiles.com/"
      }
    ]
  }
]
