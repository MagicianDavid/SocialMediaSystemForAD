import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PC_MsgService from "../../services/PC_MsgService";

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
        <div className="search-results">
            <h2>Search Results for "{query}"</h2>

            <div className="results-section">
                <h3>Following Users</h3>
                {searchResult.followingUsers.length > 0 ? (
                    searchResult.followingUsers.map(user => (
                        <div key={user.id}>{user.username}</div>
                    ))
                ) : (
                    <p>No matching following users found.</p>
                )}
            </div>

            <div className="results-section">
                <h3>All Users</h3>
                {searchResult.allUsers.length > 0 ? (
                    searchResult.allUsers.map(user => (
                        <div key={user.id}>{user.username}</div>
                    ))
                ) : (
                    <p>No matching users found.</p>
                )}
            </div>

            <div className="results-section">
                <h3>Posts</h3>
                {searchResult.posts.length > 0 ? (
                    searchResult.posts.map(post => (
                        <div key={post.id}>
                            <p><strong>{post.user_id.username}</strong>: {post.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No matching posts found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;
