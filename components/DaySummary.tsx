type Props = {
  setShowSummary: Function;
  content: string;
};

const DaySummary: React.FC<Props> = (props) => {
  const close = () => {
    props.setShowSummary(false);
  };
  return (
    <>
      <div onClick={close} className="overlay"></div>
      <div className="frame">
        <div className="title">Summary of the week 😼</div>
        <p className="disclamer" >ℹ️ The following summary is generated via AI and programmed to be funny and extra sassy. Do not take it personally or seriously and don't hesitate to contact us if any problem. </p>
        <div dangerouslySetInnerHTML={{ __html: props.content.replace(/\\n/g, "<br><br>").replace(/\\/g, "") }}>
        </div>
      </div>
      <style>{`
        strong {
          color: #065d9b;
        }
      `}
      </style>
      <style jsx>{`
        .overlay {
          position: fixed;
          z-index: 2;
          width: 100vw;
          height: 100vh;
          top: 0;
          right: 0;
          background-color: black;
          opacity: 50%;
        }
        .disclamer {
          font-size: 12px;
          line-height: 1em;
        }
        .frame {
          transition: 2s;
          width: 400px;
          position: fixed;
          z-index: 3;
          width: 90vw;
          background-color: lightgray;
          color: black;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 8px;
          padding: 32px;
          font-size: 24px;
          .title {
            text-align: center;
            position: relative;
            font-size: 32px;
            margin-bottom: 40px;
          }
          .title::before {
            content: '';
            position: absolute;
            top: calc(50%);
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: -1;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            background: linear-gradient(to right, #098fef, transparent);
          }
        }
        @media (min-width: 700px) {
          .frame {
            width: 400px;
          }
        }
      `}</style>
    </>
  );
};

export default DaySummary;
