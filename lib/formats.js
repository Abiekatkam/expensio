const defaultCurrency = "INR";
const defaultLocale = "en-IN";
const defaultDateStyle = { day: "2-digit", month: "short", year: "numeric" };
const currencyStyle = {
  style: "currency",
  currency: "",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
};

export const chartThemeConfig = {
  background: "#09090a",
  text: {
    fill: "#ffffff",
  },
  legends: {
    title: {
      text: {
        fill: "#ffffff",
      },
    },
    text: {
      fill: "#ffffff",
    },
  },
  axis: {
    ticks: {
      text: {
        fill: "#ffffff",
      },
    },
  },
  tooltip: {
    container: {
      background: "#ffffff",
      color: "#09090a",
    },
  },
};

export const formatCurrency = ({
  value,
  currency = defaultCurrency,
  locale = defaultLocale,
}) => {
  try {
    return new Intl.NumberFormat(locale, { ...currencyStyle, currency })
      .format(value)
      .replace(/^(\D+)/, "$1 ");
  } catch {
    return value;
  }
};

export const formatDate = ({
  date,
  locale = defaultLocale,
  dateStyle = defaultDateStyle,
}) => {
  try {
    return new Intl.DateTimeFormat(locale, dateStyle).format(new Date(date));
  } catch {
    return date;
  }
};

export const getCurrencySymbol = (
  currency = defaultCurrency,
  locale = defaultLocale
) => {
  try {
    return new Intl.NumberFormat(locale, { ...currencyStyle, currency })
      ?.formatToParts(1)
      ?.find((x) => x.type === "currency")?.value;
  } catch {
    return "";
  }
};
