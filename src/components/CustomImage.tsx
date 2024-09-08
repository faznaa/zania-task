import React, { useState } from 'react';
import Spinner from './Spinner';

const CustomImage = ({ src, alt }:any) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    console.log("after load")
    setLoading(false);
  };

  const handleImageError = () => {
    console.log("after error")

    setLoading(false); 
  };

  return (
    <div className="relative w-64 h-64">
      {loading && (
        <div className="z-10 absolute inset-0 flex justify-center items-center bg-gray-100">
          <Spinner />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => handleImageLoad()}
        onError={() => handleImageError()}
        className={`z-20 absolute w-full h-full object-cover transition-opacity duration-300`}
      />
    </div>
  );
};

export default CustomImage;
