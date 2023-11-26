import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ data }) => {
  return (
    <ul className={css.ImageGallery}>
      {data.map(el => (
        <ImageGalleryItem
          key={el.id}
          webformatURL={el.webformatURL}
          largeImageURL={el.largeImageURL}
          alt={el.tags}
        />
      ))}
    </ul>
  );
};
