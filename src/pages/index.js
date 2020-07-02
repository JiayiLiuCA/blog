import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import Img from 'gatsby-image'


export default function IndexPage({ data }) {
    return (
        <Layout>
            <section className="hero has-gatsby-img">
                <Img fluid={data.file.childImageSharp.fluid} />
                <Navbar />
                <div className="hero-foot has-text-centered">
                <svg viewBox="0 0 32 32" width="32" height="32">
                    <title>scroll down</title>
                    <path
                        fill="#fff"
                        d="M.045 8.443c0-.215.082-.43.246-.594.33-.33.86-.33 1.19 0L16 22.37 30.52 7.85c.33-.33.86-.33 1.19 0s.327.86 0 1.186L16.593 24.152c-.328.326-.86.326-1.188 0L.29 9.036c-.163-.163-.245-.378-.245-.593z"
                    />
                </svg>
            </div>
            </section>
            <div>Hello World</div>
        </Layout>
    )
}

export const pageQuery = graphql`
    query {
        file(relativePath: { eq: "hero.jpg"}) {
            childImageSharp {
                fluid(maxWidth: 1920) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        latestPosts: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {
                frontmatter: {
                    templateKey: {eq : "blog-post"}
                }
            }
            limit: 5
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        description
                        templateKey
                        date(formatString: "MMMM DD, YYYY")
                    }
                }
            }
        }
    }
`