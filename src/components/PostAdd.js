import React, { useState, useEffect } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { createPost, getPostById, updatePost } from '../redux/actions/posts';

export default function PostAdd(props) {
    const navigate = useNavigate();
    const { state } = props;
    const { postId } = useParams();
    const dispatch = useDispatch();

    const { post, update } = useSelector((state)=> state.posts);
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postUserID, setPostUserID] = useState('');
    const [msgOpen, setMsgOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(()=>{
        if(postId) {
            dispatch(getPostById(postId));
        }
    }, [postId]);

    useEffect(()=>{
        if(update) {
            setTimeout(() => {    
                navigate('/posts');
            }, 3000);
            setMessage('Success to '+state+' Post.');
            setMsgOpen(true);
        }
    }, [update]);

    useEffect(()=>{
        if(post&&postId) {
            setPostTitle(post.title);
            setPostContent(post.body);
            setPostUserID(post.userId);
        } else {            
            setPostTitle('');
            setPostContent('');
            setPostUserID('');
        }
    }, [post])

    const handleSaveButton = () =>{
        if(postTitle === '') {
            setMessage('Please fill the title.');
            setMsgOpen(true);
            return;
        }
        if(postContent === '') {
            setMessage('Please fill the Content.');
            setMsgOpen(true);
            return;
        }
        if(isNaN(Number(postUserID))) {
            setMessage('Please fill the User ID with number.');
            setMsgOpen(true);
            return;
        }
        let post = {};
        post.title = postTitle;
        post.body = postContent;
        post.userId = Number(postUserID);
        if(state === 'add') {
            dispatch(createPost(post));
        } else {
            dispatch(updatePost(post, postId));
        }
    }

    return (
        <Container>
            <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: 10 }}>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href="/posts"
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    Posts
                </Link>
                <Link
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center' }}
                    color="inherit"
                    href={state==='add'?"/posts/add":"/posts/edit/"+postId}
                >
                    <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    {state==='edit'?'Update Post':'New Post'}
                </Link>
            </Breadcrumbs>
            <Card>
                <CardContent>
                    <Stack spacing={1}>
                        <Typography variant="h5" component="div">
                            {state==='edit'?'Update Post':'Create New Post'}
                        </Typography>
                        <TextField
                            required
                            id="outlined-required"
                            label="Post Title"
                            fullWidth
                            value={postTitle}
                            onChange={(e)=>{setPostTitle(e.target.value)}}
                            />
                        <TextField
                            required
                            id="outlined-required"
                            label="Post Content"
                            fullWidth
                            multiline
                            value={postContent}
                            onChange={(e)=>{setPostContent(e.target.value)}}
                            rows={4}
                            />
                        <TextField
                            required
                            id="outlined-required"
                            label="User ID"
                            fullWidth
                            value={postUserID}
                            onChange={(e)=>{setPostUserID(e.target.value)}}
                            />
                        <Grid container justifyContent="flex-end" gutter={6}>
                            <Button variant="contained" style={{ marginRight: 10 }} onClick={handleSaveButton}>Save</Button>
                            <Button color="inherit" variant="contained" onClick={()=>navigate('/posts')}>Cancel</Button>
                        </Grid>
                    </Stack>
                </CardContent>
            </Card>
            <Snackbar 
                open={msgOpen} 
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                autoHideDuration={6000} 
                onClose={()=>{setMsgOpen(false)}}
                >
                <MuiAlert 
                    onClose={()=>{setMsgOpen(false)}}
                    severity="success" 
                    sx={{ width: '100%' }}>
                    {message}
                </MuiAlert>
            </Snackbar>
        </Container>
    );
}