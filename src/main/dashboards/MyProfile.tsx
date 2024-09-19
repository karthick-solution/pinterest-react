
import React, { useState } from 'react';
import {
    Container,
    Grid,
    Box,
    Button,
    Avatar,
    Typography,
    Paper,
} from '@mui/material';
import { useGetProfileQuery } from '../../auth/AuthApi';


const MyProfile: React.FC = () => {
    const { data } = useGetProfileQuery(0);
    const user = data?.data;
console.log('daaaa ', data);

    return (
        <>
            <Grid item xs={12} md={4}>
                <Typography variant="h6">My Profile</Typography>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar sx={{ width: 80, height: 80, marginBottom: 2 }}>
                            {user?.username[0].toUpperCase()}
                        </Avatar>   
                        <Typography variant="h5" gutterBottom>
                            {user?.username}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {user?.email}
                        </Typography>
            
                        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 2 }}>
                            Following: {user?.following.length} 
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </>
    );
};

export default MyProfile;
