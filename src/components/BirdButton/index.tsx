import React from 'react'
import Link from '@docusaurus/Link'
import styles from './index.module.scss'

const BirdButton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.buttonWrapper}>
          <span>
            <Link to="/docs/note/">开始</Link>
          </span>
        </div>
        <div className={styles.birdBox}>
          <div className={`${styles.bird} ${styles.wakeup}`}>
            <div className={styles.birdFace}></div>
          </div>
          <div className={`${styles.bird} ${styles.wakeup}`}>
            <div className={styles.birdFace}></div>
          </div>
          <div className={styles.bird}>
            <div className={styles.birdFace}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BirdButton
