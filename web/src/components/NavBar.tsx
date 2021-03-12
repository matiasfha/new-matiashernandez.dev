import React from "react";

import { useStaticQuery, graphql } from "gatsby";
import tw, { styled } from "twin.macro";
import logo from "./logo.png";
import Link from "@/components/Link";
import Grid from "@/components/Grid";
import { ThemeContext } from "@/components/ThemeToggle";
const Nav = tw.nav`
  h-16 max-w-full px-4 md:px-8 lg:w-auto
`;
const Content = tw(Grid)`
  md:grid-flow-col grid-rows-2 md:grid-rows-1 justify-between md:grid-cols-2 md:pt-2
`;

const LinkLogo = tw(Link)`
hidden md:block
`;
const LogoImage = tw.img`
  h-8 md:h-12 w-8 md:w-12 hidden md:block mt-4
`;

const Menu = styled.ul`
  ${tw`self-end text-white items-center justify-self-end list-none flex flex-row w-full justify-end`};
  li {
    ${tw`px-2 md:mt-2 md:px-0 `}
  }
`;
const MenuItem = styled(Link)`
  ${tw`transition duration-150 ease-in-out text-gray-900 hover:text-gray-600  no-underline text-sm md:text-base px-0 md:px-6 font-muli`}
  ${tw`dark:text-gray-100 dark:hover:text-gray-400`};
  text-decoration-color: rgb(119, 124, 155);
  text-rendering: optimizeLegibility;
`;

const HomeItem = styled(MenuItem)`
  ${tw`md:hidden`}
`;

const ButtonToggler = styled.button`
  ${tw`rounded-full outline-none border-0 w-10 h-10 cursor-pointer`};
  ${tw`text-gray-900  hover:text-sepia-500`};
  ${tw` dark:text-sepia-400  dark:hover:text-sepia-500`};

  svg {
    ${tw`w-5 h-5`}
  }
`;
const DarkModeToggle = () => {
    const { isDark, toggleTheme } = React.useContext(ThemeContext);
    return (
        <ButtonToggler
            id="dark-mode-toggler"
            aria-label="Switch to dark mode"
            onClick={toggleTheme}
        >
            {isDark ? (
                <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    title="Switch to dark mode"
                    height="1em"
                    width="1em"
                >
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            ) : (
                    <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        title="Switch to dark mode"
                        height="1em"
                        width="1em"
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                )}
        </ButtonToggler>
    );
};
const query = graphql`
  query NavbarQuery {
    es: allSanityNavbar(filter: { locale: { eq: "es" } }) {
      edges {
        node {
          locale
          link {
            link
            isHome
            name
          }
        }
      }
    }
    en: allSanityNavbar(filter: { locale: { eq: "en" } }) {
      edges {
        node {
          locale
          link {
            link
            isHome
            name
          }
        }
      }
    }
  }
`;
const NavBar: React.FC = ({ lang = "es" }) => {
    const data = useStaticQuery(query);
    const { edges } = data[lang];
    const home = edges[0].node.link.filter((item) => item.isHome)[0];
    const links = edges[0].node.link.filter((item) => !item.isHome);
    return (
        <Nav>
            <Content>
                <LinkLogo to={home.link}>
                    <LogoImage src={logo} alt="Logo Matias Hernandez" />
                </LinkLogo>
                <Menu>
                    <HomeItem to={home.link}>
                        <span>Home</span>
                    </HomeItem>
                    {links.map((item) => {
                        return (
                            <li key={item.name}>
                                <MenuItem to={item.link}>{item.name}</MenuItem>
                            </li>
                        );
                    })}
                    <li>
                        <DarkModeToggle />
                    </li>
                </Menu>
            </Content>
        </Nav>
    );
};

export default NavBar;
