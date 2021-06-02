import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../UserContext';

import Card from './Card';
import postService from "../services/postService";
import PrimarySearchAppBar from './AppBar';

export default function RecipeReviewCard() {
    const context = useContext(UserContext)
    const [posts, setPosts] = useState([]);

    document.title = 'Instacars'

    useEffect(() => {
        const fetchData = async () => {
            const data = await postService.getAll(context.user._id);
            console.log('card data', data);
            if (data.result) {
                setPosts(data.result);
            }
        };

        fetchData();
    }, [])

    return (
        <>
            <PrimarySearchAppBar />
            {posts.map(post =>
                <Card key={post._id} post={post} />
            )}
        </ >
    );
}