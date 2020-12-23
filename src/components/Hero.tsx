import React from "react";
import tw, { styled } from "twin.macro";
import GridDefault from "@/components/Grid";

import Twitter from "../../assets/twitter-brands.svg";
import Egghead from "../../assets/egghead.svg";
import Github from "../../assets/github-brands.svg";
import photo from "@/images/photo.png";

const Social = styled.div`
  ${tw`flex flex-row items-center justify-start w-48`}
  a {
    ${tw`no-underline h-40 w-40`}
    svg {
      ${tw`transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110`}
    }
  }
`;
const Container = styled.div`
  ${tw`max-w-full h-60 pt-8`}
  p {
    ${tw`text-gray-900`}
  }
`;
const Grid = styled(GridDefault)`
  ${tw`font-muli`}
  grid-template-columns: 2fr 1fr;
`;

const H1 = styled.h1`
  ${tw`text-gray-900 text-2xl md:text-4xl font-muli font-bold text-left self-center`}
  span {
    ${tw`no-underline  hover:underline cursor-pointer`}
  }
`;
const Photo = styled.img`
  justify-self: end;
  ${tw`hidden md:block object-cover object-center w-52 h-52 rounded-full`};
`;

const Hero: React.FC = ({ children, ...props }) => {
  return (
    <Container {...props}>
      <Grid>
        <div>
          <H1>Hola, soy Matías!</H1>
          <p>
            Soy un Ingeniero de Sofware Chileno, me gusta compartir lo que
            aprendo. Me guío por la idea de "Learn in Public". Así que
            bienvenido a mi pequeño espacio en internet, mi "jardín digital".
          </p>
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
        </div>
        <Photo src={photo} />
      </Grid>
    </Container>
  );
};

export default Hero;
