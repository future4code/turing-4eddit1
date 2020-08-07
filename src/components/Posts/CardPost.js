import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Typography, CssBaseline, Paper } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import useGetPosts from '../../hooks/useGetPosts'

const baseUrl = `https://us-central1-labenu-apis.cloudfunctions.net/labEddit`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const FooterCard = styled.div`
  position: relative;
  bottom: -16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid gray;
  width: 100%;
`
const PostContainer = styled(Paper)`
  width: 360px;
  padding: 16px;
  margin: 8px;
  background-color: lightgray;
`
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const CommentsCountContainer = styled.div`
  cursor: pointer;
`
const LikeButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  background-color: lightgray;
`
const Username = styled(Typography)`
  font-weight: bold;
  margin-bottom: 16px;
`
const Title = styled(Typography)`
  font-weight: bold;
  margin-bottom: 8px;
  color: #3E50B4;
  text-align: center;
  border-bottom: 1px solid gray;
  cursor: pointer;
`
const Text = styled(Typography)`
  font-weight: bold;
  cursor: pointer;
`
const CommentsCount = styled(Typography)`
  font-weight: bold;
`
const VotesCount = styled(Typography)`
  font-weight: bold;
`

const CardPost = (props) => {
  const history = useHistory();

  const [postList, getPosts] = useGetPosts(
    `${baseUrl}/posts`, [], 'posts' 
  )

  const goToPostDetailsPage = (postId) => {
    history.push(`/posts/${postId}`);
  };
  
  const votePositive = (post) => {
    const token = window.localStorage.getItem("token")
    
    const axiosConfig = {
        headers: {
          Authorization: token
        }
      }
    
    if (post.userVoteDirection === 0) {
      const body = {
      direction: 1
    }
      axios.put(`${baseUrl}/posts/${post.id}/vote`, body, axiosConfig)
      .then((response) => {
        getPosts()
        })
      } else {
        const body = {
        direction: 0
      }
    axios.put(`${baseUrl}/posts/${post.id}/vote`, body, axiosConfig)
    .then((response) => {
        getPosts()
        })
  }
  
  }
  
  const voteNegative = (post) => {
    const token = window.localStorage.getItem("token")
    
    const axiosConfig = {
        headers: {
          Authorization: token
        }
      }
    
    if (post.userVoteDirection === 0) {
      const body = {
      direction: -1
    }
      axios.put(`${baseUrl}/posts/${post.id}/vote`, body, axiosConfig)
      .then((response) => {
        getPosts()
        })
      } else {
        const body = {
        direction: 0
      }
    axios.put(`${baseUrl}/posts/${post.id}/vote`, body, axiosConfig)
    .then((response) => {
      getPosts()
      })
  }
  
  }

    return(

        <CardContainer>
          <CssBaseline/>
            {postList && postList.map((post) => {
                        return <PostContainer key={post.id}>
                                <Username variant="h5">{post.username}</Username>
                                <Title variant="h6" onClick={() => goToPostDetailsPage(post.id)}>{post.title}</Title>
                                <Text component="p" onClick={() => goToPostDetailsPage(post.id)}>{post.text}</Text>
                                <FooterCard>
                                  <ButtonsContainer>
                                    <LikeButton onClick={() => votePositive(post)}>{post.userVoteDirection === 1 ? <ArrowUpwardIcon color="primary"/> : <ArrowUpwardIcon />}</LikeButton>
                                    <VotesCount component="p">{post.votesCount}</VotesCount>
                                    <LikeButton onClick={() => voteNegative(post)}>{post.userVoteDirection === -1 ? <ArrowDownwardIcon color="secondary"/> : <ArrowDownwardIcon />}</LikeButton>
                                  </ButtonsContainer>
                                  <CommentsCountContainer onClick={() => goToPostDetailsPage(post.id)}>
                                    <CommentsCount component="p">{post.commentsCount} comentarios</CommentsCount>
                                  </CommentsCountContainer>
                                </FooterCard>
                              </PostContainer>
                    })}     
        </CardContainer>
    )
}

export default CardPost