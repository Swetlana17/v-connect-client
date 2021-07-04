import React,{useEffect,useState} from 'react'
import { Container,Popup, Image,Grid,Transition ,Button, Header, Icon, Modal } from 'semantic-ui-react'

import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'

function LikePopup({user, post:{id,likeCount,likes}}) {
  const [open, setOpen] = React.useState(false)
  useEffect(() => {
    if(user && likes.find(like =>like.username === user.username)){
       console.log("popup",likes)
    }
    
}, [user,likes]);

  return (
    <Modal
      basic
      open={open}
      trigger={<Button color='black' style={{paddingRight:10}}><Popup content='View who Liked this post' trigger={<Icon name="users"></Icon>} /></Button>}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='heart' content='Who Liked This Post?' />
      <Modal.Content>
        <Grid>
        {user &&(<Grid.Row className="page-title">
            </Grid.Row>)}
            <Container>
            {user && (
                <Transition.Group>
                {user&&
                    likes && likes.map((like) =>(
                        <Grid.Row key={like.id} style= {{marginBottom:20}}>
                        <Image
          floated="left"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
                        {like.username}
                        </Grid.Row>
                    ))
                }
                </Transition.Group>
            )}
            </Container>
</Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='close' /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default LikePopup