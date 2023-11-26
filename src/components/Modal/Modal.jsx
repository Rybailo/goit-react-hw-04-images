import { useEffect } from 'react';
import css from '../Modal/Modal.module.css';

export const Modal = ({ baseImg, alt, close }) => {
  useEffect(() => {
    const handleESC = e => {
      if (e.code === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', handleESC);
    return () => {
      document.removeEventListener('keydown', handleESC);
    };
  }, [close]);

  const handleClick = e => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <div className={css.overlay} onClick={handleClick}>
      <div className={css.modal}>
        <img src={baseImg} alt={alt} />
      </div>
    </div>
  );
};
