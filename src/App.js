import { useState, useEffect, useMemo } from 'react';
import { fetchPixabayImages } from './Service/pix_api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './components/Modal';
import { Searchbar } from './components/Searchbar';
import { Button } from './components/Button';
import { ImageGallery } from './components/ImageGallery';
import { Loader } from './components/Loader';

export function App() {
  const [inputQuery, setInputQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadMore, setLoadMore] = useState(false);

  const handleSearchSubmit = searchImg => {
    if (searchImg.trim() === '') {
      toast('Please enter desirable image name for search');
      return;
    }
    console.log(searchImg);
    setInputQuery(searchImg);
    setCurrentPage(1);
    setImages([]);
    setError(null);
  };

  useEffect(() => {
    const fetchImages = () => {
      setIsLoading(true);

      fetchPixabayImages(inputQuery, currentPage)
        .then(data => {
          if (data.hits.length === 0) {
            return toast('something went wrong');
          }
          setImages(images => [...images, ...data.hits]);
          setLoadMore(currentPage < Math.ceil(data.totalHits / 12));
          if (currentPage > 2) {
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
        })
        .catch(() => {
          toast(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    if (inputQuery !== '') {
      fetchImages();
    }
  }, [currentPage, inputQuery, error]);

  const onToggleModal = () => {
    setShowModal(!showModal);
  };

  const onModal = ({ largeImageURL, tags }) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
    onToggleModal();
  };

  const loadMoreImages = () => {
    setCurrentPage(currentPage + 1);
  };

  const showLoadMoreBtn = useMemo(() => {
    return loadMore;
  }, [loadMore]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearchSubmit} />
      {isLoading && <Loader />}
      {showModal && (
        <Modal onClose={onToggleModal}>
          <img className="modal" src={largeImageURL} alt={tags} />
        </Modal>
      )}
      <ImageGallery images={images} onClick={onModal} />
      {showLoadMoreBtn && (
        <Button
          className="button"
          type="button"
          disabled={loadMore}
          btnName="Load more"
          buttonVisibility={loadMore}
          onClick={loadMoreImages}
        />
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
}
