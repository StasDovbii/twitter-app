import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostsService from '../../api/PostsService';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';
import styles from './DetailPage.module.scss';

type Params = {
  postId: string;
};

interface IDetails {
  body: string;
  id: string | number;
}

const DetailPage = () => {
  const [details, setDetails] = useState<IDetails>({ body: '', id: '' });
  const [isLoading, setIsLoading] = useState(true);

  const { postId = '' } = useParams<Params>();
  const navigate = useNavigate();

  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const result: IDetails = await PostsService.getPost(postId);
        setDetails(result);
      } catch (err) {
        console.log(err);
        navigate('/404');
      }

      setIsLoading(false);
    };

    if (postId) {
      getPostDetails();
    }
  }, [postId]);

  return (
    <div className={styles.wrapper}>
      <span className={styles.title}>Post details</span>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <div className={styles.postItem}>
          <span className={styles.postNumber}>Post {details.id}</span>
          <span className={styles.postText}>{details.body}</span>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
