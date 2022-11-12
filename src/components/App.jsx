import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { fetchImages } from 'helpers/ImagesFinderApi';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchData = async () => {
      const { hits, totalHits } = await fetchImages(query, page);
      setLoading(false);
      setImages(prevImages => (page === 1 ? hits : [...prevImages, ...hits]));
      setTotalHits(() =>
        page === 1
          ? totalHits - hits.length
          : totalHits - [...images, ...hits].length
      );

      if (totalHits === 0) {
        toast.error('Nothing was found for your request');
        setLoading(false);
        return;
      }
    };
    setLoading(true);

    fetchData().catch(error =>
      toast.error(`Oops! Something went wrong! ${error}`)
    );
  }, [page, query]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleQuerySubmit = query => {
    setQuery(query);
    setPage(1);
  };

  return (
    <>
      <Searchbar onSubmit={handleQuerySubmit} />
      {images && <ImageGallery images={images} />}
      {!!totalHits && <Button onLoadMore={handleLoadMore} />}
      {loading && <Loader />}

      <ToastContainer autoClose={2000} />
    </>
  );
};
