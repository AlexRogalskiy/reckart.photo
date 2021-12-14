import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import LazyLoad from 'react-lazyload';

import "./App.css";

import look_behind from "../../photos/000274910020.jpg";
import snow_day from "../../photos/6M6A1353.jpg";
import dunes from "../../photos/6M6A7250.jpg";
import cambridge from '../../photos/000547430021.jpg';
import facade from '../../photos/000547430026.jpg';
import dock from "../../photos/000240630017.jpg";
import dart from '../../photos/6M6A8951.jpg';
import bait_and_tackle from "../../photos/000240630012.jpg"

import { Header } from "../Header";
import { LightBox } from "../LightBox";

function App(): React.ReactElement {
  const featuredImage = snow_day;
  const galleryImages = [
    facade,
    dart,
    look_behind,
    cambridge,
    dock,
    dunes,
  ];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const Gallery = useMemo(
    (): JSX.Element => (
      <div className="gallery-grid--wrapper">
        {galleryImages.map(
          (img: string, i: number): JSX.Element => (
            <LazyLoad offset={100}>
              <motion.img
                key={i}
                onClick={handleImageClick}
                className="gallery-grid--item"
                src={img}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: `1.${i}` }}
              />
            </LazyLoad>
          )
        )}
      </div>
    ),
    []
  );

  return (
    <div className="app">
      <LightBox
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        images={[featuredImage, ...galleryImages]}
      />
      <Header />
      <div className="gallery">
        <div className="gallery-grid--featured-image">
          <motion.img
            onClick={handleImageClick}
            src={snow_day}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
        </div>
        {Gallery}
      </div>
      <footer>© 2021 Tyler Reckart</footer>
    </div>
  );

  function handleImageClick(event: any): void {
    const {
      target: { src },
    } = event;

    if (window.outerWidth < 600) {
      return;
    }

    setSelectedImage(src);
  }
}

export default React.memo(App);
