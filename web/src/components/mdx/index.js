import React from "react";
import twin from "twin.macro";

import Title from "./Title";
import Subtitle from "./Subtitle";
import Paragraph from "./Paragraph";

import Link from "../Link";
import Converkit from "../Converkit";

const UL = twin.ul`font-muli text-lg text-gray-900
`;

const A = twin.a`
no-underline transform transition duration-300 inline-block font-muli font-bold text-blue-700 hover:text-blue-800 dark:text-sepia-400 dark:hover:text-sepia-500
`;
export const MDXLayoutComponents = {
  h1: (props) => <Title {...props} />,
  h2: (props) => <Subtitle {...props} />,
  p: (props) => <Paragraph {...props} />,
  ul: (props) => <UL {...props} />,
  a: (props) => <A {...props} />,
};

export const MDXGlobalComponents = {
  Link,
  Converkit,
};
