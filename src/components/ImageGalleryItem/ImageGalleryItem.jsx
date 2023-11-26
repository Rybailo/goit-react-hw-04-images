import { Modal } from '../Modal/Modal';
import { useState } from 'react';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, alt }) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const handleOpen = () => {
    setIsShowModal(true);
  };

  const handleClose = () => {
    setIsShowModal(false);
  };

  return (
    <li className={css.galleryItem}>
      <img
        src={webformatURL}
        alt={alt}
        className={css.ImageGalleryItemImage}
        onClick={handleOpen}
      />
      {isShowModal && (
        <Modal baseImg={largeImageURL} alt={alt} close={handleClose} />
      )}
    </li>
  );
};
