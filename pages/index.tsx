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

  return {
    props: { batches },
  };
};

type Props = {
  batches: BatchProps[];
};

const Blog: React.FC<Props> = ({ batches }) => {
  return (
    <>
      <Header/>
      <Layout>
        <div className={`page ${bangers.className}`}>
          <h1>Today's Bat(ch)tle</h1>
          <main className="batches">
            {batches.map(batch => 
              <div key={batch.id} className="batch">
                <Batch batch={batch} />
              </div>
            )}
            <Image
              className="lightning"
              src={lightning}
              alt="Hero Waste app logo"
              width='200'
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </main>
        </div>
        <style jsx>{`
          .page {
            text-align: center;
          }
          .page h1 {
            font-size: 43px;
            color: white;
            text-shadow: 4px 4px 5px rgb(0, 0, 0);
          }
          .batches {
            display: flex;
            justify-content: space-around;
            position: relative;
          }

          .batch:hover {
            box-shadow: 1px 1px 3px #aaa;
          }

          .batch + .batch {
            margin-top: 2rem;
          }
        `}</style>
      </Layout>
    </>
  );
};

export default Blog;
