import React from 'react';
import Router from 'next/router';
import ReactMarkdown from 'react-markdown';
import { TrashCategory, BatchCategory, Disposal } from '@prisma/client';

export type TrashCanProps = {
  id: string;
  capacity: Number;
  category: TrashCategory;
  batchCategory: BatchCategory;
  disposals: Disposal[];
  createdAt: Date;
  updatedAt: Date;
};

const TrashCan: React.FC<{ trashCan: TrashCanProps }> = ({ trashCan }) => {  
  return (
    <>
      <div
        className="frame">
        <h2>{trashCan.batchCategory} - {trashCan.category}</h2>
        <p className="capacity">Capacity: {trashCan.capacity}</p>
        <p className="info"> QR code</p>
      </div>
      <style jsx>{`
        .frame {
          box-shadow: 4px 4px 5px rgb(0, 0, 0);
          border-radius: 50px;
          background: #081834;
          padding: 16px;
          h2 {
            font-size: 40px;
            margin: 0;
            text-shadow: 4px 4px 2px #04477A;
            text-align: center;
          }
          .trashCan-name {
            margin: 0;
          }
          .capacity {
            display: flex;
            align-items: center;
            margin: 16px 0;
            font-size: 24px;
            span {
              font-size: 40px;
              margin: 0 4px;
              color: #FFF6B0;
            }
          }
          .info {
            margin: 0;
          }
        }
      `}</style>
    </>
  );
};

export default TrashCan;
