"use client";
import React from "react";
import clsx from "clsx";

interface NumberFieldProps {
  id?: string;
  label: string;
  value?: number;
  onChange: (value?: number) => void;
  min?: number;
  max?: number;
  step?: number | string;
  disabled?: boolean;
  className?: string;
}

export function NumberField({
  id,
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  disabled = false,
  className,
}: NumberFieldProps) {
  const valueStr =
    value !== undefined && !Number.isNaN(value) ? String(value) : "";

  const hasValue = valueStr !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v === "") {
      onChange(undefined);
      return;
    }
    const n = Number(v);
    onChange(Number.isNaN(n) ? undefined : n);
  };

  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={clsx("w-full", className)}>
      <div className="relative">
        <input
          id={inputId}
          type="number"
          inputMode="numeric"
          value={valueStr}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          placeholder=" "
          className="mb-5 peer w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50"
        />
        <label
          htmlFor={inputId}
          className={`absolute left-3 z-10 cursor-text transition-all peer-focus:-top-2 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-indigo-600 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 ${
            hasValue
              ? "-top-2 translate-y-0 bg-white text-xs px-1"
              : "top-1/2 -translate-y-1/2 text-sm text-gray-500"
          }`}
        >
          {label}
        </label>
      </div>
    </div>
  );
}
