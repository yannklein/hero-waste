export default function Tooltip({ message, position, children }) {
  return (
    <div className={`tooltip ${position}`}>
      {children}
      <div className="message">{message}</div>
      <style jsx>
        {`
          .tooltip.right .message {
            right: 0;
          }
          .tooltip {
            position: relative;
            .message {
              font-size: 24px;
              position: absolute;
              top: 24px;
              display: none;
              background-color: lightgray;
              color: black;
              padding: 8px;
              z-index: 3;
              margin-top: 16px;
              border-radius: 4px;
              min-width: 170px;
              width: 25vw;
              box-shadow: 0px 0px 16px rgba(0,0,0,0.7);
            }
          }
          .tooltip:hover .message {
            display: block;
            }
          }
          @media (min-width: 900px) {
            .tooltip .message {
                top: 80px;
              }
            }
          }
        `}
      </style>
    </div>
  );
}
