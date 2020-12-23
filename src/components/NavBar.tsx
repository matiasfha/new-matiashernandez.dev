import React from "react";

import tw, { styled } from "twin.macro";
import logo from "./logo.png";
import Link from "@/components/Link";
import Grid from "@/components/Grid";
import Cta from "@/components/Cta";
const Nav = tw.nav`
  h-16 max-w-full px-4 md:px-8 lg:w-auto pt-4
`;
const Content = tw(Grid)`
grid-flow-col grid-cols-3 justify-between md:grid-cols-4
`;
const LogoImage = tw.img`
  h-12 w-12
`;
const Menu = tw.div`
self-end text-white col-span-2 lg:self-center md:col-span-3 self-center
`;

const MenuItem = styled(Link)`
  ${tw`transition duration-150 ease-in-out text-gray-900 hover:text-gray-600  no-underline text-base px-6 font-muli`}
  text-decoration-color: rgb(119, 124, 155);
  text-rendering: optimizeLegibility;
`;
const NavBar: React.FC = () => (
  <Nav>
    <Content>
      <Link to="/">
        <LogoImage src={logo} alt="Logo Matias Hernandez" />
      </Link>
      <Menu style={{ justifySelf: "end" }}>
        <MenuItem to="/">Blog</MenuItem>
        <MenuItem to="https://presentacines.matiashernandez.dev">
          Charlas
        </MenuItem>
        <MenuItem to="https://braindump.matiashernandez.dev">Notas</MenuItem>
        <MenuItem to="/about">Sobre mi</MenuItem>
        <MenuItem to="/newsletter">Newsletter</MenuItem>
      </Menu>
    </Content>
  </Nav>
);

export default NavBar;
