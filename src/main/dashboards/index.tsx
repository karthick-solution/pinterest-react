import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    Box,
    Button,
    Avatar,
    Paper,
    Chip,
    IconButton,
    TextField,
    DialogContent,
    Dialog,
    DialogTitle,
    DialogActions,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MyProfile from './MyProfile';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useCreatePostMutation, useLikeMutation, usePostListsQuery, useUnLikeMutation } from './Api';
import { useFollowMutation, useUnFollowMutation } from '../../auth/AuthApi';
import useLocalStorage from '../../_hooks/useLocalStorage';


const DashboardPage: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { getLocalStorage } = useLocalStorage();
    const usersId = getLocalStorage('userId');

    const [createPost] = useCreatePostMutation();
    const [follow] = useFollowMutation();
    const [unFollow] = useUnFollowMutation();
    const [like] = useLikeMutation();
    const [unLike] = useUnLikeMutation();
    const { data, refetch } = usePostListsQuery(0);


    // Add tag when pressing Enter
    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    // Remove tag
    const handleDeleteTag = (tagToDelete: string) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    // Handle image upload and preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const [profile, setProfile] = useState([]);


    const handleFollowToggle = (id: string, status: string) => {

        if (status === 'Follow') {
            follow({ userId: usersId, followUserId: id })
                .unwrap()
                .then((response) => {
                    console.log(response);
                    refetch()
                })

            // setProfile((prevProfile) => ({
            //     ...prevProfile,
            //     isFollowing: !prevProfile.isFollowing,
            // }));
        }
        else{
            unFollow({ userId: usersId, unFollowUserId: id })
            .unwrap()
            .then((response) => {
                console.log(response);
                refetch()
            })

            
        }

    };

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value);
    };

    const handleCreatePost = () => {
        if (!image) {
            alert("No image selected.");
            return;
        }
        const formData: any = new FormData();
        formData.append('file', image);
        formData.append('tags', JSON.stringify(tags));
        createPost(formData)
            .then((response) => {
                console.log('Post created successfully:', response);
                setOpen(false);
                setTags([]);
                setImage(null);
                setPreview(null);
                refetch();
            })
            .catch((error) => {
                console.error('Error creating post:', error);
            });
    };

    const handleLikeToggle = (postId: number, status:string) => {

        if(status === 'like'){
            like({ pictureId:postId, userId: usersId })
            .unwrap()
            .then((response) => {
                console.log(response);
                refetch()
            })
        }
        else{
            unLike({ pictureId:postId, userId: usersId })
            .unwrap()
            .then((response) => {
                console.log(response);
                refetch()
            })
        }
    };

    return (
        <Container>
            <Grid container spacing={3} sx={{ marginTop: 4 }}>

                <MyProfile />

                <Grid item xs={12} md={8}>
                    <Typography variant="h6" gutterBottom>
                        My Posts
                    </Typography>

                 
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClickOpen}
                        sx={{ marginBottom: 2 }}
                    >
                        Create Post
                    </Button>
                    {data?.data.map((post: any) => (
                        <Paper key={post.id} elevation={3} sx={{ marginBottom: 2, padding: 2 }}>

                            {/* Username and Follow/Unfollow Button */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6">{post?.createdBy?.username}</Typography>
                                <Button
                                    variant={post?.isFollowing ? "outlined" : "contained"}
                                    color={post?.isFollowing ? "secondary" : "primary"}
                                    onClick={() => handleFollowToggle(post.createdBy._id, post?.isFollowing ? 'Unfollow' : 'Follow')}
                                >
                                    {post?.isFollowing ? 'Unfollow' : 'Follow'}
                                </Button>
                            </Box>

                            {/* Tags Section */}
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, marginBottom: 1 }}>
                                {post.tags.map((tag: any, index: any) => (
                                    <Chip key={index} label={tag} variant="outlined" color="primary" />
                                ))}
                            </Box>

                            {/* Preview Image */}
                            {post.url && (
                                <Box sx={{ marginTop: 2, marginBottom: 2 }}>
                                    <img
                                        src={"http://localhost:5000/" + post?.url}
                                        alt="Post Image"
                                        style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                                    />
                                </Box>
                            )}


                     
                            <Typography variant="body1" paragraph>
                                {post.content}
                            </Typography>

                           
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <IconButton
                                    color="error"
                                    onClick={() => handleLikeToggle(post._id, post.isLiked ? 'unlike' : 'like')}
                                    aria-label="like/unlike"
                                >
                                    {post.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                </IconButton>
                                <Typography>{post.likedBy.length}</Typography>
                            </Box>
                        </Paper>
                    ))}
                </Grid>
            </Grid>

            {/* Dialog for Creating a New Post */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogContent>

                    <TextField
                        label="Tags (Press Enter to add)"
                        value={tagInput}
                        onChange={handleTagInputChange}
                        onKeyPress={handleAddTag}
                        fullWidth
                        margin="normal"
                    />

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {tags.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                onDelete={() => handleDeleteTag(tag)}
                                color="primary"
                                variant="outlined"
                            />
                        ))}
                    </Box>

                    <Box sx={{ marginTop: 2 }}>
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<AddPhotoAlternateIcon />}
                        >
                            Upload Image
                            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                        </Button>

                        {preview && (
                            <Box sx={{ marginTop: 2 }}>
                                <Typography variant="body2">Image Preview:</Typography>
                                <Avatar
                                    src={preview}
                                    alt="Image Preview"
                                    variant="rounded"
                                    sx={{ width: 200, height: 200 }}
                                />
                            </Box>
                        )}
                    </Box>
                  
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreatePost} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
};

export default DashboardPage;
