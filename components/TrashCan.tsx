import React from 'react';
import Router from 'next/router';
import { TrashCategory, BatchCategory, Disposal } from '@prisma/client';

import {QRCodeSVG} from 'qrcode.react';


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
  const url = `http://${process.env.VERCEL_URL}/disposals/new?trash=${trashCan.category}&batch=${trashCan.batchCategory}`;
  return (
    <>
      <div
        className="frame">
        <h2>
          <div>🗑️ {trashCan.batchCategory}</div>
          <div>{trashCan.category}</div>
        </h2>
        <div>
          <p className="info">{trashCan.capacity}L</p>
          <p className="info">{trashCan.disposals?.length} disposals</p>
        </div>
        <div 
          className="info" 
          onClick={() => Router.push('/trash-cans/[id]', `/trash-cans/${trashCan.id}`)}  
        >
          <QRCodeSVG value={url} />
        </div>
      </div>
      <style jsx>{`
        .frame {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          box-shadow: 4px 4px 5px rgb(0, 0, 0);
          border-radius: 10px;
          background: #081834;
          padding: 8px 16px;
          margin-bottom: 24px;
          max-height: 160px;
          h2 {
            margin: 0;
            text-shadow: 4px 4px 2px #04477A;
            text-align: center;
          }
          .trashCan-name {
            margin: 0;
          }
          .info {
            font-size: 24px;
            margin: 0;
            display: flex;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
};

export default TrashCan;
