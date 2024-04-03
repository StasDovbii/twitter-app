import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostsService from '../../api/PostsService';
import CustomSpinner from '../../components/CustomSpinner/CustomSpinner';
import { ThemeContext } from '../../context/ThemeContext';
import styles from './DetailPage.module.scss';
import classNames from 'classnames';

type Params = {
  postId: string;
};

interface IDetails {
  body: string;
  id: string | number;
}

const DetailPage = () => {
  const [details, setDetails] = useState<IDetails>({ body: '', id: '' });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { isLight } = useContext(ThemeContext);

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
      <span className={classNames(styles.title, { [styles.darkTheme]: !isLight })}>Post details</span>
      {isLoading ? (
        <CustomSpinner />
      ) : (
        <div className={styles.postItem}>
          <span className={classNames(styles.postNumber, { [styles.darkTheme]: !isLight })}>Post {details.id}</span>
          <span className={styles.postText}>{details.body}</span>
        </div>
      )}
    </div>
  );
};

export default DetailPage;
