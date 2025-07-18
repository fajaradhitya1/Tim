import React from "react";
import Image from "next/image";

interface PublicServiceGalleryProps {
  images: string[]; // Array of image URLs
}

const PublicServiceGallery: React.FC<PublicServiceGalleryProps> = ({
  images,
}) => {
  return (
    <div className="public-service-gallery">
      <h2 className="gallery-title">Galeri Layanan Publik</h2>
      <div className="gallery-container">
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <Image
              src={image}
              alt={`Gambar Layanan Publik ${index + 1}`}
              width={200}
              height={200}
              className="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicServiceGallery;
