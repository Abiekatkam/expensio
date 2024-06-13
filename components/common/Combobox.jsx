"use client";

import React, { useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

export function Combobox({ data, selected, onChange }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selected);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-8 dark:bg-[#09090a]"
        >
          {value
            ? data.find((datum) => datum.value === value)?.label
            : "Select currency..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 dark:bg-[#09090a]">
        <Command className="dark:bg-[#09090a]">
          <CommandInput placeholder="Search here" />
          <CommandEmpty>No data</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {data.map((datum) => (
                <CommandItem
                  key={`${datum.value}-${datum.label}`}
                  value={datum.label}
                  onSelect={(selectedLabel) => {
                    const { value: selectedValue } = data.find(
                      (datum) => datum.label?.toLowerCase() === selectedLabel.toLowerCase()
                    ) || { value };
                    setValue(selectedValue);
                    onChange(selectedValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === datum.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {datum.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
