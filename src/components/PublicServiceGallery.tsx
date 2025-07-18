import React from "react";
import Image from "next/image";

interface PublicServiceGalleryProps {
  images?: string[]; // tambahkan tanda ? untuk opsional
}

const PublicServiceGallery: React.FC<PublicServiceGalleryProps> = ({
  images = [], // beri default kosong
}) => {
  return (
    <div className="public-service-gallery">
      <h2>Galeri Layanan Publik</h2>
      <div className="gallery">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Foto ${index}`}
            width={200}
            height={200}
          />
        ))}
      </div>
    </div>
  );
};

export default PublicServiceGallery;
