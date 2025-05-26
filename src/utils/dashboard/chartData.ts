import {
  INACTIVE_APPLICATION_STATUSES,
  type JobApplication,
} from "@/models/jobApplication";
import { DateTime } from "luxon";
import { getDateTimeRangeDays } from "../dates/getDateTimeRangeDays";
import { sort } from "../dates/sort";

type Output<TKey extends string> = ({ date: string } & Record<TKey, number>)[];

export const toSentChartData = <TKey extends string>(
  daysRange: DateTime[],
  itemsData: Record<TKey, JobApplication[]>,
): Output<TKey> => {
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

export const toActiveChartData = <TKey extends string>(
  daysRange: DateTime[],
  itemsData: Record<TKey, JobApplication[]>,
): Output<TKey> => {
  const visibleDays = new Set(daysRange.map(formatDate));

  const result: Record<string, Record<TKey, number>> = {};
  let currentCount = 0;

  const getCalculationDates = () => {
    const itemsDates = Object.values<JobApplication[]>(itemsData)
      .flat()
      .map((item) => DateTime.fromISO(item.created_at));
    const sorted = sort(itemsDates);

    if (sorted.length < 2 || daysRange.length < 2) {
      return [];
    }

    const first = DateTime.min(sorted[0], daysRange[0]);
    const last = DateTime.max(sorted.at(-1)!, daysRange.at(-1)!);

    return getDateTimeRangeDays(first, last);
  };

  for (const currentDay of getCalculationDates()) {
    for (const [key, items] of Object.entries<JobApplication[]>(itemsData)) {
      const formattedDate = formatDate(currentDay);
      const itemsForDay = items.filter(
        (item) =>
          formatDate(DateTime.fromISO(item.created_at)) === formattedDate,
      );
      const inactiveItems = items.filter(
        (item) =>
          item.updated_at &&
          formatDate(DateTime.fromISO(item.updated_at)) === formattedDate &&
          (INACTIVE_APPLICATION_STATUSES as string[]).includes(item.status),
      );

      currentCount += itemsForDay.length - inactiveItems.length;

      if (!result[formattedDate]) {
        result[formattedDate] = {} as Record<TKey, number>;
      }

      result[formattedDate][key as TKey] = currentCount;
    }
  }

  return Object.entries(result)
    .filter(([date]) => visibleDays.has(date))
    .map(([date, counts]) => ({
      date,
      ...counts,
    }));
};

/*
 * utils
 */

const formatDate = (date: DateTime) => date.toFormat("LLL dd, y");
