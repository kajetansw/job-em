"use client";

import { MantineProvider, createTheme } from "@mantine/core";
import { FiltersContextProvider } from "./filters";

const theme = createTheme({
  /** Put your mantine theme override here */
});

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <FiltersContextProvider>{children}</FiltersContextProvider>
    </MantineProvider>
  );
};
