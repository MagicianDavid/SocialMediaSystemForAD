import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PC_MsgService from "../../services/PC_MsgService";
import Post from "../Classess/Post";
import UserCard from "../user/UserCard";

const SearchResults = () => {
    const [searchResult, setSearchResult] = useState({
        followingUsers: [],
        allUsers: [],
        posts: []
    });
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('keyword');

    useEffect(() => {
        if (query) {
            PC_MsgService.getSearchResult(query)
                .then(response => {
                    setSearchResult({
                        followingUsers: response.data.all_matched_following_user_list,
                        allUsers: response.data.all_matched_user_list,
                        posts: response.data.all_matched_post_list
                    });
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                });
        }
    }, [query]);

    return (
        <div>
            <h1>Search Results</h1>
            <div>
                <h2>Following Users</h2>
                {searchResult.followingUsers?.length > 0 ? (
                    searchResult.followingUsers.map(user => (
                        <UserCard user={user} styles={styles} />
                    ))
                ) : (
                    <p>No matching users found.</p>
                )}
            </div>

            <div>
                <h2>All Matched Users</h2>
                {searchResult.allUsers?.length > 0 ? (
                    searchResult.allUsers.map(user => (
                        <UserCard user={user} styles={styles} />
                    ))
                ) : (
                    <p>No matching users found.</p>
                )}
            </div>

            <div>
                <h2>Posts</h2>
                {searchResult.posts?.length > 0 ? (
                    searchResult.posts.map(post => (
                        <Post key={post.id} post={post} />
                    ))
                ) : (
                    <p>No matching posts found.</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    profileContainer: {
        position: 'relative',  // Ensure the container is relatively positioned
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        marginBottom: '10px',
    },
    profileHeader: {
        borderBottom: '1px solid #ddd',
        paddingBottom: '10px',
        marginBottom: '10px',
    },
};

export default SearchResults;
