export default function Tooltip({ message, position, category, children }) {
  return (
    <div className={`tooltip ${position}`}>
      {children}
      <div className="message">
        <div className="title">{category.replace("_", " ")} award 🏅</div>
        <div>{message}</div>
      </div>
      <style jsx>
        {`
          .tooltip.right .message {
            right: 0;
          }
          .tooltip {
            position: relative;
            .message {
              font-size: 16px;
              .title {
                text-align: center;
                position: relative;
                font-size: 20px;
                margin-bottom: 4px;
              }
              .title::before {
                content: "";
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
              position: absolute;
              top: 24px;
              display: none;
              background-color: lightgray;
              color: black;
              padding: 8px;
              z-index: 3;
              margin-top: 16px;
              border-radius: 4px;
              min-width: 180px;
              width: 25vw;
              box-shadow: 0px 0px 16px black;
            }
          }
          .tooltip:hover .message {
            display: block;
          }
          @media (min-width: 900px) {
            .tooltip .message {
              top: 80px;
              font-size: 20px;
              .title {
                font-size: 24px;
              }
            }
          }
        `}
      </style>
    </div>
  );
}
