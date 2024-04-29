import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { BatchProps } from "../../components/Batch"
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const batch = await prisma.batch.findUnique({
    where: {
      id: String(params?.id),
    }
  });

  batch.score = await batch.score
  batch.lastWeekDisposals = await batch.lastWeekDisposals

  return {
    props: batch,
  };
}

const Batch: React.FC<BatchProps> = (props) => {
  let title = props.name
  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>Grouping {props.size} {props.category.toLowerCase()} students</p>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Batch
