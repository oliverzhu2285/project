import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '@mui/material/Avatar';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import defaultAvatar from '../assets/avatardefault.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts, deletePost } from '../redux/actions/posts';

export default function PostLists() {    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { posts, update } = useSelector((state)=> state.posts);
    
    const [page, setPage] = useState(1);
    const [msgOpen, setMsgOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [FilteredPosts, setFilteredPosts] = useState([]);
    useEffect(()=>{
      dispatch(getPosts());
    }, []);
    
    useEffect(()=>{
        if(posts&&posts.length)
            setFilteredPosts(posts.slice(0, 10));
    }, [posts]);

    useEffect(()=>{
        if(update) {
            setTimeout(() => {    
                dispatch(getPosts());
            }, 3000);
            setMessage('Success to delete Post.');
            setMsgOpen(true);
        }
    }, [update])

    const handlePageChange = (event,value) =>{
        setPage(value);
        setFilteredPosts(posts.slice((value-1)*10, value*10-1));
    }

    const handleDelete = (value) =>{
        dispatch(deletePost(value));
    }
    return (
        <Container>
            <Stack spacing={1}>
                <Grid container justifyContent={'space-between'} style={{ marginTop: 10 }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            sx={{ display: 'flex', alignItems: 'center' }}
                            color="inherit"
                            href="/posts"
                        >
                            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                            Posts
                        </Link>
                    </Breadcrumbs>
                    <Button variant="contained" onClick={()=>navigate('/posts/add')}>Add Post</Button>
                </Grid>
                <List sx={{  bgcolor: 'background.paper' }}>
                {
                    FilteredPosts&&FilteredPosts.length>0?FilteredPosts.map(post=>{
                        return(     
                            <div key={post.id}>
                                <ListItem alignItems="flex-start"
                                    secondaryAction={
                                        <div>
                                            <IconButton edge="end" aria-label="create" color={'primary'} onClick={()=>navigate(`/posts/edit/${post.id}`)}>
                                                <CreateIcon/>
                                            </IconButton>
                                            <IconButton edge="end" aria-label="delete" color={'secondary'} onClick={()=>handleDelete(post.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    }
                                    >
                                    <ListItemAvatar>
                                        <Avatar alt="default Avatar" src={defaultAvatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={post.title?post.title:''}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {post.userId?post.userId:'default User'}
                                                </Typography>
                                                {post.body?post.body:'No post content'}
                                            </React.Fragment>
                                        }
                                        />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </div>
                        )
                    })
                    :             
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="default Empty" src={defaultAvatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={'Empty Post'}
                                />
                        </ListItem>
                }
                </List>
                {posts.length>0 &&
                    <Grid container justifyContent={'flex-end'}>                    
                        <Pagination count={10} page={page} onChange={handlePageChange} />
                    </Grid>
                }
            </Stack>
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
