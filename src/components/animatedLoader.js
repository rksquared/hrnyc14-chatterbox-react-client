import React from 'react';
import Loader from 'react-loader-spinner';


const animatedLoader = () => {
  return (
    <div className="spinner">
      <Loader
        type="ThreeDots"
        color="blue"
        height={40}
        width={40}
      />
    </div>
  );
};

export default animatedLoader;