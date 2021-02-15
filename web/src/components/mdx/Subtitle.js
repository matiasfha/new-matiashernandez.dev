import tw, { styled } from "twin.macro";

export const H1 = styled.h1`
  ${tw`text-gray-900 dark:text-gray-100 text-4xl font-muli font-bold text-left self-center`}
  span {
    ${tw`no-underline text-red hover:underline cursor-pointer`}
  }
`;

export const H2 = tw.h2`
  text-lg md:text-xl text-gray-900 dark:text-gray-200 font-chivo font-bold leading-8
`;

export const H3 = tw.h3`
  text-base md:text-lg text-gray-900 dark:text-gray-200 font-chivo font-bold leading-8
`;
