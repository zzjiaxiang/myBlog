import React from 'react';
import Lottie from "lottie-react";
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import groovyWalkAnimation from "../../static/img/x0nV1KRGDm.json";
import Layout from '@theme/Layout';
import styles from './home.module.css';

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <main className={styles.main}>
        <div className={styles.content}>
          欢迎你👏
        </div>
      < Lottie animationData={groovyWalkAnimation} loop={true} className={styles.animation}/>
      </main>
    </Layout>
  );
}
