const isProduction = process.env.NODE_ENV === "production";

export const cookieTokenName = "ExpensioCreds";
export const usagePlan = {
  basicPlan: { limit: 100, name: "basic" },
  premiumPlan: { limit: 1000, name: "premium" },
};

const domain = "127.0.0.1:3000";
const local = "localhost:3000";
const home = isProduction ? domain : local;

export const applicationClientUrls = {
  auth: {
    register: "/register",
    login: "/login",
  },
  social: {
    github: "https://github.com/Abiekatkam",
    linkedin: "https://linkedin.com/in/abhishek-katkam-988744231/",
    twitter: "https://twitter.com/AbhishekKatkam9",
    githubRepo: "https://github.com/Abiekatkam/expensio",
    portfolio: "https://portfolio-hxpmwalhk-abiekatkams-projects.vercel.app/",
    appLogoUrl:
      "https://private-user-images.githubusercontent.com/101975840/338530022-e36b12b8-7894-4a56-8ebc-403ddb04230c.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTgyNTQwNjAsIm5iZiI6MTcxODI1Mzc2MCwicGF0aCI6Ii8xMDE5NzU4NDAvMzM4NTMwMDIyLWUzNmIxMmI4LTc4OTQtNGE1Ni04ZWJjLTQwM2RkYjA0MjMwYy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNjEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDYxM1QwNDQyNDBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iN2JkOTlkZDQ2Y2Y4MWU4OTU2NDk2OTczMzM2Y2NjMWQ5MTlhMDJjYTRiYjY5ZTMwZGI5ODExNzdjMTYyMzBmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.D5Cvn0Qd-T2Cuk3nrgyYxD52kbU6fLgxL3U89Du5e7w",
  },
  config: {
    currentYear: new Date().getFullYear(),
    application: "Expensio | Abhishek Katkam",
    appName: "Expensio",
    developerName: "Abhishek Katkam",
    premiumPlan: {
      usageLimit: 1000,
    },
  },
  host: {
    home: `${isProduction ? "https://" : "http://"}${home}`,
  },
};

export const applicationServerUrls = {
  auth: {
    register: "/api/auth/register",
    login: "/api/auth/login",
  },
  user: {
    modify: "/api/user",
  },
  feedback: {
		add: "/api/feedback",
	},
};
