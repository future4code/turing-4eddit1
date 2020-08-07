import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import useForm from '../../hooks/useForm';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const baseUrl = `https://us-central1-labenu-apis.cloudfunctions.net/labEddit`

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 16px;
`
const CommentContainer = styled.div`
  width: 360px;
  padding: 16px;
  margin: 8px;
  background-color: lightgray;
`
const LogoutButton = styled(Button)`
  position: relative;
  right: -30vw;
  top: -1vh;
`
const CardMainComment = styled(Paper)`
  width: 360px;
  padding: 16px;
  margin: 8px;
  background-color: lightgray;
`
const Username = styled(Typography)`
  font-weight: bold;
  border-bottom: 1px solid gray;
`
const Text = styled(Typography)`
  margin-top: 8px;
`
const FooterCard = styled.div`
  position: relative;
  bottom: -16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid gray;
  width: 100%;
  padding: 4px;
`
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const LikeButton = styled.button`
  border: none;
  cursor: pointer;
  outline: none;
  background-color: lightgray;
`
const VotesCount = styled(Typography)`
  font-weight: bold;
`
const CommentsCount = styled(Typography)`
  font-weight: bold;
`

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
  
      const votePositive = (postDetail, detail) => {
        const token = window.localStorage.getItem("token")
        
        const axiosConfig = {
            headers: {
              Authorization: token
            }
          }
        
        if (detail.userVoteDirection === 0) {
          const body = {
          direction: 1
        }    
          axios.put(`${baseUrl}/posts/${postDetail.id}/comment/${detail.id}/vote`, body, axiosConfig)
          .then((response) => {
            getPostDetail()
            })
          } else {
            const body = {
            direction: 0
          }
         axios.put(`${baseUrl}/posts/${postDetail.id}/comment/${detail.id}/vote`, body, axiosConfig)
        .then((response) => {
          getPostDetail()
            })
      }
      
      }
      
      const voteNegative = (postDetail, detail) => {
        const token = window.localStorage.getItem("token")
        
        const axiosConfig = {
            headers: {
              Authorization: token
            }
          }
        
        if (detail.userVoteDirection === 0) {
          const body = {
          direction: -1
        }
        axios.put(`${baseUrl}/posts/${postDetail.id}/comment/${detail.id}/vote`, body, axiosConfig)
          .then((response) => {
            getPostDetail()
            })
          } else {
            const body = {
            direction: 0
          }
         axios.put(`${baseUrl}/posts/${postDetail.id}/comment/${detail.id}/vote`, body, axiosConfig)
         .then((response) => {
          getPostDetail()
          })
      }
      
      }

      const handleInputChange = event => {
      const { name, value } = event.target;
  
      onChange(name, value);
    };

    const handleLogout = () => {
      window.localStorage.clear();
      history.push("/");
    };

    return(

        <CardContainer>
        <LogoutButton variant="contained" color="secondary" onClick={handleLogout}>Logout</LogoutButton>
        <Typography variant={'h2'} gutterBottom>LabEddit</Typography>
        <CardMainComment>
          <Username variant="h4" >{postDetail.username}</Username>
          <Text variant="p" >{postDetail.text}</Text>
          <FooterCard>
            <CommentsCount variant="p" >Comentários: {postDetail.commentsCount}</CommentsCount>
            <VotesCount variant="p" >Votos: {postDetail.votesCount}</VotesCount>
          </FooterCard>
        </CardMainComment>
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
                                return <CommentContainer key={detail.id}>
                                          <Typography variant="h6" component="h1">{detail.username}</Typography>
                                          <Typography component="p">{detail.text}</Typography>
                                        <FooterCard>
                                          <ButtonsContainer>
                                            <LikeButton onClick={() => votePositive(postDetail, detail)}>{detail.userVoteDirection === 1 ? <ArrowUpwardIcon color="primary"/> : <ArrowUpwardIcon />}</LikeButton>
                                            <VotesCount component="p">{detail.votesCount}</VotesCount>
                                            <LikeButton onClick={() => voteNegative(postDetail, detail)}>{detail.userVoteDirection === -1 ? <ArrowDownwardIcon color="secondary"/> : <ArrowDownwardIcon />}</LikeButton>
                                          </ButtonsContainer>
                                        </FooterCard>
                                      </CommentContainer>
                    })}
        </CardContainer>
    )
}

export default PostDetailPage