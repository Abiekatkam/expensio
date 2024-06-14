import {
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
  subWeeks,
  addMonths,
  addYears,
  differenceInMonths,
  differenceInYears,
  isAfter,
  isFuture,
  isToday,
  isValid,
  subMonths,
  subYears,
} from "date-fns";
import { format } from "date-fns";
import { views } from "./urls";

export const dateFormat = "yyyy-MM-dd";
export const datePattern = "d{2}-d{2}-d{4}";

export const getRangeDateForFilter = (filter) => {
  const dateObj = new Date();
  if (filter === views.pastWeek.key) {
    return [
      format(subWeeks(startOfWeek(dateObj), 1), dateFormat),
      format(subWeeks(endOfWeek(dateObj), 1), dateFormat),
    ];
  } else if (filter === views.pastMonth.key) {
    return [
      format(subMonths(startOfMonth(dateObj), 1), dateFormat),
      format(subMonths(endOfMonth(dateObj), 1), dateFormat),
    ];
  } else if (filter === views.thisWeek.key) {
    return [
      format(startOfWeek(dateObj), dateFormat),
      format(endOfWeek(dateObj), dateFormat),
    ];
  } else {
    return [
      format(startOfMonth(dateObj), dateFormat),
      format(endOfMonth(dateObj), dateFormat),
    ];
  }
};

export const calculateRenewalDate = (date, paid) => {
  const startDate = new Date(date);
  const today = new Date();

  if (isFuture(startDate)) {
    return startDate;
  }

  if (paid === "monthly") {
    const monthlyDate = addMonths(
      startDate,
      differenceInMonths(today, startDate)
    );
    if (isToday(monthlyDate) && !isToday(startDate)) return today;
    return addMonths(monthlyDate, 1);
  }

  const yearRenewalDate = addYears(
    startDate,
    differenceInYears(today, startDate)
  );
  if (isToday(yearRenewalDate) && !isToday(startDate)) return today;
  return addYears(yearRenewalDate, 1);
};

export const calculatePrevRenewalDate = (date, paid) => {
  let previousRenewalDate = null;
  const startDate = new Date(date);

  if (isFuture(startDate)) {
    return startDate;
  }

  if (paid === "monthly") {
    previousRenewalDate = subMonths(date, 1);
    return previousRenewalDate > startDate ? previousRenewalDate : startDate;
  }

  previousRenewalDate = subYears(date, 1);
  return previousRenewalDate > startDate ? previousRenewalDate : startDate;
};

export const calculatePaidDates = (datum, start, end) => {
  if (!start || !end) return [];

  const hasValidCancelledAt =
    !datum.active &&
    datum.cancelled_at !== null &&
    isValid(new Date(datum.cancelled_at));
  const startDate = new Date(datum.date);
  const rangeStartDate = new Date(start);
  const rangeEndDate = hasValidCancelledAt
    ? new Date(datum.cancelled_at)
    : new Date(end);
  let startDateCount = 1;
  let noOfPaidDurations = 0;

  if (isAfter(startDate, rangeStartDate) && isAfter(startDate, new Date(end))) {
    return [];
  }

  if (datum.paid === "monthly") {
    if (!isFuture(startDate)) {
      noOfPaidDurations =
        differenceInMonths(rangeEndDate, startDate) + startDateCount;
    }
  } else {
    if (!isFuture(startDate)) {
      noOfPaidDurations =
        differenceInYears(rangeEndDate, startDate) + startDateCount;
    }
  }

  if (noOfPaidDurations < 0) return [];

  return [...Array(noOfPaidDurations).keys()]
    .map((_, index) => {
      return addMonths(startDate, index);
    })
    .filter((rD) => rD >= rangeStartDate && rD <= rangeEndDate);
};
