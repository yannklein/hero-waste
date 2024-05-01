import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import prisma from '../../lib/prisma';
import Header from '../../components/Header';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // http://localhost:3000/disposals/new?trash=glass&batch=web
  const trashCategory = query?.trash.toString().toUpperCase();
  const batchCategory = query?.batch.toString().toUpperCase();
  
  return {
    props: { trashCategory, batchCategory },
  };
};

type Props = {
  trashCategory: String;
  batchCategory: String;
};

const handClick = () => {

}

const NewDisposal: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Header/>
      <div className="frame">
        <h1>{props.batchCategory} - {props.trashCategory} 🗑️ </h1>
        <a className="button regular" onClick={handClick} data-category="regular" href="#">
          Bag changed! 😎✅
        </a>
        <a className="button penalty" onClick={handClick} data-category="penalty" href="#">
          Bag changed BUT some missorted garbage... 🤢
        </a>
      </div>
      <style jsx>{`
      .frame {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
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
