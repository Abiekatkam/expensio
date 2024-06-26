"use client";

import Image from "next/image";

import { useEffect, useMemo, useRef, useState } from "react";
import { useUser } from "../providers/auth-provider";
import { format } from "date-fns";
import { toast } from "sonner";
import debounce from "debounce";
import { addSubscription, editSubscription } from "@/app/v1/subscriptions/apis";
import { incrementUsage } from "@/app/v1/apis";
import { getCurrencySymbol } from "@/lib/formats";
import { dateFormat, datePattern } from "../constant/date-time";
import { subscriptionCategory } from "../constant/category";
import CircleLoader from "../loader/CircleLoader";
import BaseModal from "./BaseModal";
import messages from "../constant/messages";

// import AutoCompleteList from 'components/autocomplete-list';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const checkUrl = (urlString) => {
  let url;
  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
};

const initialState = {
  date: "",
  name: "",
  notes: "",
  url: "",
  price: "",
  paid: "monthly",
};

export default function AddSubscriptionsModal({
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
  const [hasValidUrl, setHasValidUrl] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(
    () =>
      setState(selected.id ? selected : { ...initialState, date: todayDate }),
    [selected, todayDate]
  );
  useEffect(() => setHasValidUrl(checkUrl(state.url)), [state.url]);

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
        await editSubscription(state);
      } else {
        await addSubscription(state);
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
      title={`${selected.id ? "Edit" : "Add"} Subscription`}
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
              placeholder="Netflix or Amazon Prime"
              maxLength={30}
              required
              ref={inputRef}
              autoFocus
              autoComplete="off"
              onChange={({ target }) => {
                const { value } = target;
                if (value.length) {
                  setState({ ...state, name: value });
                  if (value.length > 2) onLookup(value);
                } else {
                  setState({ ...state, name: "", paid: "monthly" });
                }
              }}
              value={state.name}
            />
            {/* <AutoCompleteList
              onHide={() => {
                setState({ ...state, autocomplete: [] });
              }}
              data={state.autocomplete}
              searchTerm={state.name.length > 2 ? state.name.toLowerCase() : ""}
              onClick={({ name, paid, url }) => {
                setState({ ...state, name, paid, url, autocomplete: [] });
              }}
              show={Boolean(state.autocomplete?.length)}
            /> */}
          </div>
          <div className="grid grid-cols-[100%] gap-1">
            <Label className="flex grow-0 items-center" htmlFor="website">
              Website
              {hasValidUrl && state.url ? (
                <Image
                  src={`http://www.google.com/s2/favicons?domain=${state.url}&sz=125`}
                  width={15}
                  height={15}
                  alt={state?.name}
                  className="ml-2"
                />
              ) : null}
            </Label>
            <Input
              className="mt-1.5 h-8 dark:bg-[#09090a]"
              id="website"
              type="url"
              inputMode="url"
              pattern="https://.*|http://.*"
              maxLength={30}
              placeholder="https://netflix.com"
              required
              onChange={(event) =>
                setState({ ...state, url: event.target.value })
              }
              value={state.url}
            />
          </div>
          <div className="grid grid-cols-[34%,36%,30%] gap-1">
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
                inputMode="decimal"
                type="number"
                placeholder="699"
                required
                min="0"
                step="any"
                onChange={(event) =>
                  setState({ ...state, price: event.target.value })
                }
                value={state.price}
              />
            </div>
            <div className="mr-3">
              <Label htmlFor="date">Bought Date</Label>
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
            <div className="mr-3">
              <Label htmlFor="paying">Paying</Label>
              <select
                id="paying"
                className="mt-1.5 flex h-8 dark:bg-[#09090a] max-sm:h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onChange={(event) => {
                  setState({ ...state, paid: event.target.value });
                }}
                value={state.paid}
                required
              >
                {Object.keys(subscriptionCategory).map((key) => {
                  return (
                    <option key={key} value={key}>
                      {subscriptionCategory[key].name}
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

          <Button disabled={loading} className="mt-2" type="submit">
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
