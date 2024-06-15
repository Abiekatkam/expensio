import { expensesCategory } from "@/components/constant/category";
import { formatDate } from "./formats";

const dateStyle = { day: "2-digit", year: "2-digit", month: "short" };

export const sortByKey = (arr, key) => {
  return arr.sort((a, b) => (a[key] < b[key] ? 1 : -1));
};

export const extractExpenses = (data, locale) => {
  const groupByDate = data.reduce((acc, datum) => {
    const date = formatDate({ date: datum.date, locale, dateStyle });
    acc[date] = acc[date]
      ? {
          ...acc[date],
          [datum.category]: acc[date][datum.category]
            ? acc[date][datum.category] + Number(datum.price)
            : Number(datum.price),
        }
      : { date, [datum.category]: Number(datum.price) };

    return acc;
  }, {});

  return Object.values(groupByDate).reverse();
};

export const extractExpensesCategory = (data) => {
  return Object.keys(
    data.reduce((acc, datum) => {
      acc[datum.category] = true;
      return acc;
    }, {})
  );
};

export const extractSubscriptions = (data) => {
  return data.reduce((acc, c) => {
    acc.push({
      name: c.name,
      price: Number(c.price) * Number(c.paid_dates.length),
    });
    return acc;
  }, []);
};

export const extractSubscriptionsCategories = (data) => {
  return data.reduce((acc, datum) => {
    acc.push(datum.name);
    return acc;
  }, []);
};

export const extractRecentData = (
  expenses,
  subscriptions,
  investments,
  income
) => {
  if (expenses.length || investments.length || income.length) {
    const allData = [
      ...subscriptions.map((datum) => ({
        ...datum,
        from: "subcriptions",
        category: "subcriptions",
      })),
      ...expenses.map((datum) => ({ ...datum, from: "expenses" })),
      ...investments.map((datum) => ({ ...datum, from: "investments" })),
      ...income.map((datum) => ({ ...datum, from: "income" })),
    ];
    return sortByKey(allData, "updated_at").filter((_, index) => index <= 4);
  }
  return [];
};

const sortValueByAsc = (a, b) => (a.value > b.value ? -1 : 1);

export const extractTopExpenseCategories = (data) => {
  const dataMap = data.reduce((acc, datum) => {
    acc[datum.category] = {
      name: `${expensesCategory[datum.category]?.emoji}  ${datum.category}`,
      value: acc[datum.category]
        ? Number(acc[datum.category].value) + Number(datum.price)
        : Number(datum.price),
    };

    return acc;
  }, {});

  return Object.values(dataMap)
    .sort(sortValueByAsc)
    .filter((_, index) => index <= 5);
};
