import { useState, useEffect, useRef } from 'react';
import { fetchSearchQuery } from 'Api/Api';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export const App = () => {
  /* state = {
    searchText: '',
    page: 1,
    images: null,
    loadMore: false,
    isLoading: false,
  }; */

  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const prevSearchText = useRef('');

  const handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget.elements.search.value.trim();
    if (searchValue === '') {
      return Notiflix.Notify.failure(
        'Sorry, there are no images with your search query. Please, try again!'
      );
    } else if (searchValue === searchText) {
      return Notiflix.Notify.failure(`You are already viewing this images`);
    }
    setSearchText(searchValue);
    setPage(1);
    setImages(null);
  };

  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (prevSearchText.current !== searchText) {
      setIsLoading(true);
      fetchSearchQuery(searchText, page)
        .then(response => {
          const { data } = response;
          if (data && data.hits && Array.isArray(data.hits)) {
            if (data.hits.length > 0) {
              setImages(prevImages =>
                prevImages ? [...prevImages, ...data.hits] : data.hits
              );
              setLoadMore(page < Math.ceil(data.totalHits / 12));
            } else {
              setLoadMore(false);
              Notiflix.Notify.warning('There are no images for your query');
            }
          } else {
            setLoadMore(false);
            Notiflix.Notify.failure('Failed to fetch images');
          }
        })
        .catch(error => {
          console.log(error);
          setLoadMore(false);
          Notiflix.Notify.failure('Failed to fetch images');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [page, searchText]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {images && <ImageGallery data={images} />}
      {loadMore && <Button onClick={handleClick} />}
    </div>
  );
};
