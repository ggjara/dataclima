import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import * as styles from './hero.module.css'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import { Link } from 'gatsby'
import Typography from '@mui/material/Typography'

const HeroBlogPost = ({
  image,
  title,
  content,
  contentReady,
  author,
  rawDate,
  publishDate,
}) => (
  <>
    <div className={styles.hero}>
      {image && (
        <GatsbyImage className={styles.image} alt={title} image={image} />
      )}
      <div className={styles.details}>
        <h1 className={styles.title}>{title}</h1>
        {content && (
          <div className={styles.content}>
            {contentReady ? content : renderRichText(content)}
          </div>
        )}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            marginLeft: 'auto',
            marginRight: 'auto',
            horizontalAlign: 'center',
            '& > :not(style)': {
              m: 1,
            },
          }}
        >
          <Avatar alt={author?.name} src={author?.image.resize.src} />
          <Link to={`/people/${author?.slug}`}>
            <Typography
              sx={{
                fontStyle: 'italic',
              }}
            >
              {author?.name}
            </Typography>
          </Link>{' '}
          &middot;
          <time dateTime={rawDate}>{publishDate}</time>
        </Box>
      </div>
    </div>
  </>
)

export default HeroBlogPost
