import React from "react";
import tw, { styled } from "twin.macro";
import { useStaticQuery, graphql } from "gatsby";
import Twitter from "../../assets/twitter-brands.svg";
import Egghead from "../../assets/egghead.svg";
import Github from "../../assets/github-brands.svg";

const Container = tw.div`
text-center font-muli text-gray-500 py-4 w-3/5 h-80 text-xl mx-auto my-0 border-t-2 border-gray-300`;

const Social = styled.div`
  ${tw`flex flex-row items-center justify-start w-48 mx-auto my-0 py-4`}
  a {
    ${tw`no-underline w-40`}
    svg {
      ${tw`transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110`}
    }
  }
`;

const Input = styled.input`
  ${tw`w-60 h-5 shadow rounded border-0 p-3 border-2 border-solid border-gray-300 outline-none transition duration-300 text-base`}
  &:hover {
    border-color: rgb(4, 67, 172);
  }
`;

const Button = styled.button`
  ${tw`h-12 text-white font-muli ml-2 text-base font-semibold rounded px-4 appearance-none overflow-hidden relative
  transition duration-200 ease-in bg-blue-900 hover:bg-blue-800 cursor-pointer border-0
`}
`;

const MadeWith = styled.p`
  ${tw`text-sm pt-8`}
  a {
    ${tw`text-blue-900 no-underline`}
  }
`;
export const EmailSignup = ({}) => {
  return (
    <form
      action="https://app.convertkit.com/forms/1902022/subscriptions"
      method="post"
    >
      <Input
        name="email_address"
        placeholder="Tu email"
        required=""
        type="email"
      />
      <Button>Suscríbete</Button>
    </form>
  );
};

const Footer = () => {
  return (
    <Container>
      <hr />
      <Social>
        <a href="https://twitter.com/matiasfha">
          <Twitter width="40px" height="40px" />
        </a>
        <a href="http://egghead.io/instructors/matias-francisco-hernandez-arellano?af=4cexzz">
          <Egghead width="40px" height="40px" />
        </a>
        <a href="https://github.com/matiasfha">
          <Github width="40px" height="40px" />
        </a>
      </Social>
      <p>
        {" "}
        Mantente al día con mas Javascript, React, Typescript y otros temas de
        interés
      </p>
      <p style={{ fontSize: "2rem" }}>🎉 📩 🎉</p>
      <EmailSignup />
      <MadeWith>
        Hecho full JamStack con <a href="">Gatsby</a>, <a href="">Sanity.io</a>.
        Hosteado en <a href="">Netlify</a>.
      </MadeWith>
    </Container>
  );
};

export default Footer;
