  
import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image,Popup } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {AuthContext} from '../context/auth';
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton';

function PostCard({
    post: { body, createdAt, id, username, likeCount, commentCount, likes }
  }) {
const {user} =useContext(AuthContext);


   
   function deletePost(){
    console.log('Comment Post!!')
}
   function commentPost(){
       console.log('Comment Post!!')
   }
return(
    <Card fluid>
    <Card.Content >
    <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
    <Card.Header>{username}</Card.Header>
    <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
    <Card.Description>{body}</Card.Description>
    </Card.Content>
    <Card.Content extra>
    <LikeButton user={user} post={{id,likes,likeCount}} />
    <Popup content='Add Comments' trigger={<Button labelPosition='right' onClick={commentPost}>
    <Button as={Link} to={`/posts/${id}`} basic color='blue'>
      <Icon name='comments' />
      
    </Button>
    <Label as='a' basic color='teal' pointing='left' style={{padding:10}}>
      {commentCount}
    </Label>
  </Button>}/>
    
    {user && user.username ===username && <DeleteButton postId={id} />}   </Card.Content>
  </Card>
);
}
export default PostCard;
