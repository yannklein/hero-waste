import React, { useEffect } from 'react';
// import Router from 'next/router';
import { BatchCategory, Disposal } from '@prisma/client';
import Award, { AwardCategory } from './Award';

export type BatchProps = {
  id: string;
  name: string;
  size: Number;
  score: Number;
  trend: Number;
  thisWeekDisposals: number;
  disposalsSinceMonday: number;
  lastWeekDisposals: number;
  penaltyCount: Number;
  isNoPenalty: Boolean;
  isSorter: Boolean;
  disposals: Disposal[];
  startDate: Date;
  endDate: Date;
  category: BatchCategory;
  createdAt: Date;
  updatedAt: Date;
};

const Batch: React.FC<{ batch: BatchProps; position: String }> = ({
  batch,
  position,
}) => {
  let trendIcon = '🟰';
  if (batch.trend > new Number(0)) {
    trendIcon = '📈';
  } else if (batch.trend < new Number(0)) {
    trendIcon = '📉';
  }
  let awards = [];
  if (batch.isNoPenalty) {
    awards.push(
      <Award
        position={position}
        category={AwardCategory['NO_PENALTY']}
        tooltipMessage="Wow! No trash mix-up this week, good job 💪"
      />,
    );
  }
  if (batch.isSorter) {
    awards.push(
      <Award
        position={position}
        category={AwardCategory['SORTER']}
        tooltipMessage="Burnable are at a record low this week, you're killing it 😎"
      />,
    );
  }
  if (batch.thisWeekDisposals < 4) {
    awards.push(
      <Award
        position={position}
        category={AwardCategory['ZERO_WASTE']}
        tooltipMessage="Less than 4 waste bag this week! You're legend 🦄"
      />,
    );
  }

  return (
    <>
      <div
        className="frame"
        // onClick={() => Router.push('/batches/[id]', `/batches/${batch.id}`)}
      >
        <div>
          <h2>{batch.category}</h2>
          <p className="batch-name">
            {batch.name} (🧑‍💻{batch.size})
          </p>
        </div>

        <div>
          <p className="score">
            🏆 <span>{batch.score}</span> / 100
          </p>
          <div className="info">
            <div>
              <p>This week:</p>
              <p>
                {trendIcon} {batch.disposalsSinceMonday} trash(es)
              </p>
              <p>
                {batch.penaltyCount == 0 ? '👍' : '🤢'} {batch.penaltyCount}{' '}
                penalties
              </p>
            </div>
          </div>
        </div>
        <div className={`awards ${position}`}>{awards}</div>
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
          position: relative;
          .awards {
            position: absolute;
            top: 0;
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding: 32px 0;
            font-size: 32px;
          }
          .awards.left {
            left: -10px;
          }
          .awards.right {
            right: -10px;
          }
          h2 {
            font-size: 40px;
            margin: 0;
            text-shadow: 4px 4px 2px #04477a;
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
              color: #fff6b0;
            }
          }
          .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            p {
              margin: 0;
            }
          }
        }
        @media (min-width: 500px) {
          .frame {
            width: 200px;
          }
        }
        @media (min-width: 700px) {
          .frame {
            width: 300px;
            .awards.left {
              left: -15px;
            }
            .awards.right {
              right: -15px;
            }
          }
        }
        @media (min-width: 900px) {
          .frame {
            flex-direction: row;
            justify-content: space-around;
            width: 400px;
            height: 240px;
            .awards {
              gap: 32px;
            }
            .awards.left {
              left: -20px;
            }
            .awards.right {
              right: -20px;
            }
          }
        }
        @media (min-width: 1000px) {
          .frame {
            flex-direction: column;
            justify-content: space-around;
            width: 500px;
            height: 400px;
            h2 {
              font-size: 64px;
            }
            .score {
              margin-bottom: 32px;
              font-size: 64px;
              span {
                font-size: 80px;
              }
            }
            .info { 
              font-size: 24px;
            }
          }
        }
      `}</style>
    </>
  );
};

export default Batch;
