import tw, { styled } from "twin.macro";

export default styled.h1`
  ${tw`text-gray-900 dark:text-gray-100 text-4xl font-muli font-bold text-left self-center`}
  span {
    ${tw`no-underline text-red hover:underline cursor-pointer`}
  }
`;
