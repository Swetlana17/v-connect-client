import React,{useContext} from 'react'
import {AuthContext} from '../context/auth'
import { Image,Grid,Button,Form, Icon, Card, Menu, Segment, Sidebar } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

function Profile(){
    const {user} = useContext(AuthContext);
    const [visible, setVisible] = React.useState(true)
    let postMarkup;
   if(user){
    postMarkup=(  
        <Grid>        
                <Grid.Column style={{minHeight:500}}>
                  <Sidebar.Pushable as={Segment} onClick={() => setVisible(!visible)}>
                    <Sidebar
                      as={Menu}
                      animation='overlay'
                      icon='labeled'
                      inverted                      
                      onHide={() => setVisible(false)}
                      vertical
                      visible={visible}
                      width='thin'
                      color='teal'
                      
                    >
                      <Menu.Item as={Link} to='/'>
                        <Icon name='home' />
                        Home
                      </Menu.Item>
                      <Menu.Item as='a' to="#profilePic">
                        <Icon name='user' />
                        Profile
                      </Menu.Item>
                      <Menu.Item as='a'>
                        <Icon name='lock' />
                        Password Reset
                      </Menu.Item>
                      <Menu.Item as='a'>
                        <Icon name='globe' />
                        About
                      </Menu.Item>
                    </Sidebar>
          
                    <Sidebar.Pusher>
                      <Segment basic id="profilePic">                        
                        <Card fluid centered style={{marginTop:50,maxWidth:600,minHeight:250}}>
                        <Card.Content>
                          <Image
                            floated='right'
                            size='mini'
                            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                          />
                          <Card.Header>{user.username.toUpperCase()}</Card.Header>
                          <Card.Meta>{user.email}</Card.Meta>
                          <Card.Description>
                            Do you want to change your <strong>Email Id?</strong>
                          </Card.Description>
                        </Card.Content>
                        <Form style={{paddingLeft:10,paddingBottom:50,maxWidth:400}}><Form.Input placeholder="Enter your Email Id"></Form.Input></Form>
                        <Card.Content extra>
                          <div className='ui two buttons'>
                            <Button basic color='green'>
                              Change
                            </Button>
                            <Button basic color='red'>
                              Cancel
                            </Button>
                          </div>
                        </Card.Content>
                      </Card>
                        </Segment>
                    </Sidebar.Pusher>
                  </Sidebar.Pushable>
                </Grid.Column>
              </Grid>
  )
}
  else{
    postMarkup=(
        <Grid><Grid.Row>Session Expired... Click to Login again..</Grid.Row><Grid.Row><Button primary as={Link} to="/login">Login</Button></Grid.Row></Grid>
    )
}
return postMarkup;
}

export default Profile