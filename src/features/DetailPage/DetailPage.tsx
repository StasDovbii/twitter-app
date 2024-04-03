import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostsService from '../../api/PostsService';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';
import styles from './DetailPage.module.scss';

type Params = {
  postId: string;
};

const DetailPage = () => {
  const [details, setDetails] = useState({ title: '' });
  const [isLoading, setIsLoading] = useState(true);

  const { postId = '' } = useParams<Params>();
  const navigate = useNavigate();

  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const result: any = await PostsService.getPost(postId);
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

  if (isLoading) {
    return <CustomSpinner />;
  }

  return (
    <div className={styles.wrapper}>
      Post {postId} {details.title}
    </div>
  );
};

export default DetailPage;
