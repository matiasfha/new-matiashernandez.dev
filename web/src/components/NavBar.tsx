import React from "react";

import { useStaticQuery, graphql } from "gatsby";
import tw, { styled } from "twin.macro";
import logo from "./logo.png";
import Link from "@/components/Link";
import Grid from "@/components/Grid";
import Cta from "@/components/Cta";
const Nav = tw.nav`
  h-16 max-w-full px-4 md:px-8 lg:w-auto pt-4
`;
const Content = tw(Grid)`
  md:grid-flow-col grid-rows-2 md:grid-rows-1 justify-between md:grid-cols-4
`;
const LogoImage = tw.img`
  h-8 md:h-12 w-8 md:w-12 hidden md:block
`;

const Menu = tw.div`
self-end text-white  lg:self-center md:col-span-3 self-center
`;

const MenuItem = styled(Link)`
  ${tw`transition duration-150 ease-in-out text-gray-900 hover:text-gray-600  no-underline text-sm md:text-base px-2 md:px-6 font-muli`}
  text-decoration-color: rgb(119, 124, 155);
  text-rendering: optimizeLegibility;
`;

const HomeItem = styled(MenuItem)`
  span {
  ${tw`md:hidden`}
}
`
const query = graphql`
  query NavbarQuery{
es: allSanityNavbar(filter: {locale: {eq: "es"}}) {
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
  en: allSanityNavbar(filter: {locale: {eq: "en"}}) {
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
`
const NavBar: React.FC = ({ lang = 'es' }) => {
  const data = useStaticQuery(query)
  const { edges } = data[lang]
  const home = edges[0].node.link.filter(item => item.isHome)[0]
  const links = edges[0].node.link.filter(item => !item.isHome)
  return (
    <Nav>
      <Content>
        <Menu style={{ justifySelf: "end" }}>
        <MenuItem to={home.link}>
          <LogoImage src={logo} alt="Logo Matias Hernandez" />
          Home
        </MenuItem>
          {links.map(item => {
            return (
            <MenuItem to={item.link} key={item.name}>{item.name}</MenuItem>
            )
          })}
        </Menu>
      </Content>
    </Nav>
  )
};

export default NavBar;
