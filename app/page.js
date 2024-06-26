import { applicationClientUrls } from "@/components/constant/urls";
import Link from "next/link";
import { FaGithub, FaLink, FaLinkedin } from "react-icons/fa";
import { FaCircleCheck, FaIndianRupeeSign, FaXTwitter } from "react-icons/fa6";

const Home = () => {
  return (
    <div className="relative h-full text-[#13131A]">
      <header className="relative m-auto h-[56px] max-w-4xl pt-3">
        <div className="absolute left-0 right-0 top-3 z-20 flex items-center justify-between">
          <Link
            href={"/"}
            className="flex max-w-[180px] items-center gap-2 p-3 text-2xl group"
          >
            <span className="w-10 h-10 flex items-center justify-center shadow-lg group-hover:rotate-12 text-white group-hover:bg-black/90 rounded-full bg-black transition-all ease-in duration-200">
              <FaIndianRupeeSign />
            </span>
            <span className="font-black tracking-[-0.03em] text-[#13131A] group-hover:text-[#13131A]/90 transition-all ease-in duration-200">
              Expensio
            </span>
          </Link>
          <Link
            href={applicationClientUrls.auth.login}
            className="leading-2 mr-4 inline-flex h-[34px] items-center overflow-hidden rounded-md text-white bg-gray-900 px-4 py-1 text-sm font-medium transition hover:bg-primary/90"
          >
            Login
          </Link>
        </div>
      </header>
      <main>
        <div className="absolute top-0 -z-10 h-full w-full bg-white">
          <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
        </div>
        <div className="mx-auto mb-16 mt-16 max-w-md px-3 text-center sm:max-w-3xl sm:px-0">
          <h1 className="mt-4	text-4xl font-black leading-[1.15] tracking-[-0.03em] text-black sm:text-5xl sm:leading-[1.15]">
            Simplifying Financial Oversight with Advanced Expense Tracking and
            Management
          </h1>
          <p className="mt-3 text-base font-normal leading-6 tracking-tight sm:text-lg">
            Expensio empowers users with intuitive features for effortless
            expense tracking and comprehensive financial management, ensuring
            streamlined budgeting and compliance.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href={applicationClientUrls.auth.register}
              className="inline-flex h-[34px] items-center justify-center rounded-md text-white bg-gray-900 px-4 py-2.5 text-md font-medium hover:bg-primary/90 hover:shadow"
            >
              Get Started
            </Link>
            <Link
              target="_blank"
              href={applicationClientUrls.social.githubRepo}
              className="ml-6 inline-flex h-[34px] items-center justify-center gap-1 rounded-md bg-white/0 px-4 py-2.5 text-md font-medium text-[#13131A] ring-1 ring-[#13131A]/10 hover:bg-gray-100 hover:shadow"
            >
              <FaGithub />
              Star on GitHub
            </Link>
          </div>
        </div>

        <div className="mx-auto mb-16 mt-32 grid max-w-md justify-center px-3 text-center sm:px-0 md:max-w-[600px]">
          <h2 className="mt-0 text-3xl font-extrabold tracking-[-0.03em] text-black sm:text-4xl">
            Pricings Plans
          </h2>
          <div className="mt-8 flex w-full flex-col sm:flex-row">
            <div className="min-w-[330px] divide-y divide-gray-600 rounded-lg border border-slate-800 text-left shadow-lg sm:mr-8">
              <div className="p-5 py-6">
                <h2 className="text-3xl font-extrabold leading-6">Basic</h2>
                <p className="mb-2 mt-2 text-[#13131A]">
                  Free forever with limits.
                </p>
                <p className="mt-4 flex  items-center">
                  <span className="text-3xl font-extrabold flex items-center"><FaIndianRupeeSign /> {" "} 0</span>
                  {" "}<span className="text-base  text-[#13131A]"> per year</span>
                </p>
                <div className="mb-0 ml-1 mt-4 flex flex-col justify-center text-left ">
                  <span className="m-1 ml-0 flex items-center  text-[15px]">
                    <FaCircleCheck className="mr-1 h-4 w-4 text-green-600" />
                    Trend visualisation with charts
                  </span>
                  <span className="m-1 ml-0 flex items-center text-[15px]">
                    <FaCircleCheck className="mr-1 h-4 w-4 text-green-600" />
                    <span>Add up to 200 entries per account</span>
                  </span>
                  <span className="m-1 ml-0 flex items-center text-[15px]">
                    <FaCircleCheck className="mr-1 h-4 w-4 text-green-600" />
                    Track subscription billing dates
                  </span>
                  <span className="m-1 ml-0 flex items-center text-[15px]">
                    <FaCircleCheck className="mr-1 h-4 w-4 text-green-600" />
                    Choose preferred currency display
                  </span>
                  <span className="m-1 ml-0 flex items-center text-[15px]">
                    <FaCircleCheck className="mr-1 h-4 w-4 text-green-600" />
                    Email support available
                  </span>
                </div>
                <a
                  className="leading-2 w-full inline-flex h-[34px] items-center justify-center mt-8 overflow-hidden rounded-md text-white bg-gray-900 px-4 py-1 text-sm font-medium transition hover:bg-primary/90"
                  href={applicationClientUrls.auth.register}
                >
                  Start for free
                </a>
              </div>
            </div>
            <div className="bg-pro-plan mt-8  min-w-[330px] divide-y divide-gray-600 rounded-lg border border-slate-800 text-left shadow-lg sm:mt-0">
              <div className="p-5 py-6">
                <h2 className="text-3xl font-extrabold leading-6">Premium</h2>
                <p className="mb-2 mt-2 text-[#13131A]">
                  Access to all premium features.
                </p>
                <p className="mt-4 flex  items-center">
                  <span className="text-3xl font-extrabold flex items-center"><FaIndianRupeeSign /> {" "} 50</span>
                  {" "}<span className="text-base  text-[#13131A]"> per year</span>
                </p>
                <div className="mb-0 ml-1 mt-4 flex flex-col justify-center text-left ">
                  <span className="m-1 ml-0 flex items-center  text-[15px]">
                    <FaCircleCheck className="mr-1 h-4 w-4 text-green-600" />
                    Everything in Basic plan
                  </span>
                  <span className="m-1 ml-0 flex items-center text-[15px]">
                    <FaCircleCheck className="mr-1 h-4 w-4 text-green-600" />
                    <span>
                      Add up to{" "}
                      {applicationClientUrls.config.premiumPlan.usageLimit}{" "}
                      entries per account
                    </span>
                  </span>
                  <span className="m-1 ml-0 flex items-center text-[15px]">
                    <FaCircleCheck className="mr-1 h-4 w-4 text-green-600" />
                    <span>Advanced trend visualisation</span>
                  </span>
                  <span className="m-1 ml-0 flex items-center text-[15px]">
                    <FaCircleCheck className="mr-1 h-4 w-4 text-green-600" />
                    <span>Export data as CSV</span>
                  </span>
                  <span className="m-1 ml-0 flex items-center text-[15px]">
                    <FaCircleCheck className="mr-1 h-4 w-4 text-green-600" />
                    <span>Priority support with quick reply</span>
                  </span>
                </div>
                <a
                  className="leading-2 w-full inline-flex h-[34px] items-center justify-center mt-8 overflow-hidden rounded-md text-white bg-gray-900 px-4 py-1 text-sm font-medium transition hover:bg-primary/90"
                  href={applicationClientUrls.auth.register}
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mb-16 mt-16 max-w-md px-3 text-center sm:max-w-2xl sm:px-0">
          <p className="text-lg">
            Hello! I'm{" "}
            <Link
              href={applicationClientUrls.social.portfolio}
              target="_blank"
              className="hover:bg-gradient-to-r from-fuchsia-600 to-fuchsia-400 bg-clip-text hover:text-transparent font-semibold transition-all ease-in duration-200"
            >
              Abhishek Katkam
            </Link>
            , the developer behind this project. I'm passionate about crafting
            intuitive solutions that enhance user experiences. If you find this
            project helpful, please consider following me on my social profiles
            and giving a star to my GitHub repository. Your support encourages
            me to continue innovating and improving. Thank you for being a part
            of this journey!
          </p>

          <div className="mt-5 flex flex-col items-center gap-3">
            <p className="text-lg">
              Feel free to personalize it further with your specific social
              profiles or GitHub repository link.
            </p>

            <Link
              target="_blank"
              href={applicationClientUrls.social.githubRepo}
              className="ml-6 inline-flex h-[34px] items-center justify-center gap-2 rounded-md bg-white/0 px-4 py-2.5 text-sm font-medium text-slate-900 ring-1 ring-slate-900/10 hover:bg-gray-100 hover:shadow"
            >
              <FaLink />
              Source Code
            </Link>

            <div className="flex items-center">
              <Link
                target="_blank"
                href={applicationClientUrls.social.github}
                className="ml-2 inline-flex h-[34px] items-center justify-center gap-2 rounded-md bg-white/0 px-4 py-2.5 text-xl font-medium text-slate-900 ring-1 ring-slate-900/10 hover:bg-gray-100 hover:shadow"
              >
                <FaGithub />
              </Link>
              <Link
                target="_blank"
                href={applicationClientUrls.social.linkedin}
                className="ml-3 inline-flex h-[34px] items-center justify-center gap-2 rounded-md bg-white/0 px-4 py-2.5 text-xl font-medium text-slate-900 ring-1 ring-slate-900/10 hover:bg-gray-100 hover:shadow"
              >
                <FaLinkedin />
              </Link>
              <Link
                target="_blank"
                href={applicationClientUrls.social.twitter}
                className="ml-3 inline-flex h-[34px] items-center justify-center gap-2 rounded-md bg-white/0 px-4 py-2.5 text-xl font-medium text-slate-900 ring-1 ring-slate-900/10 hover:bg-gray-100 hover:shadow"
              >
                <FaXTwitter />
              </Link>
            </div>
          </div>

          <p className="mt-5 text-xs">
            © {applicationClientUrls.config.currentYear}{" "}
            {applicationClientUrls.config.application}. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
