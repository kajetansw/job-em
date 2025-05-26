"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { FiltersContextProvider } from "./filters";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <NuqsAdapter>
        <FiltersContextProvider>{children}</FiltersContextProvider>
      </NuqsAdapter>
    </MantineProvider>
  );
};
