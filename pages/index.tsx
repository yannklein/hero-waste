import React from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import prisma from '../lib/prisma';

import Layout from '../components/Layout';
import Header from '../components/Header';
import Batch, { BatchProps } from '../components/Batch';

import lightning from '../public/lightning.png';
import { DisposalCategory } from '@prisma/client';
import DaySummary from '../components/DaySummary';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';

export const getStaticProps: GetStaticProps = async () => {
  const batches = await prisma.batch.findMany({
    include: {
      disposals: {},
    },
    where: {
      startDate: {
        lte: new Date(),
      },
      endDate: {
        gte: new Date(),
      },
    },
  });
  for (let batch of batches) {
    batch.penaltyCount = await prisma.disposal.count({ 
      where: { category: DisposalCategory['PENALTY'], batchId: batch.id}
    });
    batch.lastWeekDisposals = await prisma.batch.prevWeekDisposal(batch, 1);
    const twoWeeksAgoDisp = await prisma.batch.prevWeekDisposal(batch, 2);
    const penaltyCount = await prisma.batch.prevWeekPenalties(batch);
    const sortingRate = await prisma.batch.sortingRate(batch);
    batch.trend = batch.lastWeekDisposals - twoWeeksAgoDisp;
    batch.isNoPenalty = penaltyCount === 0;
    batch.isSorter = sortingRate > 0.5;
  }

  let summaryContent = await prisma.battle.findFirst({
    select: {
      summary: true
    },
    orderBy: {
      createdAt: 'desc',
    }
  });
  summaryContent = summaryContent.summary

  const winner = await prisma.batch.winningBatch();

  return {
    props: { batches, winner, summaryContent },
  };
};

type Props = {
  winner: BatchProps;
  summaryContent: string;
  batches: BatchProps[];
};

const Dashboard: React.FC<Props> = ({ batches, winner, summaryContent }) => {
  const [showSummary, setShowSummary] = React.useState(false);
  const [newSummary, setNewSummary] = React.useState(new Date().getDay() === 1);

  let summary;
  if (showSummary) {
    summary = <DaySummary setShowSummary={setShowSummary} content={summaryContent}/>
  }
  return (
    <Layout>
      {summary}
      <Header />
      <div className="frame">
        <div className="page">
          <h1>Today's Bat(ch)tle</h1>
          <main className="batches">
            {batches.map((batch, index) => (
              <div
                key={batch.id}
                className={`batch ${
                  winner.id === batch.id ? 'winner' : 'loser'
                }`}
              >
                <Batch batch={batch} position={index === 0 ? 'left': 'right'} />
              </div>
            ))}
            <Image
              className="lightning"
              src={lightning}
              alt="Hero Waste app logo"
              style={{
                zIndex: '2',
                width: '30%',
                height: 'auto',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </main>
          <div className="summary">
            
            <div className={`new animate__animated animate__tada ${ newSummary ? "" : "hidden"}`}>
              <FontAwesomeIcon className="certificate" icon={faCertificate} />
              <div>New</div>
            </div>
            <Button name="✨ Week Summary" onClick={() => {setShowSummary(true)}} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .frame {
          flex-grow: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .page {
          flex-grow: 1;
          align-items: center;
          justify-content: center;
          display: flex;
          flex-direction: column;
        }
        .page h1 {
          font-size: 43px;
          margin: 16px 0;
          color: white;
          text-shadow: 4px 4px 5px rgb(0, 0, 0);
        }
        .batches {
          width: 100%;
          padding: 32px 0;
          display: flex;
          justify-content: space-around;
          align-items: center;
          position: relative;
          padding-bottom: 40px;
          
        }
        .winner {
          transform: translateY(20px)
        }
        .loser {
          transform: translateY(-20px)
        }
        .summary {
          position: relative;
          .new.hidden {
            display: none;
          }
          .new {
            position: absolute;
            top: -8px;
            left: -24px;
            color: #081834;
            border-radius: 8px;
            font-size: 24px;
            padding: 16px;
            svg {
              color: #fff6b0;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              z-index: -1;
            }
          }
        }
      `}</style>
    </Layout>
  );
};

export default Dashboard;
