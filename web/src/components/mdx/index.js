import React from "react";
import tw, { styled } from "twin.macro";

import { H1, H2, H3 } from "./Subtitle";
import Paragraph from "./Paragraph";

import Link from "../Link";
import Converkit from "../Converkit";

const UL = tw.ul`font-muli text-lg text-gray-900 dark:text-gray-100 px-8 list-disc max-w-screen-md mx-auto
`;
const LI = tw.li`font-muli text-lg text-gray-900 dark:text-gray-100 py-8`;

const A = tw.a`
no-underline transform transition duration-300 inline-block font-muli font-bold text-blue-700 hover:text-blue-800 dark:text-sepia-400 dark:hover:text-sepia-500
`;

const QuoteWrapper = tw.aside`
  text-lg mb-4 mt-3 border-l-4 border-blue-600 rounded italic bg-blue-200
  dark:bg-steel-900 dark:text-gray-200
  relative
  mt-4 mb-8 py-4
`;

const QuoteIconWrapper = tw.div`
  text-blue-600 absolute top-0 left-0
  transform -translate-y-2/4 -translate-x-2/4
  rounded-full
  bg-blue-50
  p-2
`;

const QuoteContent = styled.div`
  p {
    ${tw`text-blue-600 max-w-full px-4`}
  }
  h2 {
    ${tw`text-blue-600 max-w-full px-4`}
  }
`;
const QuoteIcon = () => {
  return (
    <i style={{ display: "inline-block" }} fill="currentColor">
      <svg
        fill="none"
        height="32"
        width="32"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12" y2="8"></line>
      </svg>
    </i>
  );
};

const BlockQuote = (props) => {
  return (
    <QuoteWrapper>
      <QuoteIconWrapper>
        <QuoteIcon />
      </QuoteIconWrapper>
      <QuoteContent>{props.children}</QuoteContent>
    </QuoteWrapper>
  );
};

export const MDXLayoutComponents = {
  h1: (props) => <H1 {...props} />,
  h2: (props) => <H2 {...props} />,
  h3: (props) => <H3 {...props} />,
  p: (props) => <Paragraph {...props} />,
  ul: (props) => <UL {...props} />,
  a: (props) => <A {...props} />,
  blockquote: (props) => <BlockQuote {...props} />,
};

export const MDXGlobalComponents = {
  Link,
  Converkit,
};
