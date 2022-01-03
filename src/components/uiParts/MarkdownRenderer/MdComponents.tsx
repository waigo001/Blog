import React from "react";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { isURL } from "src/utils";
import CodeBlock from "../CodeBlock";

export const MdComponents: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {};
