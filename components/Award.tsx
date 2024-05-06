import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';

import Image from 'next/image';
import no_penalty from '../public/no_penalty2.png';
import sorter from '../public/sorter2.png';
import zero_waste from '../public/zero_waste2.png';

export enum AwardCategory {
  NO_PENALTY,
  SORTER,
  ZERO_WASTE,
}

const awardIcons = {
  NO_PENALTY: no_penalty,
  SORTER: sorter,
  ZERO_WASTE: zero_waste,
};

type Props = {
  category: AwardCategory;
};

const Award: React.FC<Props> = (props) => {
  return (
    <div className="frame">
      <FontAwesomeIcon icon={faAward} />
      <Image
        className="award"
        src={awardIcons[AwardCategory[props.category]]}
        alt={`${AwardCategory[props.category]} award icon`}
        style={{
          width: '24px',
          height: '24px',
        }}
      />
      <style jsx>{`
      .frame {
        position: relative;
        svg {
          color: goldenrod;
        }
        img {
          position: absolute;
          top: 1px;
          left: 0;
        }
      }
      `}</style>
    </div>
  );
};

export default Award;
