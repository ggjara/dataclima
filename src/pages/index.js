import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Container from '../components/container'
import Box from '@mui/material/Box'
import ArticleFeatured from '../components/article-featured'

class RootIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.nodes')
    const [pageHeader] = get(this, 'props.data.allContentfulPageHeader.nodes')

    return (
      <Layout location={this.props.location}>
        <Hero
          image={pageHeader.image.gatsbyImage}
          title={pageHeader.title}
          content={pageHeader.subtitle}
          contentReady={true}
        />
        <Box
          sx={{
            mt: 10,
          }}
        >
          <Container>
            <Typography variant="h4">Articles</Typography>
            <Divider
              sx={{
                mt: 2,
                mb: 6,
              }}
            />
            <ArticleFeatured post={posts[0]} />
            <ArticlePreview posts={posts.slice(1)} />
          </Container>
        </Box>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(
      filter: { slug: { nin: "dummy-content" } }
      sort: { publishDate: DESC }
    ) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM D, YYYY")
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
    allContentfulPageHeader {
      nodes {
        id
        title
        subtitle
        image {
          gatsbyImage(layout: CONSTRAINED, placeholder: BLURRED, width: 1180)
        }
      }
    }
  }
`
