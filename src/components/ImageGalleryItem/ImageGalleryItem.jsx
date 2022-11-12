import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  return (
    <GalleryItem className="gallery-item">
      <Image
        src={webformatURL}
        alt={tags}
        width="500"
        height="210"
        loading="lazy"
        onClick={toggleModal}
      />

      {isModalOpen && (
        <Modal modalImg={largeImageURL} tags={tags} closeModal={toggleModal} />
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
