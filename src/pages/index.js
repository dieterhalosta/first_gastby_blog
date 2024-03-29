import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Title = styled.h1`
  display: inline-block;
`
const BlogTitle = styled.h3`
  margin-bottom: 20px;
  color: blue;
`
const BlogLink = styled(Link)`
  text-decoration: none;
`
const BlogBody = styled.div`
  margin-bottom: 50px;
`

export default ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div>
      <Title>Dieter's Mind</Title>
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <BlogBody key={node.id}>
          <BlogLink to={node.fields.slug}>
            <BlogTitle>
              {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
            </BlogTitle>
          </BlogLink>
          <p>{node.excerpt}</p>
        </BlogBody>
      ))}
    </div>
  </Layout>
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
          }
          fields {
            slug
          }
          excerpt(truncate: true)
        }
      }
    }
  }
`
