import React, { useEffect, useRef } from 'react'
import Layout from '@theme/Layout'
import styles from './home.module.css'
import Welcome from '../components/welcome/welcome'
import Lottie from '../components/Lottie/Lottie'
export default function Home() {
  return (
    <Layout>
      <main className={styles.main}>
        <Welcome className={styles.content} />
        <Lottie className={styles.animation} />
      </main>
    </Layout>
  )
}
