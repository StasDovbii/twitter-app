import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PostsService from '../../api/PostsService';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import styles from './HomePage.module.scss';
import { IPostsParams } from '../../ts/interfaces/postsInterfaces';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';
import { ThemeContext } from '../../context/ThemeContext';
import classNames from 'classnames';

const HomePage = () => {
  const { isLight } = useContext(ThemeContext);

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
      <span className={classNames(styles.title, { [styles.darkTheme]: !isLight })}>Home page</span>
      <div className={styles.postsList}>
        {posts.map((post: any) => (
          <div className={styles.postItem} onClick={() => handleOpenDetails(post.id)} key={post.id}>
            <span className={classNames(styles.postNumber, { [styles.darkTheme]: !isLight })}>Post {post.id}</span>
            <span className={styles.postText}>{post.body}</span>
          </div>
        ))}
        {isLoading && <CustomSpinner />}
      </div>
    </div>
  );
};

export default HomePage;
