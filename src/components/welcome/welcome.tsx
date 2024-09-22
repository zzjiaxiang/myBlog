import React from 'react'
import styles from './welcome.module.css'
import BirdButton from '../BirdButton/index'

interface WelcomeProps {
  className?: string
}

const Welcome: React.FC<WelcomeProps> = ({ className }) => (
  <div className={`${styles.main} ${className}`}>
    <div className={styles.textWarp}>
      <p className={styles.text}>welcome! </p> 👏
    </div>
    <BirdButton />
  </div>
)

export default Welcome
