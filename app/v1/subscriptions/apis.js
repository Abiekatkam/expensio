import { applicationServerUrls } from "@/components/constant/urls";

export const addSubscription = async (data) => {
  const res = await fetch(applicationServerUrls.subscriptions.add, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json();
    throw error;
  }
  return await res.json();
};

export const deleteSubscription = async (id) => {
  const res = await fetch(applicationServerUrls.subscriptions.modify, {
    method: "DELETE",
    body: JSON.stringify({ id: [id] }),
  });
  return await res.json();
};

export const editSubscription = async (data) => {
  const res = await fetch(applicationServerUrls.subscriptions.modify, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return await res.json();
};
