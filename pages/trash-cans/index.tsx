import React from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import prisma from '../../lib/prisma';
import TrashCan, { TrashCanProps } from "../../components/TrashCan";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async () => {
  const trashCans = await prisma.trashCan.findMany({
    include: {
      disposals: true
    }
  });
  console.log(trashCans);
  

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
      <div className="page">
        <h1>Trash cans list</h1>
        <div className="trash-cans">
          { trashCans.map( trashCan => <TrashCan key={trashCan.id} trashCan={trashCan}/>)}
        </div>
        <Link href="/" legacyBehavior>
            <a className="back" href="#">Dashboard</a>
        </Link>
      </div>
      <style jsx>{`
        .page {
          padding: 64px 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          flex-grow: 1;
        }

        .trash-cans {
          display: grid;
          grid-template-columns: 1fr;
          flex-grow: 1;
        }

        h1 {
          text-align: center;
          margin: 32px 0;
        }
        .back {
          font-size: 32px;
          right: 16px;
          top: 8px;
          color: white;
          text-decoration: none;
          display: inline-block;
          border-radius: 30px;
          background: #086634;
          padding: 16px 32px;
          width: fit-content;
          margin-top: 16px;
        }
        @media (min-width: 900px) {
          .page {
            padding: 24px;
          }
          .trash-cans {
            gap: 24px;
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 1200px) {
          .trash-cans {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
      `}</style>
    </Layout>
  )
}

export default TrashCans
