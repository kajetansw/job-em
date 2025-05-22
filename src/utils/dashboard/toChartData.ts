import type { JobApplication } from "@/models/jobApplication";
import { DateTime } from "luxon";

type Output<TKey extends string> = ({ date: string } & Record<TKey, number>)[];

export const toChartData = <TKey extends string>(
  daysRange: DateTime[],
  itemsData: Record<TKey, JobApplication[]>,
): Output<TKey> => {
  const formatDate = (date: DateTime) => date.toFormat("LLL dd, y");

  const result: Record<string, Record<TKey, number>> = {};

  daysRange.forEach((date) => {
    const formattedDate = formatDate(date);
    if (!result[formattedDate]) {
      result[formattedDate] = {} as Record<TKey, number>;
    }
    Object.keys(itemsData).forEach((key) => {
      result[formattedDate][key as TKey] = 0;
    });
  });

  Object.entries<JobApplication[]>(itemsData).forEach(([key, data]) => {
    data.forEach((item) => {
      const formattedDate = formatDate(DateTime.fromISO(item.created_at));
      if (result[formattedDate]) {
        result[formattedDate][key as TKey]++;
      }
    });
  });

  return Object.entries(result).map(([date, counts]) => ({
    date,
    ...counts,
  }));
};

export const toAggregatedChartData = <TKey extends string>(
  daysRange: DateTime[],
  itemsData: Record<TKey, JobApplication[]>,
): Output<TKey> => {
  const formatDate = (date: DateTime) => date.toFormat("LLL dd, y");

  const result: Record<string, Record<TKey, number>> = {};
  let currentCount = 0;

  for (const currentDay of daysRange) {
    for (const [key, items] of Object.entries<JobApplication[]>(itemsData)) {
      const formattedDate = formatDate(currentDay);
      const itemsForDay = items.filter(
        (item) =>
          formatDate(DateTime.fromISO(item.created_at)) === formattedDate,
      );
      const activeItems = itemsForDay;
      const inactiveItems = items.filter(
        (item) =>
          item.updated_at &&
          formatDate(DateTime.fromISO(item.updated_at)) === formattedDate &&
          item.status === "REJECTED",
      );

      currentCount += activeItems.length - inactiveItems.length;

      if (!result[formattedDate]) {
        result[formattedDate] = {} as Record<TKey, number>;
      }

      result[formattedDate][key as TKey] = currentCount;
    }
  }

  return Object.entries(result).map(([date, counts]) => ({
    date,
    ...counts,
  }));
};
