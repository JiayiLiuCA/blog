import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import PostList from '../components/PostList'

const ArchivesPage = ({ data: { posts }, location }) => {
    const [searchText, setSearchText] = useState(location.state ? location.state.searchText : '')

    //useEffect will check if location prop is changed, therefore no infinite loop
    //searchText will always be updated to location state when location changes
    //Changing searchText will not affect location state therefore useEffect() won't be called

    useEffect(() => { //location changes
        //location state is undefined in building stage, add condition to avoid error
        if (location.state && location.state.searchText !== searchText) { 
            setSearchText(location.state.searchText || '')
        }
    }, [location])
    
    return (
        <Layout title="Archives | J's Blog" description="Archives Page of this Blog">
            <Navbar />
            <section className='section'>
                <div className='container'>
                    <div className='field'>
                        <div className='control is-large'>
                            <input
                                className='input is-large'
                                type='text'
                                value={searchText || ''}
                                onChange={e =>
                                    setSearchText(e.currentTarget.value)
                                }
                                placeholder="Prefix '#' to search in tags"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <PostList searchText={searchText} posts={posts} />
        </Layout>
    )
}

export default ArchivesPage

export const archivesPageQuery = graphql`
    query ArchivesQuery {
        posts: allMarkdownRemark(
            sort: { fields: [frontmatter___date], order: DESC }
            filter: {
                frontmatter: { templateKey: { eq: "blog-post" } }
            }
        ) {
            edges {
                node {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        description
                        tags
                    }
                }
            }
        }
    }
    `
