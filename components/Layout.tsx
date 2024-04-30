import React, { ReactNode } from "react";
import { Inter } from 'next/font/google'

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <>
    <div className="layout">{props.children}</div>
    <style jsx global>{`
      html {
        box-sizing: border-box;
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
      }

      body {
        margin: 0;
        padding: 0;
        font-size: 16px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        
        color: white;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
        background: #04477A;
      }
    `}</style>
    <style jsx>{`
      .layout {
        flex-grow: 1;
        display: flex;
      }
    `}</style>
  </>
);

export default Layout;
