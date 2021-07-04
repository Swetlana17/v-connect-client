import React,{useRef, useState} from 'react';
import { Button, Feed, Form } from 'semantic-ui-react';
import { Card, Grid, Icon,Label,Transition } from 'semantic-ui-react'
import { GridColumn } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks';
import gql from 'graphql-tag';



function CreateComment({postId}){
    const { values, onChange, onSubmit } = useForm(createCommentCallback,{
        body: ''
      });
    const [comment,setComment] =useState('');    
    const CommentInputRef=useRef(null)
    const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
        update() {
            setComment('');
            CommentInputRef.current.blur();
        },
        variables:{
            postId,
            body:comment
        }
        
      }); 
      
  function createCommentCallback() {
    submitComment();
  }  
return (
<>
      <Form onSubmit={onSubmit}>
        <h3>Post a Comment..</h3>
        <Form.Field>
          <Form.Input
            placeholder="Start Commenting..!"
            name="comment"
            onChange={(event) => setComment(event.target.value)}
            value={comment}
          />
          <Button type="submit" disabled={comment.trim() === ''} color="blue" onClick="submitComment" ref={CommentInputRef}>
            Comment
          </Button>
        </Form.Field>
      </Form>
      </>

  );


}
const CREATE_COMMENT_MUTATION=gql`
    mutation($postId:ID!,$body:String!){
        createComment(postId:$postId,body:$body){
            id
            comments{
            id
            username
            createdAt
            body
            }
            commentCount
        }
    }

`
export default CreateComment;