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
        {/*         {content && (
          <div className={styles.content}>
            {contentReady ? content : renderRichText(content)}
          </div>
        )} */}
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
          <Avatar
            alt={author?.name}
            sx={{ width: 30, height: 30 }}
            src={author?.image.resize.src}
          />

          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: 'var(--primary)',
              ':hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {' '}
            <Link to={`/people/${author?.slug}`}>{author?.name}</Link>
          </Typography>
          <Typography sx={{ fontSize: 14 }}>|</Typography>
          <Typography sx={{ fontSize: 14 }}>
            <time dateTime={rawDate}>{publishDate}</time>
          </Typography>
        </Box>
      </div>
    </div>
  </>
)

export default HeroBlogPost
