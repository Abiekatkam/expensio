import { applicationServerUrls } from "@/components/constant/urls";

export const addInvestment = async (data) => {
  const res = await fetch(applicationServerUrls.investments.add, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  return await res.json();
};

export const deleteInvestment = async (id) => {
  const res = await fetch(applicationServerUrls.investments.modify, {
    method: "DELETE",
    body: JSON.stringify({ id: [id] }),
  });
  return await res.json();
};

export const editInvestment = async (data) => {
  const res = await fetch(applicationServerUrls.investments.modify, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return await res.json();
};
