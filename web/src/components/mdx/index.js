import React from "react";
import twin from "twin.macro";

import { H1, H2, H3 } from "./Subtitle";
import Paragraph from "./Paragraph";

import Link from "../Link";
import Converkit from "../Converkit";

const UL = twin.ul`font-muli text-lg text-gray-900
`;

const A = twin.a`
no-underline transform transition duration-300 inline-block font-muli font-bold text-blue-700 hover:text-blue-800 dark:text-sepia-400 dark:hover:text-sepia-500
`;
export const MDXLayoutComponents = {
  h1: (props) => <H1 {...props} />,
  h2: (props) => <H2 {...props} />,
  h3: (props) => <H3 {...props} />,
  p: (props) => <Paragraph {...props} />,
  ul: (props) => <UL {...props} />,
  a: (props) => <A {...props} />,
};

export const MDXGlobalComponents = {
  Link,
  Converkit,
};
