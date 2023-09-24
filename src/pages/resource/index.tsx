import React from 'react'
import Layout from '@theme/Layout'
import styles from './styles.module.scss'
import { aside, mainData } from '@site/static/data/resource'
function Aside() {
  return (
    <div>
      {aside.map(({ name, id }) => (
        <div key={id}>{name}</div>
      ))}
    </div>
  )
}
function Main() {
  return (
    <div className={styles.main}>
      {mainData.map(({ name, resources }) => (
        <div key={name}>
          <h1>{name}</h1>
          <section>
            <div className={styles.mainContent}>
              {resources.map(({ id, describe, img, link, title }) => (
                <div className={styles.mainItems} key={id}>
                  <img src={img} alt={title}></img>
                  <div>
                    <a href={link} target="_blank">
                      {title}
                    </a>
                    <p title={describe}>{describe}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ))}
    </div>
  )
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
