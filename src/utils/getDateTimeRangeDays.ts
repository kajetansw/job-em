import { type DateTime, Interval } from "luxon";

export const getDateTimeRangeDays = (minDate: DateTime, maxDate: DateTime) =>
  Interval.fromDateTimes(minDate, maxDate)
    .splitBy({ day: 1 })
    .map((d) => d.start?.startOf("day"))
    .filter((date): date is DateTime => date !== null);
