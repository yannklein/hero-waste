import React from 'react';
// import Router from 'next/router';
import { BatchCategory, Disposal, DisposalCategory } from '@prisma/client';

export type BatchProps = {
  id: string;
  name: string;
  size: Number;
  score: Number;
  lastWeekDisposals: Number;
  disposals: Disposal[];
  startDate: Date;
  endDate: Date;
  category: BatchCategory;
  createdAt: Date;
  updatedAt: Date;
};

const Batch: React.FC<{ batch: BatchProps }> = ({ batch }) => {  
  const penaltyCount = batch.disposals.filter( d => d.category === DisposalCategory['PENALTY']).length
  return (
    <>
      <div
        className="frame"
        // onClick={() => Router.push('/batches/[id]', `/batches/${batch.id}`)}
      >
        <div>
          <h2>{batch.category}</h2>
          <p className="batch-name">{batch.name} (🧑‍💻{batch.size})</p>
        </div>

        <div>
          <p className="score">🏆 <span>{batch.score}</span> / 100</p>
          <p className="info">🚮 {batch.disposals.length} ({batch.lastWeekDisposals} this week 🔻)</p>
          <p className="info">🤢 {penaltyCount} penalties</p>
        </div>
      </div>
      <style jsx>{`
        .frame {
          box-shadow: 4px 4px 5px rgb(0, 0, 0);
          border-radius: 50px;
          background: #081834;
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          h2 {
            font-size: 40px;
            margin: 0;
            text-shadow: 4px 4px 2px #04477A;
            text-align: center;
          }
          .batch-name {
            margin: 0;
          }
          .score {
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
        @media (min-width: 500px) {
          .frame {
            width: 200px;
          }
        }
        @media (min-width: 1000px) {
          .frame {
            flex-direction: row;
            justify-content: space-around;
            width: 400px;
            height: 240px;
          }
        }
      `}</style>
    </>
  );
};

export default Batch;
