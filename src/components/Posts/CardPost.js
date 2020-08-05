import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit"

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const PostContainer = styled.div`
  border: 1px solid gray;
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
  width: 340px;
  cursor: pointer;
`
const PostSecondaryContainer = styled.div`
  cursor: pointer;
`
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`

const CardPost = () => {
  const history = useHistory();
  const [postList, setPostList] = useState([])

  useEffect(() => {
    const token = window.localStorage.getItem("token")

    if (token === null) {
      history.push("/")
    } else {
      getPosts()
    }
  }, [history])

  const getPosts = () => {
    const token = window.localStorage.getItem("token")
  
    axios.get(`${baseUrl}/posts`, {
      headers: {
        Authorization: token
      }
    }).then(response => {
      setPostList(response.data.posts)
    }).catch(err => {
      console.log(err.message)
    })
  }

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
            {postList.map((post) => {
                        return <PostContainer key={post.id}>
                          <PostSecondaryContainer onClick={() => goToPostDetailsPage(post.id)}>
                            <p>{post.username}</p>
                            <p>{post.title}</p>
                            <p>{post.text}</p>
                          </PostSecondaryContainer>
                          <ButtonsContainer>
                            <button onClick={() => voteNegative(post)}>⬇</button>
                            <p>{post.votesCount}</p>
                            <button onClick={() => votePositive(post)}>⬆</button>
                            <p onClick={() => goToPostDetailsPage(post.id)}>{post.commentsCount} comentarios</p>
                          </ButtonsContainer>
                        </PostContainer>
                    })}     
        </CardContainer>
    )
}

export default CardPost