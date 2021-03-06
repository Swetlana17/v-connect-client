import { setRandomFallback } from "bcryptjs";

import React, { useContext,useState } from 'react';
import {Button, Form } from "semantic-ui-react";
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import {useForm} from '../utils/hooks'
import { PromiseProvider } from "mongoose";


import {AuthContext} from '../context/auth'
function Register(props){
    const context=useContext(AuthContext)
    const [errors, setErrors]=useState({})
    
   
   const {onChange, onSubmit, values} = useForm(registerUser,{username:'',
   email:'',
   password:'',
   confirmPassword:''})
    
    const [addUser,{loading}] = useMutation(REGISTER_USER,{
        update(_,{data:{register:userData}}){
            // console.log(result);
            context.login(userData)
            props.history.push('/');
        },
        onError(err){
            // console.log(err);
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
        },
        variables:values
    })
    
    function registerUser(){
        addUser();
    }

    return(
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading?'loading':''}>
            <h1>Register</h1>
            <Form.Input 
            label="Username"
            type="text"
            placeholder="Username.."
            name="username"
            value={values.username}
            error={errors.username ? true:false}
            onChange={onChange}/>
            
            <Form.Input 
            label="Email"
            type="email"
            placeholder="Email.."
            name="email"
            value={values.email}            
            error={errors.email ? true:false}
            onChange={onChange}/>

            <Form.Input 
            label="Password"
            type="password"
            placeholder="Password.."
            name="password"
            value={values.password}            
            error={errors.password ? true:false}
            onChange={onChange}/>

            <Form.Input 
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password.."
            name="confirmPassword"
            value={values.confirmPassword}
            error={errors.confirmPassword ? true:false}
            onChange={onChange}/>
            
            <Button type="submit" primary>Register</Button>
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
    


const REGISTER_USER =gql`
    mutation register(
        $username:String!
        $email:String!
        $password:String!
        $confirmPassword:String!
    ){
        register(
            registerInput:{
                username: $username
                email: $email
                password:$password
                confirmPassword:$confirmPassword
            }){
                id 
                email 
                username 
                createdAt 
                token
            }
    }
`

export default Register;
