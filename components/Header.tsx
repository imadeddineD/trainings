'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AlignJustify, ChevronRight, CircleX } from 'lucide-react';

const Header = () => {
  const pathname = usePathname();

  const isHome = useMemo(() => pathname === '/', [pathname]);
  const isNotFound = useMemo(() => pathname === '/404', [pathname]);
  const paths = useMemo(() => pathname.split('/').filter(Boolean), [pathname]);

  const [navOpen, setNavOpen] = useState(false);
  const toggleMobNav = () => setNavOpen(prev => !prev);

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'home' },
    { href: '/categories', label: 'Categories' },
    { href: '/locations', label: 'Locations' },
    { href: '/courses', label: 'Competencies' },
    { href: '/login', label: 'Employees Assessment' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="text-white font-goldman">
      <div className="bg-[#2C3C58] relative">
        <div className="nav-container container-px h-header-sm max-w-screen-2xl mx-auto flex justify-between items-center">
          <div className="logo-container">
            <Link href="/">
              <picture>
                <source srcSet="/optimized-imgs/Logo-full.webp" type="image/webp" />
                <img
                  className={`${
                    isHome
                      ? 'xl:h-[120px] lg:h-[100px] lg:translate-y-[35px] xl:translate-y-12 max-lg:py-[1px]'
                      : 'py-[1px] xl:h-header-sm lg:h-[50px] lg:translate-y-0'
                  } h-header-sm`}
                  src="/imgs/Logo-full.png"
                  alt="logo"
                />
              </picture>
            </Link>
          </div>

          <nav className="visible max-lg:hidden">
            <ul className="capitalize flex xl:gap-[61px] lg:gap-8 header-nav">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={isActive(href) ? '!text-white' : ''}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flag-container flex-center gap-3">
            <div className="mob-nav visible lg:hidden">
              {navOpen ? (
                <CircleX onClick={toggleMobNav} className="cursor-pointer select-none" size={30} />
              ) : (
                <AlignJustify onClick={toggleMobNav} className="cursor-pointer select-none" size={30} />
              )}

              <nav
                className={`shadow absolute top-full left-0 w-full bg-[#2C3C58] text-center overflow-hidden transition-all duration-500
                ${navOpen ? 'max-h-[500px] px-6 pb-9 pt-5' : 'max-h-0 p-0'}`}
              >
                <ul className="capitalize flex gap-6 header-nav flex-col">
                  {navLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link href={href} className={isActive(href) ? '!text-white' : ''}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <picture>
              <source srcSet="/optimized-imgs/image-6-full.webp" type="image/webp" />
              <img className="xl:w-[76.5px] lg:w-[60px] w-[68px]" src="/imgs/image-6-full.png" alt="flag" />
            </picture>
          </div>
        </div>
      </div>

      <div className={`path-container ${isHome ? 'bg-gradient-to-b from-[#DA0E29] to-[#9A103C]' : 'bg-[#DA0E29]'}`}>
        <div
          className={`path container-px max-w-screen-2xl mx-auto p-[10px] max-sm:hidden ${
            isHome || isNotFound ? 'hidden' : ''
          }`}
        >
          <p className="capitalize xl:text-[13px] lg:text-[11px] text-[13px]">
            <Link className="hover:underline" href="/">
              home
            </Link>
            {paths.map((path, index) => {
              const fullPath = '/' + paths.slice(0, index + 1).join('/');
              const isLast = index === paths.length - 1;
              return (
                <span key={path}>
                  <ChevronRight className="inline" size={15} />
                  {isLast ? (
                    <span>{decodeURIComponent(path)}</span>
                  ) : (
                    <Link className="hover:underline" href={fullPath}>
                      {decodeURIComponent(path)}
                    </Link>
                  )}
                </span>
              );
            })}
          </p>
        </div>

        <div
          className={`${
            isHome ? '' : 'hidden'
          } home-h2-container text-center xl:text-[34px] md:text-[29px] text-[25px] md:py-5 py-4 lg:ps-28 lg:pr-0 px-5`}
        >
          <h1>Supporting You in Reaching Your Next Summit</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
