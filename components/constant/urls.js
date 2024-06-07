const isProduction = process.env.NODE_ENV === "production";

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
  },
  config: {
    currentYear: new Date().getFullYear(),
    application: "Expensio | Abhishek Katkam",
    appName: "Expensio",
    developerName: "Abhishek Katkam",
    premiumPlan: {
      usageLimit: 2000,
    },
  },
  host:{
      home: `${isProduction ? "https://" : "http://"}${home}`,
  }
};


