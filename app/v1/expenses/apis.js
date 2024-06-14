import { applicationServerUrls } from "@/components/constant/urls";

export const addExpense = async (data) => {
  const res = await fetch(applicationServerUrls.expenses.add, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  return await res.json();
};

export const deleteExpense = async (id) => {
  const res = await fetch(applicationServerUrls.expenses.modify, {
    method: "DELETE",
    body: JSON.stringify({ id: [id] }),
  });
  return await res.json();
};

export const editExpense = async (data) => {
  const res = await fetch(applicationServerUrls.expenses.modify, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return await res.json();
};
