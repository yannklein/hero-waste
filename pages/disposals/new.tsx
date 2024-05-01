import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { BatchCategory, TrashCategory } from '@prisma/client';


const NewDisposal: React.FC = () => {
  const [displayPopup, setDisplayPopup] = React.useState(false);
  
  const searchParams = useSearchParams();
  const batchCategory = BatchCategory[searchParams.get('batch')?.toUpperCase()];
  const trashCategory = TrashCategory[searchParams.get('trash')?.toUpperCase()];
  
  const handClick = async (category) => {
    try {
      const data = {
        category: category,
        batchCategory: batchCategory,
        trashCategory: trashCategory,
      };
      console.log(data);
      
      const response = await fetch('/api/disposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const disposal = await response.json()
      console.log(disposal);
      setDisplayPopup(() => !displayPopup);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Header />
      <div className="frame">
        <h1>
          {batchCategory} - {trashCategory} 🗑️{' '}
        </h1>
        <a className="button regular" onClick={() => handClick('regular')}>
          Bag changed! 😎✅
        </a>
        <a className="button penalty" onClick={() => handClick('penalty')}>
          Bag changed BUT I found missorted garbage... 🤢
        </a>
      </div>
      <div className={`notification ${displayPopup ? 'active' : ''}`}>
        <p>Got it! Thanks 😎🤘</p>
        <Link href="/" legacyBehavior>
          <a href="#">Dashboard</a>
        </Link>
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
        display: flex;
        opacity: 1;
      }
      .notification {
        display: none;
        opacity: 0;
        backdrop-filter: blur(10px);
        position: fixed;
        left: 50%;
        top: 50%;
        width: 80vw;
        height: 50vh;
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
