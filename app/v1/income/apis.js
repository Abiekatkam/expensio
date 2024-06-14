import { applicationServerUrls } from "@/components/constant/urls";

export const addIncome = async (data) => {
  const res = await fetch(applicationServerUrls.income.add, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  return await res.json();
};

export const deleteIncome = async (id) => {
  const res = await fetch(applicationServerUrls.income.modify, {
    method: "DELETE",
    body: JSON.stringify({ id: [id] }),
  });
  return await res.json();
};

export const editIncome = async (data) => {
  const res = await fetch(applicationServerUrls.income.modify, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return await res.json();
};
