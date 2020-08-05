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
`

const CardPost = () =>{
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

    return(

        <CardContainer>
            {postList.map((post) => {
                        return <PostContainer key={post.id}>
                        <p>{post.username}</p>
                        <p>{post.title}</p>
                        <p>{post.text}</p>
                        <button>⬇</button><p>{post.votesCount}</p><button>⬆</button>
                        <p>{post.commentsCount} comentarios</p>
                        <button onClick={() => goToPostDetailsPage(post.id)}>Comentarios</button>
                        </PostContainer>
                    })}     
        </CardContainer>
    )
}

export default CardPost