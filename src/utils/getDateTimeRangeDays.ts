import { type DateTime, Interval } from "luxon";

export const getDateTimeRangeDays = (minDate: DateTime, maxDate: DateTime) => {
  // TODO write tests
  // We are adding a second to ensure that the interval ends with the provided day as well
  return Interval.fromDateTimes(minDate, maxDate.plus({ second: 1 }))
    .splitBy({ day: 1 })
    .map((d) => d.start?.startOf("day"))
    .filter((date): date is DateTime => date !== null);
};
