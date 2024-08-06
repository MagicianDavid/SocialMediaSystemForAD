import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';

const ScrollPosts = () => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    let countFetchZeroPage = 0;

    const fetchData = async (currentPage) => {
        if (loading) return;
        if (currentPage === 0) countFetchZeroPage += 1;
        setLoading(true);
        try {
            // TODO: fetchData(0) will run twice, haven't find out proper way to solve it
            if (countFetchZeroPage === 2) {setLoading(false); return;}
            const response = await axios.get(`http://localhost:8080/api/pcmsgs/findAllPostsPageable?page=${currentPage}`);
            const fetchedData = response?.data?._embedded?.pCMsgDTOList;
            setData(prevData => [...prevData, ...fetchedData]);
            setHasMore(currentPage < response.data.page.totalPages - 1);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = useCallback(
        debounce(() => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 10 && hasMore && !loading) {
                setPage(prevPage => prevPage + 1);
            }
        }, 300),
        [hasMore, loading]
    );

    useEffect(() => {
        fetchData(page).then();
    }, [page]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div style={{ minHeight: '70vh', overflow: 'auto' }}>
            {data.map((item, index) => (
                <div key={`${item.id}-${index}`} style={{ margin: '20px 0', padding: '10px', border: '1px solid #ccc' }}>
                    <span>{item.content}</span>
                </div>
            ))}
            {loading && <div>Loading more...</div>}
        </div>
    );
};

export default ScrollPosts;
