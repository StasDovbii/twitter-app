import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostsService from '../../api/PostsService';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import styles from './HomePage.module.scss';
import { IPostsParams } from '../../ts/interfaces/postsInterfaces';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';

const HomePage = () => {
  const getMorePosts = useCallback(async (query: IPostsParams) => {
    try {
      const result: Object = await PostsService.getAllPosts(query);
      return result;
    } catch (err) {
      console.log(err);

      return {};
    }
  }, []);

  const { list: posts, isLoading } = useInfiniteScroll({ onLoadMore: getMorePosts, dataField: 'posts' });

  const navigate = useNavigate();

  const handleOpenDetails = (id: number | string): void => {
    navigate(`/posts/${id}`);
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>Home page</span>
      <div className={styles.postsList}>
        {posts.map((post: any) => (
          <div className={styles.postItem} onClick={() => handleOpenDetails(post.id)} key={post.id}>
            <span className={styles.postNumber}>Post {post.id}</span>
            <span className={styles.postText}>{post.body}</span>
          </div>
        ))}
        {isLoading && <CustomSpinner />}
      </div>
    </div>
  );
};

export default HomePage;
