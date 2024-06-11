const isProduction = process.env.NODE_ENV === "production";

export const cookieTokenName = "ExpensioCreds";

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
      "https://github-production-user-asset-6210df.s3.amazonaws.com/101975840/338530022-e36b12b8-7894-4a56-8ebc-403ddb04230c.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240611%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240611T100353Z&X-Amz-Expires=300&X-Amz-Signature=7c2e3adc61349ec4b087764194b152b8c7f4e2872e6a670e918acb2ce9e68a60&X-Amz-SignedHeaders=host&actor_id=101975840&key_id=0&repo_id=811695280",
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
  host: {
    home: `${isProduction ? "https://" : "http://"}${home}`,
  },
};

export const applicationServerUrls = {
  auth: {
    register: "/api/auth/register",
    login: "/api/auth/login",
  },
};
