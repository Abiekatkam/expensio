"use client";
import React from "react";
import data from "@/components/constant/currency.json";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/common/Combobox";
import { useUser } from "@/components/providers/auth-provider";
import { settingUpdateUser } from "./apis";
import { useRouter } from "next/navigation";

const currencyData = Object.keys(data)
  .map((key) => {
    const { languages = [], currency } = data[key];
    const [currencyCode] = currency;
    if (!currencyCode) return false;
    return languages.map((language) => ({
      label: `${data[key].name} - ${language}`,
      value: `${currencyCode}-${language}`.toLowerCase(),
    }));
  })
  .filter(Boolean)
  .flat(Infinity);

const AccountUpdate = () => {
  const router = useRouter();
  const user = useUser();
  const currency = `${user.currency}-${user.locale}`.toLowerCase();
  return (
    <Card className="w-full dark:bg-[#09090a]">
      <CardHeader className="p-4 pb-2">
        <h2 className="font-semibold text-primary dark:text-white">
          Account Details
        </h2>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label className="mb-3 block" htmlFor="email">
              Email Address
            </Label>
            <Input
              id="email"
              disabled
              defaultValue={user.email}
              className="h-8 italic dark:bg-[#09090a]"
            />
          </div>
          <div>
            <Label className="mb-3 block" htmlFor="currency">
              Change Currency
            </Label>
            <Combobox
              data={currencyData}
              selected={currency}
              onChange={async (value) => {
                const [currency, locale] = value.split("-");
                await settingUpdateUser({ currency, locale });
                router.push("/v1/settings");
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountUpdate;
