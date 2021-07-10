import React, {useContext} from 'react';
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag';

import { Container, Grid, Icon,Label,Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard.js'
import {AuthContext} from '../context/auth'
import PostForm from '../components/PostForm'
import SignupOrLogin from '../components/SignupOrLogin'
import { FETCH_POSTS_QUERY } from '../utils/graphql'

function Home(){
    const {user} = useContext(AuthContext);
    const {
        loading, 
        data: { getPosts: posts } ={}
    } = useQuery(FETCH_POSTS_QUERY);
        
     
    const divStyle={display:'block'}
    
    return(
        <Container fluid>       
        <Grid columns={3}>
            {user &&(<Grid.Row className="page-title">
            <h1> Recent Posts</h1>
            </Grid.Row>)}
            <Grid.Row>
            {user && (
                <Grid.Column>
                <PostForm/></Grid.Column>
            )}
            {user && loading ? (
                <h1>Loading posts..</h1>
                ):(
                <Transition.Group>
                {user&&
                    posts && posts.map((post) =>(
                        <Grid.Column key={post.id} style= {{marginBottom:20}}>
                        <PostCard post ={post}/>
                        </Grid.Column>
                    ))
                }
                </Transition.Group>
            )}
            </Grid.Row>
            </Grid>
            {!user && (  <SignupOrLogin />
                )}
            </Container>   
    )
}
export default Home;