import { DateTime } from "luxon";

type ApplicationItems = { created_at: string }[];

type Output<TKey extends string> = ({ date: string } & Record<TKey, number>)[];

export const toChartData = <TKey extends string>(
  daysRange: DateTime[],
  itemsData: Record<TKey, ApplicationItems>,
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

  Object.entries<ApplicationItems>(itemsData).forEach(([key, data]) => {
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
