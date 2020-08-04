import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const LoginFormContainer = styled.div`
display:flex;
flex-direction:column;
align-items: center;

`
const ButtonsContainer = styled.div`
display:flex;
justify-content:center;
`
const ButtonsPosition = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:220px;
`


const SignUpPage = () =>{

    return(

    <LoginFormContainer >   

       <h1>Pagina de Cadastro</h1>

       <TextField
          id="outlined-name"
          label="Name"
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-email-input"
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />


        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />

    <ButtonsContainer>
       <ButtonsPosition>

        <Link>
        <Button variant="contained" color="primary" >
        Cadastrar
       </Button>
        </Link>

      </ButtonsPosition>
     </ButtonsContainer>

    </LoginFormContainer>
    )
}

export default SignUpPage