import React from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import prisma from '../../lib/prisma';
import TrashCan, { TrashCanProps } from "../../components/TrashCan";

export const getServerSideProps: GetServerSideProps = async () => {
  const trashCans = await prisma.trashCan.findMany();

  return {
    props: { trashCans },
  };
}

type Props = {
  trashCans: TrashCanProps[]
}

const TrashCans: React.FC<Props> = ({trashCans}) => {
  return (
    <Layout>
      <div>
        <h1>Trash cans list</h1>
        { trashCans.map( trashCan => <TrashCan key={trashCan.id} trashCan={trashCan}/>)}
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

export default TrashCans
