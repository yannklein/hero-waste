import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';

type Props = {
  show: Boolean
}

const Loader: FC<Props> = (props) => {
  return (
    <div className="loader">
      <div>Loading...</div>
      <FontAwesomeIcon icon={faSpinner} spin />
      <style>{`
        .loader {
          position: fixed;
          width: 100vw;
          height: 100vh;
          z-index: 3;
          background-color: #081834dd;
          font-size: 64px;
          display: ${props.show ? "flex" : "none"};
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 24px;
        }
      `}</style>
    </div>
  );
};

export default Loader;