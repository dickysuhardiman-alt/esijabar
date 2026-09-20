import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Container } from './Container';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = () => {
  return <Navbar />;
};

interface FooterProps {
  children?: React.ReactNode;
}

const SiteFooter: React.FC<FooterProps> = () => {
  return <Footer />;
};

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && <Header />}
      <main className="flex-1">{children}</main>
      {showFooter && <SiteFooter />}
    </div>
  );
};

export { Header, SiteFooter, Layout, Container };
