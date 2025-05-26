"use client";

import { useFilters } from "@/context/filters";
import { DatePickerInput } from "@mantine/dates";
import { DateTime } from "luxon";

export const FiltersDateRangePicker = () => {
  const { dateRange } = useFilters();
  const start = dateRange.start.toISODate();
  const end = dateRange.end.toISODate();

  return (
    <DatePickerInput
      type="range"
      placeholder="Pick dates range"
      value={[start, end]}
      onChange={([startDateISO, endDateISO]) =>
        dateRange.set(
          DateTime.fromISO(startDateISO),
          DateTime.fromISO(endDateISO),
        )
      }
      mr="lg"
      clearable
      clearButtonProps={{
        onClick: dateRange.reset,
      }}
    />
  );
};
