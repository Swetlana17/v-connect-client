import React,{useContext,useState} from 'react';
import gql from 'graphql-tag'
import { useMutation } from '@apollo/client';
import { AuthContext } from '../context/auth';
import{Button,Popup,Confirm, Icon} from 'semantic-ui-react'

import {FETCH_POSTS_QUERY} from '../utils/graphql';

function DeleteButton({postId,commentId,callback}){

    const [confirmOpen,setConfirmOpen] =useState(false);
    const mutation=commentId?DELETE_COMMENT_MUTATION:DELETE_POST_MUTATION
    const [deletePostOrMutation]=useMutation(mutation,{
        update(proxy) {
            setConfirmOpen(false);
            if (!commentId) {
              const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
              });
            //   data.getPosts = data.getPosts.filter((p) => p.id !== postId);
              proxy.writeQuery({ query: FETCH_POSTS_QUERY, data:{getPosts:data.getPosts.filter((p) => p.id !== postId)} });
            }
            if (callback) callback();
          },
          variables: {
            postId,
            commentId
          }
    })    
    return(
        <>
        <Popup content={(!commentId)?'Delete this Post?':'Delete this Comment?'} trigger={<Button as='div' floated="right" color='red' onClick={()=> setConfirmOpen(true)}>
     
        <i style ={{margin:0}} class="trash alternate icon" ></i>
        </Button>} />
      
      <Confirm open={confirmOpen}
      onCancel={()=>setConfirmOpen(false)}
    onConfirm= {deletePostOrMutation} />
    </>
    )

}

const DELETE_POST_MUTATION=gql`
    mutation deletePost($postId:ID!){
        deletePost(postId:$postId)
    }

`
const DELETE_COMMENT_MUTATION=gql`
    mutation deleteComment($postId:ID!,$commentId:ID!){
        deleteComment(postId:$postId,commentId:$commentId){
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
export default DeleteButton