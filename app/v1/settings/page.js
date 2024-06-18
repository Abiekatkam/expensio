import Header from "@/components/headline/header";
import React from "react";
import AccountUpdate from "./AccountUpdate";
import Appearance from "./Appearance";
import Usage from "./Usage";
import Plans from "./Plans";
import AccountDelete from "./AccountDelete";
import { HelpCenter } from "./HelpCenter";

const SettingPage = () => {
  return (
    <>
      <Header title="settings" />
      <div className="mt-6 w-full overflow-x-auto p-4 pt-3">
        <div className="m-auto flex w-full max-w-2xl flex-col items-center space-y-6">
          <AccountUpdate />
          <Appearance />
          <Usage />
          <Plans />
          <HelpCenter/>
          <AccountDelete />
        </div>
      </div>
    </>
  );
};

export default SettingPage;
