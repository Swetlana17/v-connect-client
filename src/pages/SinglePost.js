import React,{useContext} from 'react'
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import moment from 'moment';
import { Button,Popup,Card,Grid,Image,Icon,Label,Transition } from 'semantic-ui-react';

import {AuthContext} from '../context/auth'
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import CreateComment from '../components/CreateComment';
import LikePopup from '../components/LikePopup';

function SinglePost(props){
    const postId=props.match.params.postId;
    const {user} = useContext(AuthContext);
    const {
        loading, 
        data: { getPost } ={}
    } =  useQuery(FETCH_POST_QUERY,{
        variables: {
            postId
        }
    });
    let postMarkup;
    if(!getPost)
    {
        postMarkup= <p> Loading Post . . </p>;
    }
    else {
        const {id,body,createdAt,username,likeCount,likes,commentCount,comments}=getPost;
        postMarkup=(
            <Grid>
            <Grid.Row>
            <Grid.Column>
            <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
            </Grid.Column>
            <Grid.Column width={10}>
            <Card fluid>
            <Card.Content>
            <Card.Header>{username}</Card.Header>
            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
            <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr/>
            <Card.Content extra>
            <LikePopup user={user} post={{id,username, likeCount, likes}}/>
            <LikeButton user={user} post={{id,username, likeCount, likes}}/>
            <Popup content='Add Comments' trigger={<Button as="div" labelPosition="right"
            onClick={()=> console.log("comment")}>
            <Button basic color="blue">
            <Icon name = "comments"/></Button>
            <Label basic color="blue" pointing = "left">{commentCount}</Label>
            </Button>} />        
            
            {user && user.username === username && (
                <DeleteButton postId={id}/>
            )}
            </Card.Content>
            </Card>
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column width="10">
            {user &&          
            <CreateComment postId={id}/> 
            }
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            
            {loading ? (
                <h1>Loading posts..</h1>
                ):(
                <Transition.Group>
                {
                    comments && comments.map((comment) =>(
                        <Grid.Column key={comment.id} style= {{marginLeft:70}} width="10">
                        <Card fluid style= {{marginBottom:10}}>
                        <Card.Content>
                        {user && user.username === comment.username &&(
                            <DeleteButton postId={id} commentId={comment.id} />
                        )}
                        <Card.Header>{comment.username}</Card.Header>
                        <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                        <Card.Description>{comment.body}</Card.Description>
                        </Card.Content>
                        </Card>
                        </Grid.Column>
                    ))
                }
                </Transition.Group>
            )}
            </Grid.Row>
            </Grid>
        )
    }
    return postMarkup;
}

const FETCH_POST_QUERY = gql`
    query($postId: ID!){
        getPost(postId:$postId){
            id
            body
            createdAt
            username
            likeCount
            likes{
                username
            }
            commentCount
            comments{
                id
                username
                createdAt
                body
            }
        }
    }
`

export default SinglePost