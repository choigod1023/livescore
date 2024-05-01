import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from "@mui/material/Modal";
import styled from "styled-components";

import { toast, ToastContainer } from 'react-toastify';


const ModalStyles = styled.div`
&{
    background-color: white;   
    text-align: center; 
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

}
`

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp({ isOpen, closeModal }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const SignUpData = {
            lastName: data.get('lastName'),
            firstName: data.get('firstName'),
            email: data.get('email'),
            password: data.get('password'),
        };
        if (SignUpData.lastName && SignUpData.firstName && SignUpData.email && SignUpData.password) {
            toast.success(`회원가입 성공!`);
            closeModal();
        }
        else {
            toast.error("회원가입 정보를 재확인하세요!");
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
        >
            <ModalStyles injectFirst>

                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="성"
                                            name="lastName"
                                            autoComplete="family-name"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="given-name"
                                            name="firstName"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="이름"
                                            autoFocus
                                        />

                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="이메일 주소"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="비밀번호"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    회원가입
                                </Button>
                            </Box>
                        </Box>
                        <Copyright sx={{ mt: 5 }} />
                    </Container>
                </ThemeProvider>

            </ModalStyles>

        </Modal>
    );
}