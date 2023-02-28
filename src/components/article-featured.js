import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import Container from './container'
import Tags from './tags'
import * as styles from './article-preview.module.css'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { margin } from '@mui/system'
import { FormatAlignJustify } from '@mui/icons-material'

const ArticleFeatured = ({ post }) => {
  if (!post) return null
  return (
    <>
      <Grid2 container spacing={6}>
        <Grid2 item xs={12} sm={6} md={6} key={post.slug}>
          <Link to={`/blog/${post.slug}`} className={styles.link}>
            <GatsbyImage alt="" image={post.heroImage.gatsbyImage} />
          </Link>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={6} key={post.slug}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
            }}
          >
            <Link to={`/blog/${post.slug}`} className={styles.link}>
              <h2 className={styles.title}>{post.title}</h2>
            </Link>
            <div>
              {post.description?.raw && renderRichText(post.description)}
            </div>
            <Box
              sx={{
                marginTop: 'auto',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                {' '}
                <small>{post.publishDate}</small>
              </Box>
              <Box sx={{ marginLeft: 'auto' }}>
                <Tags tags={post.tags} />
              </Box>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </>
  )
}

export default ArticleFeatured
