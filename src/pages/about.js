import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import PeoplePreview from '../components/people-preview'

class BlogIndex extends React.Component {
  render() {
    const people = get(this, 'props.data.allContentfulPerson.nodes')

    return (
      <Layout location={this.props.location}>
        <Seo title="People" />
        <Hero title="People" />
        <PeoplePreview people={people} />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulPerson {
      nodes {
        name
        company
        email
        slug
        id
        github
        facebook
        twitter
        phone
        image {
          gatsbyImage(
            layout: FULL_WIDTH
            placeholder: BLURRED
            width: 424
            height: 424
          )
        }
      }
    }
  }
`
