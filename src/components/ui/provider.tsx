"use client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
// @ts-expect-error haven't check yet why ColorModeProviderProps produce error
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
