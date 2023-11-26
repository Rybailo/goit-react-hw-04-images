import React, { Component } from 'react';
import { fetchSearchQuery } from 'Api/Api';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    searchText: '',
    page: 1,
    images: null,
    loadMore: false,
    isLoading: false,
  };

  handleSubmit = e => {
    e.preventDefault();
    const searchValue = e.currentTarget.elements.search.value.trim();
    if (searchValue === '') {
      return Notiflix.Notify.failure(
        'Sorry, there are no images with your search query. Please, try again!'
      );
    }
    this.setState({ searchText: searchValue, page: 1, images: null });
  };

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchText !== this.state.searchText ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });
      fetchSearchQuery(this.state.searchText, this.state.page)
        .then(response => {
          if (response.data.total !== 0) {
            this.setState(prevState => ({
              images: prevState.images
                ? [...prevState.images, ...response.data.hits]
                : [...response.data.hits],
              loadMore:
                this.state.page < Math.ceil(response.data.totalHits / 12),
            }));
          } else {
            this.setState({ loadMore: false });
            Notiflix.Notify.warning('There is no images for your query');
          }
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }
  render() {
    const { isLoading, images, loadMore } = this.state;
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
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {images && <ImageGallery data={images} />}
        {loadMore && <Button onClick={this.handleClick} />}
      </div>
    );
  }
}
