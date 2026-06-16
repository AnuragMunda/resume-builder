"use client";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  type: "start" | "end";
  selectedDate: Date | null;
  disabled?: boolean;
  handleChange: (key: string, value: any) => void;
};

export function DatePicker({
  type,
  selectedDate,
  disabled = false,
  handleChange,
}: DatePickerProps) {
  const date = selectedDate ?? undefined;

  return (
    <Field>
      <FieldLabel>
        {type === "start" ? "Start Date" : "End Date"}
      </FieldLabel>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={`${type}-date-picker`}
            disabled={disabled}
            className="w-full justify-start text-left font-normal"
          >
            {date ? (
              format(date, "MMM yyyy")
            ) : (
              <span>{`Pick ${type} date`}</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            defaultMonth={date}
            onSelect={(newDate) => handleChange(`${type}Date`, newDate ?? null)}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
