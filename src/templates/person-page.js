import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import ArticlePreview from '../components/article-preview'
import Layout from '../components/layout'
import Button from '@mui/material/Button'
import Grid2 from '@mui/material/Unstable_Grid2'
import Paper from '@mui/material/Paper'
import Container from '../components/container'

class PersonPageTemplate extends React.Component {
  render() {
    const person = get(this.props, 'data.contentfulPerson')
    const posts = get(this.props, 'data.allContentfulBlogPost.nodes')

    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          const { gatsbyImage, description } = node.data.target
          return <GatsbyImage image={getImage(gatsbyImage)} alt={description} />
        },
      },
    }

    return (
      <Layout location={this.props.location}>
        <Container>
          <Grid2 container spacing={2}>
            <Grid2 xs={12} md={6}>
              <Paper>{person.name}</Paper>
            </Grid2>
            <Grid2 xs={12} md={6}>
              <Paper>IMAGE</Paper>
            </Grid2>
          </Grid2>
        </Container>
        <Button variant="contained">Hello World</Button>
        <ArticlePreview posts={posts} />
      </Layout>
    )
  }
}

export default PersonPageTemplate

export const pageQuery = graphql`
  query PersonPage($id: String!) {
    contentfulPerson(id: { eq: $id }) {
      name
      id
    }
    allContentfulBlogPost(filter: { author: { id: { eq: $id } } }) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        tags
        heroImage {
          gatsbyImage(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 212
          )
        }
        description {
          raw
        }
      }
    }
  }
`
