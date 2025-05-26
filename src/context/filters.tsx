import type { DeepPartial } from "@/utils/types";
import { DateTime } from "luxon";
import { parseAsTimestamp, useQueryState } from "nuqs";
import type React from "react";
import { createContext, useContext } from "react";

interface FiltersContextType {
  dateRange: {
    start: DateTime;
    end: DateTime;
    set: (start: DateTime, end: DateTime) => void;
    reset: () => void;
  };
}

export const initialFilters = {
  dateRange: {
    start: DateTime.now().minus({ week: 2 }).startOf("day"),
    end: DateTime.now().startOf("day"),
  },
} satisfies DeepPartial<FiltersContextType>;

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersContextProvider");
  }
  return context;
};

export const FiltersContextProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [start, setStart] = useQueryState(
    "start",
    parseAsTimestamp.withDefault(initialFilters.dateRange.start.toJSDate()),
  );
  const [end, setEnd] = useQueryState(
    "end",
    parseAsTimestamp.withDefault(initialFilters.dateRange.end.toJSDate()),
  );

  const setDateRange = (start: DateTime, end: DateTime) => {
    setStart(start.toJSDate());
    setEnd(end.toJSDate());
  };
  const resetDateRange = () => {
    setStart(initialFilters.dateRange.start.toJSDate());
    setEnd(initialFilters.dateRange.end.toJSDate());
  };

  const filtersRange = {
    start: DateTime.fromJSDate(start),
    end: DateTime.fromJSDate(end),
    set: setDateRange,
    reset: resetDateRange,
  };

  return (
    <FiltersContext.Provider
      value={{
        dateRange: filtersRange,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
