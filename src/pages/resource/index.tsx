import React from 'react'
import Layout from '@theme/Layout'
import styles from './styles.module.scss'
import { aside } from '@site/static/dadas/resource'
function Aside() {
  return (
    <div>
      {aside.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  )
}
function Main() {
  return <div>开发中</div>
}
export default function Resource() {
  return (
    <Layout title="网站资源" description="Hello React Page">
      <div className={styles.content}>
        <Aside></Aside>
        <Main></Main>
      </div>
    </Layout>
  )
}
