import {
  applicationClientUrls,
  applicationServerUrls,
} from "@/components/constant/urls";

export const incrementUsage = async () => {
  const res = await fetch(
    `${applicationClientUrls.host.home}/${applicationServerUrls.user.usage}`,
    { method: "POST" }
  );
  if (!res.ok) {
    return "Failed";
  }
  return await res.json();
};
