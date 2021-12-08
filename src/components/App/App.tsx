import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

import "./App.css";

import look_see from "../../photos/000274910020.jpg";
import glow from "../../photos/6M6A5315.jpg";
import snow_day from "../../photos/6M6A1353.jpg";
import dunes from "../../photos/6M6A7250.jpg";
import generations from "../../photos/6M6A8433.jpg";
import dock from "../../photos/000240630017.jpg";

import { Header } from "../Header";
import { LightBox } from "../LightBox";

function App(): React.ReactElement {
  const featuredImage = snow_day;
  const galleryImages = [dock, glow, look_see, generations, dunes];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const Gallery = useMemo(
    (): JSX.Element => (
      <div className="gallery-grid--wrapper">
        {galleryImages.map(
          (img: string, i: number): JSX.Element => (
            <motion.img
              key={i}
              onClick={handleImageClick}
              className="gallery-grid--item"
              src={img}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: `1.${i}` }}
            />
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
