import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import logo from '../img/Atlas.jpg';
import logo2 from '../img/atlas3.png'
import { Icon,Header,Container,Segment,Grid,Button,Card,Reveal,Image } from 'semantic-ui-react'

function SignupOrLogin() {    
    const pathname=window.location.pathname;
    const path =pathname === '/' ?'home':pathname.substr(1);
    const [activeItem, setActiveItem] =useState(path)    
    const handleItemClick = (e, { name }) => setActiveItem(name)
    const divStyle={display:'inline-block',marginRight:'50',marginTop:"100"}
    return (  
        <Grid.Row>
          <Segment style={{ minHeight: 600,minWidth: 1130, }}>
          <Grid.Row className="logoClass" style={{backgroundColor: "grey",maxWidth: 1100}}>
          <Reveal animated='move left'>
          <Reveal.Content visible>
          <Container style={{
            display: 'block',   
            opacity: 1.0
           }}>
          <Segment style={{ minHeight: 600,maxWidth: 1110, }}><Image src={logo} /></Segment>
            </Container>
          </Reveal.Content>
          <Reveal.Content hidden>   
          <Container style={{minHeight:600, paddingLeft: '400px',paddingTop:'120px'}}>         
          <Image width={300} height={200} src={logo2}></Image>         
          <Header as='h1' style={{paddingLeft:'60px'}}>Let's Connect</Header>       
          <Button primary 
          style={{ paddingLeft: '25px',marginLeft:'20px' }}
          name='login'
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to='/login'><Icon inverted name='sign-in' />Login</Button>
          <Button secondary 
          style={{ paddingLeft: '25px',marginLeft:'50px' }}
          name='register'
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to='/register'><Icon inverted name='signup' />Sign Up</Button></Container>
          </Reveal.Content>
          </Reveal>
          </Grid.Row>
          </Segment>
          <Container width="120" className="footer"><Icon name="copyright"/> Copyright Swetlana 2021</Container>
          </Grid.Row>
        )
  }
export default SignupOrLogin