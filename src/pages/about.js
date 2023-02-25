import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import PeoplePreview from '../components/people-preview'
import Container from '../components/container'

class About extends React.Component {
  render() {
    const people = get(this, 'props.data.allContentfulPerson.nodes')

    return (
      <Layout location={this.props.location}>
        <Seo title="People" />
        <Hero title="People" />
        <Container>
          <PeoplePreview people={people} />
        </Container>
      </Layout>
    )
  }
}

export default About

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulPerson {
      nodes {
        name
        company
        title
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
