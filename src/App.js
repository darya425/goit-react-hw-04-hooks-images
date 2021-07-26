import { useState, useEffect } from "react";
import imagesApi from "./Components/Services/images-api";
import "./App.css";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Layout from "./Components/Layout";
import ImageGallery from "./Components/ImageGallery";
import Button from "./Components/Button";
import Modal from "./Components/Modal";

const App = () => {
  const [images, setImages] = useState([]);
  const [largeImg, setLargeImg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = () => {
    const options = {
      searchQuery,
      currentPage,
    };

    setIsLoading(true);

    imagesApi
      .fetchImages(options)
      .then(({ hits }) => {
        setImages([...images, ...hits]);
        setCurrentPage(currentPage + 1);

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }

    fetchImages();
  }, [searchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const showLargeImg = (path) => {
    setLargeImg(path);
    toggleModal();
  };

  const onChangeQuery = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setError(null);
  };

  const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;
  const shouldRenderText = images.length === 0 && !isLoading;

  return (
    <Layout onChange={onChangeQuery}>
      {error && <span>Жизь-боль, все пропало!</span>}

      {shouldRenderText && (
        <p className="text">
          Ищущим какую-нибудь вещь приходится или найти ее, или дойти до
          отрицания нахождения и признания ее невоспринимаемости, или
          упорствовать в отыскивании.
        </p>
      )}

      <ImageGallery imagesData={images} onShowLargeImg={showLargeImg} />

      {isLoading && (
        <Loader type="Puff" color="#f158b1" height={50} width={50} />
      )}

      {shouldRenderLoadMoreButton && <Button onFetchImages={fetchImages} />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImg} alt="" />
        </Modal>
      )}
    </Layout>
  );
};

export default App;
