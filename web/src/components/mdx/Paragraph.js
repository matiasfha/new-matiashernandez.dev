import tw, { styled } from "twin.macro";

export default styled.p`
  ${tw`text-gray-900 dark:text-gray-100 font-muli text-lg max-w-screen-md mx-auto pt-4 pb-4`};
  a {
    ${tw`dark:text-sepia-400 dark:hover:text-sepia-500!`};
  }
`;
