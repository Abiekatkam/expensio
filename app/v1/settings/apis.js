import { applicationServerUrls } from "@/components/constant/urls";

export const settingUpdateUser = async (data) => {
  const res = await fetch(applicationServerUrls.user.modify, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  return await res.json();
};

export const settingDeleteUser = async () => {
  const res = await fetch(applicationServerUrls.user.modify, {
    method: "POST",
  });
  return await res.json();
};
