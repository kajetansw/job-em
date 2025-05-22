import { DateTime } from "luxon";
import type React from "react";
import { createContext, useContext, useState } from "react";

interface FiltersContextType {
  dateRange: {
    start: DateTime;
    end: DateTime;
    set: (start: DateTime, end: DateTime) => void;
  };
}

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
  const [filters, setFilters] = useState({
    range: {
      start: DateTime.now().minus({ week: 2 }),
      end: DateTime.now(),
    },
  });
  const setDateRange = (start: DateTime, end: DateTime) => {
    setFilters((prev) => ({
      ...prev,
      range: { start, end },
    }));
  };

  return (
    <FiltersContext.Provider
      value={{
        dateRange: {
          ...filters.range,
          set: setDateRange,
        },
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
