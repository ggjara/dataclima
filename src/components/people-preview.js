import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import Grid2 from '@mui/material/Unstable_Grid2'

import Container from './container'
import Tags from './tags'
import * as styles from './people-preview.module.css'

const ArticlePreview = ({ people }) => {
  if (!people) return null
  if (!Array.isArray(people)) return null

  return (
    <Container>
      <Grid2 container spacing={6}>
        {people.map((person) => {
          return (
            <Grid2
              item
              xsOffset={1}
              xs={10}
              sm={6}
              md={4}
              lg={3}
              key={person.id}
            >
              <Link to={`/people/${person.slug}`} className={styles.link}>
                <GatsbyImage alt="" image={person.image.gatsbyImage} />
                <h2 className={styles.title}>{person.name}</h2>
              </Link>
              <div>
                {person.shortBio?.raw && renderRichText(person.shortBio)}
              </div>
              <div className={styles.meta}>
                <small className="meta">
                  {person.title}
                  {' | '}
                  {person.company}
                </small>
              </div>
            </Grid2>
          )
        })}
      </Grid2>
    </Container>
  )
}

export default ArticlePreview
