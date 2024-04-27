import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Batch, { BatchProps } from "../components/Batch"

import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const batches = await prisma.batch.findMany({
    where: { 
      startDate: {
        lte: new Date() 
      },
      endDate: {
        gte: new Date() }
      }
  });
  return {
    props: { batches }
  };
};

type Props = {
  batches: BatchProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.batches.map((batch) => (
            <div key={batch.id} className="batch">
              <Batch batch={batch} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .batch {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .batch:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .batch + .batch {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
