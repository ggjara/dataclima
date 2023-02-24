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
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import TwitterIcon from '@mui/icons-material/Twitter'
import GitHubIcon from '@mui/icons-material/GitHub'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'

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
            <Grid2 item xs={0} sm={2}></Grid2>
            <Grid2 item xs={12} sm={4}>
              <GatsbyImage alt="" image={person.image.gatsbyImage} />
            </Grid2>
            <Grid2 item xs={12} sm={4}>
              <Typography variant="h4" gutterBottom>
                {person.name}
              </Typography>
              <Stack direction="row" spacing={2}>
                {person.email && (
                  <a href={`mailto:${person.email}`} target="_blank">
                    <EmailIcon />
                  </a>
                )}
                {person.phone && (
                  <a href={`tel:${person.phone}`} target="_blank">
                    <PhoneIcon />
                  </a>
                )}
                {person.twitter && (
                  <a
                    href={`https://twitter.com/${person.twitter}`}
                    target="_blank"
                  >
                    <TwitterIcon />
                  </a>
                )}
                {person.github && (
                  <a
                    href={`https://github.com/${person.github}`}
                    target="_blank"
                  >
                    <GitHubIcon />
                  </a>
                )}
              </Stack>
              <Divider
                sx={{
                  my: 2,
                }}
              />
              <Typography variant="body1" gutterBottom>
                {person.title}
                <br />
                {person.company}
                <br />
                {person.phone}
                <br />
                {person.shortBio && renderRichText(person.shortBio, options)}
              </Typography>
            </Grid2>
            <Grid2 item xs={0} sm={2}></Grid2>
          </Grid2>
        </Container>
        <Container>
          <Typography variant="h4">Posts</Typography>
          <Divider
            sx={{
              mt: 2,
            }}
          />
        </Container>
        <ArticlePreview posts={posts} />
      </Layout>
    )
  }
}

export default PersonPageTemplate

export const pageQuery = graphql`
  query PersonPage($id: String!) {
    contentfulPerson(id: { eq: $id }) {
      email
      company
      facebook
      github
      name
      phone
      twitter
      title
      id
      shortBio {
        raw
      }
      image {
        gatsbyImage(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
        resize(height: 1200, width: 1200) {
          src
        }
      }
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
