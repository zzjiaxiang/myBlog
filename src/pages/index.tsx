import React from 'react'
import Lottie from 'lottie-react'
import groovyWalkAnimation from '../../static/img/x0nV1KRGDm.json'
import Layout from '@theme/Layout'
import styles from './home.module.css'
import Welcome from '../components/welcome/welcome'
export default function Home() {
  return (
    <Layout>
      <main className={styles.main}>
        <Welcome className={styles.content} />
        <Lottie
          animationData={groovyWalkAnimation}
          loop={true}
          className={styles.animation}
        />
      </main>
    </Layout>
  )
}
