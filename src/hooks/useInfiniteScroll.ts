import { useCallback, useEffect, useState } from 'react';
import { IPost, IPostsParams } from '../ts/interfaces/postsInterfaces';

interface IInfiniteScrollProps {
  onLoadMore: (arg0: IPostsParams) => void;
  dataField: string;
}

interface IInfiniteScroll {
  isLoading: boolean;
  list: Object[];
}

const initQuery: IPostsParams = {
  skip: 0,
  limit: 20,
};

const useInfiniteScroll = ({ onLoadMore, dataField = '' }: IInfiniteScrollProps): IInfiniteScroll => {
  const [list, setList] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [query, setQuery] = useState<IPostsParams>(initQuery);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const handleLoadMore = useCallback(async () => {
    try {
      setIsLoading(true);
      const result: any = await onLoadMore(query);

      const currentData = result[dataField];
      setList((prevState) => [...prevState, ...currentData]);

      setQuery((prevState) => ({ ...prevState, skip: prevState.skip + prevState.limit }));
      setHasNextPage(Boolean(currentData?.length));
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  }, [query, dataField, onLoadMore]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - 20 && hasNextPage && !isLoading) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleLoadMore, hasNextPage, isLoading]);

  useEffect(() => {
    handleLoadMore();
  }, []);

  return {
    isLoading,
    list,
  };
};

export default useInfiniteScroll;
