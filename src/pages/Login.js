import { setRandomFallback } from "bcryptjs";

import React, { useContext,useState } from 'react';
import {Button, Form } from "semantic-ui-react";
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useForm} from '../utils/hooks'
import { PromiseProvider } from "mongoose";

import {AuthContext} from '../context/auth'

function Login(props){
const context=useContext(AuthContext)
    const [errors, setErrors]=useState({})
    
   const {onChange, onSubmit, values} = useForm(loginUserCallback,{username:'',
   password:''});
    
   const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      context.login(userData);
      console.log(context)
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });
    function loginUserCallback(){
        loginUser();
    }

    return(
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading?'loading':''}>
            <h1>Login</h1>
            <Form.Input 
            label="Username"
            type="text"
            placeholder="Username.."
            name="username"
            value={values.username}
            error={errors.username ? true:false}
            onChange={onChange}/>           

            <Form.Input 
            label="Password"
            type="password"
            placeholder="Password.."
            name="password"
            value={values.password}            
            error={errors.password ? true:false}
            onChange={onChange}/>

            
            
            <Button type="submit" primary>Login</Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                <ul className="list">
                {
                    Object.values(errors).map((value)=>(
                        <li key ={value}>{value}</li>
                    ))}
                    </ul>
                    </div>
            )}      
        </div>
    );
}
    


const LOGIN_USER =gql`
    mutation login(
        $username:String!,
        $password:String!
    ){
        login(
                username: $username,
                password: $password
            ){
                id 
                email 
                username 
                createdAt 
                token
            }
    }
`;

export default Login;
