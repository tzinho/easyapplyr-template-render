"use client";

import { useEffect, useState } from "react";

import { usePathname } from "next/navigation";

import { Logo } from "~/components/logo";
import Link from "next/link";
import { ThemeToggler } from "~/components/theme-toggler";

const useNavbarItems = () => {
  return [
    {
      id: 1,
      title: "Página inicial",
      path: "/",
      newTab: false,
    },
    {
      id: 2,
      title: "Sobre",
      path: "/about",
      newTab: false,
    },
    {
      id: 33,
      title: "Blog",
      path: "/blog",
      newTab: false,
    },
  ];
};

export const Header = () => {
  const menu = useNavbarItems();
  const usePathName = usePathname();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const [sticky, setSticky] = useState(false);

  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) setSticky(true);
    else setSticky(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  const [openIndex, setOpenIndex] = useState(-1);

  const handleSubmenu = (index: number) => {
    if (openIndex === index) setOpenIndex(-1);
    else setOpenIndex(index);
  };

  return (
    <header
      className={`center left-0 top-0 z-40 flex w-full items-center ${
        sticky
          ? "fixed z-[9999] bg-white !bg-opacity-80 backdrop-blur-sm transition dark:bg-secondary"
          : "absolute bg-transparent"
      }`}
    >
      <div className="container mx-auto">
        <div className="relative flex items-center justify-between">
          <div className="w-24 max-w-full px-4 xl:mr-12">
            <Link
              href="/"
              className={`block w-full ${sticky ? "py-5 lg:py-2" : "py-8"} `}
            >
              <Logo />
            </Link>
          </div>
          <div className="relative flex w-full items-center justify-between">
            <div className="">
              <button
                onClick={navbarToggleHandler}
                id="navbarToggler"
                aria-label="Mobile Menu"
                className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
              >
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? "top-[7px] rotate-45" : " "
                  }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? "opacity-0" : " "
                  }`}
                />
                <span
                  className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? "top-[-8px] -rotate-45" : " "
                  }`}
                />
              </button>
              <nav
                id="navbarCollapse"
                className={`absolute right-0 z-30 w-[250px] rounded border-[.5px] bg-secondary px-6 py-4 text-primary duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                  navbarOpen
                    ? "visibility top-full opacity-100"
                    : "invisible top-[120%] opacity-0"
                }`}
              >
                <ul className="block lg:flex lg:space-x-12">
                  {menu.map((menuItem, index) => (
                    <li key={index} className="group relative">
                      {menuItem.path ? (
                        <Link
                          href={menuItem.path}
                          className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                            usePathName === menuItem.path
                              ? "text-primary dark:text-white"
                              : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                          }`}
                        >
                          {menuItem.title}
                        </Link>
                      ) : (
                        <>
                          <p
                            onClick={() => handleSubmenu(index)}
                            className="text-dark flex cursor-pointer items-center justify-between py-2 text-base group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                          >
                            {menuItem.title}
                            <span className="pl-3">
                              <svg width="25" height="24" viewBox="0 0 25 24">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </p>
                          <div
                            className={`submenu dark:bg-dark relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                              openIndex === index ? "block" : "hidden"
                            }`}
                          >
                            {menuItem?.submenu?.map((submenuItem, index) => (
                              <Link
                                href={submenuItem.path}
                                key={index}
                                className="block rounded py-2.5 text-sm hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
                              >
                                {submenuItem.title}
                              </Link>
                            ))}
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="mr-[70px] flex items-center justify-center lg:mr-0">
              <Link
                href="/sign-in"
                className="text-dark hidden px-7 py-3 text-base font-medium hover:opacity-70 dark:text-white md:block"
              >
                Entrar
              </Link>
              <Link
                href="/sign-up"
                className="ease-in-up shadow-btn hover:shadow-btn-hover hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 hover:bg-opacity-90 dark:text-secondary md:block md:px-9 lg:px-6 xl:px-9"
              >
                Cadastrar-se
              </Link>
              <ThemeToggler />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
