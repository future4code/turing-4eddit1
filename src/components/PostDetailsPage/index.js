import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import useForm from '../../hooks/useForm';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit"


const PostDetailPage = () =>{
    const history = useHistory();
    const params = useParams();
    const [postDetailList, setPostDetailList] = useState([])
    const [postDetail, setPostDetail] = useState([])
    const { form, onChange } = useForm({
    text: ""
  });
  
    useEffect(() => {
      const token = window.localStorage.getItem("token")
  
      if (token === null) {
        history.push("/")
      } else {
        getPostDetail()
      }
    }, [history])
  
    const getPostDetail = () => {
      const token = window.localStorage.getItem("token")
    
      axios.get(`${baseUrl}/posts/${params.postId}`, {
        headers: {
            Authorization: token
        }
      }).then(response => {
        setPostDetailList(response.data.post.comments)
        setPostDetail(response.data.post)
      }).catch(err => {
        console.log(err.message)
      })
    }  
    
    const handleCreateComment = (e) => {
        e.preventDefault()
        const token = window.localStorage.getItem("token")
        const body = {
            text: form.text
        }
        const axiosConfig = {
          headers: {
            Authorization: token
          }  
        }
    
        axios.post(`${baseUrl}/posts/${params.postId}/comment`, body, axiosConfig)
        .then(() => {
            getPostDetail()
        })
        .catch((err) => {
          console.log(err.message)
        })
      }

      const handleInputChange = event => {
      const { name, value } = event.target;
  
      onChange(name, value);
    };

    return(

        <div >
        <h4>{postDetail.username}</h4>
        <h4>{postDetail.text}</h4>
            <form onSubmit={handleCreateComment}>
                <TextField
                id="outlined-textarea"
                label="Adicionar comentario"
                multiline rows={4}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="text"
                id="text"
                name="text"
                value={form.text}
                onChange={handleInputChange}
                />
                <Button
                variant="contained"
                color="primary"
                type="submit">
                Comentar
                </Button>
            </form>
        {postDetailList && postDetailList.map((detail) => {
                                return <div key={detail.id}>
                                <p>{detail.username}</p>
                                <p>{detail.text}</p>
                                </div>
                    })}
        </div>
    )
}

export default PostDetailPage