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
        <a className="bold" data-active={isActive('/')}>
          <Image
            className="logo"
            src={logo}
            alt="Hero Waste app logo"
            sizes="100vw"
            style={{
              width: '100%',
              height: '280px',
            }}
            priority={true}
            fetchPriority="auto"
          />
        </a>
      </Link>
      <style jsx>{`
      `}</style>
    </nav>
  );
};

export default Header;
