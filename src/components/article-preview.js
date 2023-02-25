import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Container from './container'
import Tags from './tags'
import * as styles from './article-preview.module.css'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

const ArticlePreview = ({ posts }) => {
  if (!posts) return null
  if (!Array.isArray(posts)) return null

  return (
    <>
      <Grid2 container spacing={6}>
        {posts.map((post) => {
          return (
            <Grid2 item xs={12} sm={6} md={4} key={post.slug}>
              <Link to={`/blog/${post.slug}`} className={styles.link}>
                <GatsbyImage alt="" image={post.heroImage.gatsbyImage} />
                <h2 className={styles.title}>{post.title}</h2>
              </Link>
              <div>
                {post.description?.raw && renderRichText(post.description)}
              </div>
              <div className={styles.meta}>
                <small className="meta">{post.publishDate}</small>
                <Tags tags={post.tags} />
              </div>
            </Grid2>
          )
        })}
      </Grid2>
    </>
  )
}

export default ArticlePreview
