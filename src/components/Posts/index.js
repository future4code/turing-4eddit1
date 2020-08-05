import React, { useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import styled from 'styled-components'
import CardPost from './CardPost'
import { useHistory } from "react-router-dom";
import useForm from '../../hooks/useForm'
import axios from 'axios'

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
`
const MainContainer = styled.div`
    display: flex;
    justify-content: center;
`

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labEddit"

const Post = () =>{
    const history = useHistory();
    const { form, onChange, resetForm } = useForm({
    title: "",
    text: ""
  });

  useEffect(() => {
    const token = window.localStorage.getItem("token")

    if (token === null) {
      history.push("/")
    } else {
    }
  }, [history])

  const handleCreatePost = (e) => {
    e.preventDefault()
    const token = window.localStorage.getItem("token")
    const body = {
        title: form.title,
        text: form.text
    }
    const axiosConfig = {
      headers: {
        Authorization: token
      }  
    }

    axios.post(`${baseUrl}/posts`, body, axiosConfig)
    .then(() => {
    resetForm()
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

        <MainContainer>
            <PostContainer>
                <Typography variant={'h2'} gutterBottom>LabEddit</Typography>
                <form onSubmit={handleCreatePost}>
                    <TextField
                    id="outlined-textarea"
                    label="Titulo do seu post"
                    multiline rows={1}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="title"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleInputChange}
                    />
                    <TextField
                    id="outlined-textarea"
                    label="O que você está pensando?"
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
                        Postar
                    </Button>
                </form>
                <CardPost />
            </PostContainer>            
        </MainContainer>
    )
}

export default Post