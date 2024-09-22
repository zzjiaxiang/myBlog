import React, { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

interface LottieProps {
  className?: string
}
const path = 'https://png.zjiaxiang.cn/blog/x0nV1KRGDm.json'
const setLottie = (container) => {
  lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path,
  })
}

const Lottie: React.FC<LottieProps> = ({ className }) => {
  const lottieDom = useRef(null)
  useEffect(() => setLottie(lottieDom.current!), [])

  return <div className={className} ref={lottieDom}></div>
}

export default Lottie
