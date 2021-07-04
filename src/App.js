import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import {AuthProvider} from './context/auth'
import AuthRoute from './utils/AuthRoute'
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import MenuBar from './components/MenuBar'
import SinglePost from './pages/SinglePost';
import { AuthenticationError } from 'apollo-server-errors';

function App() {
  return (
    <AuthProvider>
    <Router>
    <Container>
    <MenuBar/>
    <Route exact path ='/' component={Home} />
    <Route exact path ='/profile' component={Profile} />
    <AuthRoute exact path ='/login' component={Login} />
    <AuthRoute exact path ='/register' component={Register} />
    <Route exact path="/posts/:postId" component={SinglePost} />    
    </Container>
    </Router>
    </AuthProvider>
  );
}

export default App;
