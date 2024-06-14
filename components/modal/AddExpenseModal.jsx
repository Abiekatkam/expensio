"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "@/components/providers/auth-provider";
import { format } from "date-fns";
import { toast } from "sonner";
import debounce from "debounce";
import BaseModal from "./BaseModal";
import CircleLoader from "@/components/loader/CircleLoader";
import {
  expensesCategory,
  expensesPay,
  groupedExpenses,
} from "@/components/constant/category";
import { dateFormat, datePattern } from "@/components/constant/date-time";
import { getCurrencySymbol } from "@/lib/formats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { incrementUsage } from "@/app/v1/apis";
import { addExpense, editExpense } from "@/app/v1/expenses/apis";
import messages from "@/components/constant/messages";

// import AutoCompleteList from 'components/autocomplete-list';

const initialState = {
  category: "food",
  paid_via: "upi",
  name: "",
  notes: "",
  price: "",
  date: "",
  id: null,
  autocomplete: [],
};

export default function AddExpenseModal({
  show,
  onHide,
  mutate,
  selected,
  lookup,
}) {
  const user = useUser();
  const todayDate = format(new Date(), dateFormat);
  const [state, setState] = useState({ ...initialState, date: todayDate });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(
    () =>
      setState(
        selected.id
          ? {
              ...selected,
              ...{
                paid_via: selected.paid_via
                  ? selected.paid_via
                  : initialState.paid_via,
              },
            }
          : { ...initialState, date: todayDate }
      ),
    [selected, todayDate]
  );

  const onLookup = useMemo(() => {
    const callbackHandler = (value) => {
      setState((prev) => ({ ...prev, autocomplete: lookup(value) }));
    };

    return debounce(callbackHandler, 500);
  }, [lookup]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const isEditing = selected?.id;
      if (isEditing) {
        await editExpense(state);
      } else {
        await addExpense(state);
        incrementUsage();
      }
      setLoading(false);
      toast.success(isEditing ? messages.updated : messages.success);
      if (mutate) mutate();
      onHide();
      setState({ ...initialState });
    } catch {
      setLoading(false);
      toast.error(messages.error);
    }
  };

  return (
    <BaseModal
      someRef={inputRef}
      show={show}
      title={`${selected.id ? "Edit" : "Add"} Expense`}
      onHide={onHide}
    >
      <div className="sm:flex sm:items-start max-sm:pb-6">
        <form
          className="md:[420px] grid w-full grid-cols-1 items-center gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
            if (!selected.id) setState({ ...initialState });
          }}
        >
          <div className="relative">
            <Label htmlFor="name">Name</Label>
            <Input
              className="mt-1.5 h-8 dark:bg-[#09090a]"
              id="name"
              placeholder="Swiggy - Biriyani"
              maxLength={30}
              required
              ref={inputRef}
              autoFocus
              autoComplete="off"
              onChange={({ target }) => {
                const { value } = target;
                if (value.length) {
                  setState({ ...state, name: value, autocomplete: [] });
                  if (value.length > 2) onLookup(value);
                } else {
                  setState({
                    ...state,
                    name: "",
                    category: "food",
                    paid_via: "upi",
                  });
                }
              }}
              value={state.name}
            />
            {/* <AutoCompleteList
							onHide={() => {
								setState({ ...state, autocomplete: [] });
							}}
							data={state.autocomplete}
							searchTerm={state.name.length > 2 ? state.name.toLowerCase() : ''}
							onClick={({ name, category, paid_via }) => {
								setState({ ...state, name, category, paid_via, autocomplete: [] });
							}}
							show={Boolean(state.autocomplete?.length)}
						/> */}
          </div>
          <div className="grid grid-cols-[50%,50%] gap-3">
            <div className="mr-3">
              <Label htmlFor="price">
                Price
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  ({getCurrencySymbol(user.currency, user.locale)})
                </span>
              </Label>
              <Input
                className="mt-1.5 h-8 dark:bg-[#09090a]"
                id="price"
                type="number"
                placeholder="199"
                required
                min="0"
                inputMode="decimal"
                step="any"
                onChange={(event) =>
                  setState({ ...state, price: event.target.value })
                }
                value={state.price}
              />
            </div>
            <div className="mr-3">
              <Label htmlFor="date">Spent Date</Label>
              <Input
                className="mt-1.5 appearance-none h-8 dark:bg-[#09090a]"
                id="date"
                type="date"
                required
                max={todayDate}
                pattern={datePattern}
                onChange={(event) => {
                  setState({ ...state, date: event.target.value });
                }}
                value={state.date}
              />
            </div>
          </div>
          <div className="grid grid-cols-[50%,50%] gap-3">
            <div className="mr-3">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="mt-1.5 flex h-8 dark:bg-[#09090a] max-sm:h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onChange={(event) => {
                  setState({ ...state, category: event.target.value });
                }}
                value={state.category}
                required
              >
                {Object.keys(groupedExpenses).map((key) => {
                  return (
                    <optgroup
                      label={groupedExpenses[key].name}
                      key={groupedExpenses[key].name}
                    >
                      {Object.keys(groupedExpenses[key].list).map((listKey) => {
                        return (
                          <option key={listKey} value={listKey}>
                            {groupedExpenses[key].list[listKey].name}
                          </option>
                        );
                      })}
                    </optgroup>
                  );
                })}
                <option key={"other"} value={"other"}>
                  {expensesCategory.other.name}
                </option>
              </select>
            </div>
            <div className="mr-3">
              <Label htmlFor="paid">Paid Via</Label>
              <select
                id="paid"
                className="mt-1.5 flex h-8 dark:bg-[#09090a] max-sm:h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onChange={(event) => {
                  setState({ ...state, paid_via: event.target.value });
                }}
                value={state.paid_via}
                required
              >
                {Object.keys(expensesPay).map((key) => {
                  return (
                    <option key={key} value={key}>
                      {expensesPay[key].name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <Label className="block">
              Notes{" "}
              <span className="text-center text-sm text-muted-foreground">
                (optional)
              </span>
            </Label>
            <Textarea
              className="mt-2 h-20 dark:bg-[#09090a]"
              onChange={(event) =>
                setState({ ...state, notes: event.target.value })
              }
              value={state.notes}
              maxLength={60}
            />
          </div>

          <Button disabled={loading} className="mt-1.5" type="submit">
            {loading ? (
              <CircleLoader />
            ) : (
              `${selected?.id ? "Update" : "Submit"}`
            )}
          </Button>
        </form>
      </div>
    </BaseModal>
  );
}
