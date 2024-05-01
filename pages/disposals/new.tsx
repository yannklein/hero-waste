import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import prisma from '../../lib/prisma';
import Header from '../../components/Header';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // http://localhost:3000/disposals/new?trash=glass&batch=web
  const trashCategory = query?.trash.toString().toUpperCase();
  const batchCategory = query?.batch.toString().toUpperCase();

  const createDisplosal = async () => {
    try {
      const trashCan = await prisma.batch.findFirst({ 
        where: { 
          batchCategory: batchCategory,
          category: trashCategory
        }
      });
      const activeBatch = await prisma.batch.findFirst({ 
        where: { 
          category: batchCategory,
          startDate: { 
            lte: new Date(),
          },
          endDate: { 
            gte: new Date()
          }
        }
      })
      const disposal = await prisma.disposal.create({
        data: {
          category: trashCategory,
          batchCategory: batchCategory,
          batch: activeBatch,
          trashCan: trashCan,
        },
      })
    } catch (error) {
      console.error(error);
    }
  }
  
  return {
    props: { trashCategory, batchCategory },
  };
};

type Props = {
  trashCategory: String;
  batchCategory: String;
};

const NewDisposal: React.FC<Props> = ({trashCategory, batchCategory}) => {

  const handClick = async () => {
    await setTimeout(() => {}, 1000)
  }

  return (
    <Layout>
      <Header/>
      <div className="frame">
        <h1>{batchCategory} - {trashCategory} 🗑️ </h1>
        <a className="button regular" onClick={handClick} data-category="regular" href="#">
          Bag changed! 😎✅
        </a>
        <a className="button penalty" onClick={handClick} data-category="penalty" href="#">
          Bag changed BUT I found missorted garbage... 🤢
        </a>
      </div>
      <div className="notification">
        <p>Got it! Thanks 😎🤘</p>
        <a href="#">Dashboard</a>
      </div>
      <style jsx>{`
      .frame {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
      }
      .notification.active {
        opacity: 1;
      }
      .notification {
        opacity: 0;
        transition: opacity 1s;
        backdrop-filter: blur(10px);
        position: fixed;
        left: 50%;
        top: 50%;
        width: 80vw;
        height: 50vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transform: translate(-50%, -50%);
        font-size: 48px;
        padding: 16px;
        text-align: center;
        background-color: rgba(255,255,255,0.3);
        border-radius: 20px;
        color: black;
        box-shadow: 4px 4px 16px rgba(0,0,0,0.7);
        a {
          font-size: 32px;
          right: 16px;
          top: 8px;
          color: white;
          text-decoration: none;
          border-radius: 30px;
          background: #086634;
          padding: 16px 32px;
        }
      }
      .button {
        font-size: 24px;
        color: white;
        text-decoration: none;
        width: 300px;
        text-align: center;
        box-shadow: 4px 4px 5px rgb(0, 0, 0);
        border-radius: 50px;
        background: #086634;
        padding: 16px;
      }
      .button.penalty {
        background: #661834;
      `}</style>
    </Layout>
  );
};

export default NewDisposal;
