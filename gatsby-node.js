const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve('./src/templates/blog-post.js')
  const personPage = path.resolve('./src/templates/person-page.js')

  const result = await graphql(
    `
      {
        allContentfulBlogPost(sort: { publishDate: DESC }) {
          nodes {
            title
            slug
          }
        }
        allContentfulPerson {
          nodes {
            name
            id
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulBlogPost.nodes
  const persons = result.data.allContentfulPerson.nodes

  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const nextPostSlug = index === 0 ? null : posts[index - 1].slug
      const previousPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].slug

      createPage({
        path: `/blog/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }

  // Create people
  // But only if there's at least one person found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (persons.length > 0) {
    persons.forEach((person, index) => {
      createPage({
        path: `/people/${person.id}/`,
        component: personPage,
        context: {
          id: person.id,
        },
      })
    })
  }
}
