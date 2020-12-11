import React from 'react'

import tw, { styled } from 'twin.macro'
import logo from './logo.png'
import Link from '@/components/Link'
import Grid from '@/components/Grid'
import Cta from '@/components/Cta'
const Nav = tw.nav`
  h-16 max-w-full px-4 md:px-8 lg:w-auto pt-4
`
const Content = tw(Grid)`
grid-flow-col grid-cols-3 justify-between md:grid-cols-4
`
const LogoImage = tw.img`
  h-12 w-12
`
const Menu = tw.div`
self-end text-white col-span-2 lg:self-center md:col-span-3 self-center
`

const MenuItem = styled(Link)`
  ${tw`text-gray-800 hover:text-gray-500   no-underline text-base px-6 font-chivo hidden md:inline-block`}
  font-feature-settings: "liga", "kern", "clig", "calt";
  font-size: 17.600000381469727px;
  line-height: 22px;
  text-decoration: none;
  text-decoration-color: rgb(119, 124, 155);
  text-decoration-line: none;
  text-decoration-skip: objects;
  text-decoration-style: solid;
  text-rendering: optimizeLegibility;
  transition-delay: 0s;
  transition-duration: 0.4s;
  transition-property: all;
  transition-timing-function: ease;
  white-space: pre-line;
  width: auto;
  word-wrap: break-word;
  &:hover {
    transition: 0.5s;
  }
`
const NavBar: React.FC = () => (
  <Nav>
    <Content>
      <Link to="/">
        <LogoImage src={logo} alt="Logo Matias Hernandez" />
      </Link>
      <Menu style={{ justifySelf: 'end' }}>
        <MenuItem to="/">Blog</MenuItem>
        <MenuItem to="/">Charlas</MenuItem>
        <MenuItem to="/">Notas</MenuItem>
        <MenuItem to="/">Sobre mi</MenuItem>
        <MenuItem to="/">Newsletter</MenuItem>
      </Menu>
    </Content>
  </Nav>
)

export default NavBar
