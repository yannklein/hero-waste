import React from 'react';
import { GetServerSideProps } from 'next';
import prisma from '../../lib/prisma';
import { TrashCanProps } from '../../components/TrashCan';
import { bangers } from '../../styles/fonts';

import { QRCodeSVG } from 'qrcode.react';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const trashCan = await prisma.trashCan.findUnique({
    select: {
      category: true,
      batchCategory: true,
    },
    where: {
      id: String(params?.id),
    },
  });
  
  return {
    props: trashCan,
  };
};

const TrashCan: React.FC<TrashCanProps> = (props) => {  
  const url = `http://${process.env.VERCEL_URL}/disposals/new?trash=${props.category}&batch=${props.batchCategory}`;
  
  return (
    <div className={`frame ${bangers.className}`}>
      <div className="info">🗑️ {props.batchCategory}- {props.category}</div>
      <div className="info">Are you replacing a trash bag?<br/> Scan this barcode and follow the instructions! 🙏</div>
      
      <QRCodeSVG size={400} className="qrcode" value={url} />
      <style jsx>{`
          .frame {
            height: 100vh;
            width: 100vw;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 32px;
          }
          .info {
            font-size: 3rem;
            max-width: 800px;
            text-align: center;
          }
      `}</style>
    </div>
  );
};

export default TrashCan;
