import { DateTime } from "luxon";

export const sort = (dates: DateTime[]) => {
  return dates
    .map((d) => d.toMillis())
    .toSorted()
    .map((d) => DateTime.fromMillis(d));
};
