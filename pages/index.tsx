import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Batch, { BatchProps } from '../components/Batch';

import { bangers } from '../styles/fonts';

import Image from 'next/image';
import lightning from '../public/lightning.png';

import prisma from '../lib/prisma';

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

  const winner = await prisma.batch.winningBatch();

  return {
    props: { batches, winner },
  };
};

type Props = {
  winner: BatchProps;
  batches: BatchProps[];
};

const Blog: React.FC<Props> = ({ batches, winner }) => {
  return (
    <Layout>
      <Header />
      <div className="frame">
        <div className={`page ${bangers.className}`}>
          <h1>Today's Bat(ch)tle</h1>
          <main className="batches">
            {batches.map((batch) => (
              <div
                key={batch.id}
                className={`batch ${
                  winner.id === batch.id ? 'winner' : 'loser'
                }`}
              >
                <Batch batch={batch} />
              </div>
            ))}
            <Image
              className="lightning"
              src={lightning}
              alt="Hero Waste app logo"
              width="200"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </main>
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
      `}</style>
    </Layout>
  );
};

export default Blog;
