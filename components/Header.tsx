import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Image from 'next/image';
import logo from '../public/logo.png';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  return (
    <nav>
      <Link href="/" legacyBehavior>
        <a className="logo" data-active={isActive('/')}>
          <Image
            src={logo}
            alt="Hero Waste app logo"
            sizes="100vw"
            priority={true}
            fetchPriority="auto"
          />
        </a>
      </Link>
      <div className="menu">
        <Link href="https://www.lewagon.com/tokyo">About Le Wagon</Link>
        <Link href="/trashes">Trash cans</Link>
        <Link href="/">Login</Link>
      </div>
      <style jsx>{`
        nav {
          display: flex; 
          a {
            text-decoration: none;
            color: white;
          }
        }
        .menu {
          background-color: #081834;
          display: none;
          flex-grow: 1;
          height: 80px;
          box-shadow: 0 8px 8px rgba(0,0,0,0.3);
          justify-content: flex-end;
          align-items: center;
          gap: 24px;
          padding: 24px;
        }
        a.logo {
          flex-grow: 1;
          img {
            width: 100%;
            height: 280px;
            display: inline-block;
          }
        }
        @media (min-width: 500px) {
          a.logo {
            flex-grow: 0;
            -webkit-filter: drop-shadow(0 8px 8px rgba(0,0,0,0.3));
            filter: drop-shadow(0 8px 8px rgba(0,0,0,0.3));
            img {
              height: 100px;
              width: auto;
            }
          }
          .menu {
            display: flex;
          }
        }
      `}</style>
    </nav>
  );
};

export default Header;
