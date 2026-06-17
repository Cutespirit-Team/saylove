"use client";

import { useMemo, useState } from "react";
import type { SchoolEntry } from "@/lib/school";

// 可搜尋的高中下拉：打字過濾、點選;送出的是學校代碼（隱藏欄位 name）。
export default function SchoolSelect({
  name,
  schools,
  defaultCode,
}: {
  name: string;
  schools: SchoolEntry[];
  defaultCode: string;
}) {
  const initialName = useMemo(() => {
    const found = schools.find((s) => s.code === defaultCode);
    return found ? found.name : "";
  }, [schools, defaultCode]);

  const [code, setCode] = useState(defaultCode && defaultCode !== "0" ? defaultCode : "");
  const [query, setQuery] = useState(initialName);
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q ? schools.filter((s) => s.name.toLowerCase().includes(q)) : schools;
    return list.slice(0, 60);
  }, [query, schools]);

  function pick(s: SchoolEntry) {
    setCode(s.code);
    setQuery(s.name);
    setOpen(false);
  }

  return (
    <div className="tw-relative">
      <input type="hidden" name={name} value={code} />
      <input
        type="text"
        className="label_name"
        value={query}
        placeholder="輸入高中名稱搜尋…"
        autoComplete="off"
        onChange={(e) => {
          setQuery(e.target.value);
          setCode(""); // 改字後需重新點選才算有效
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
      />
      {open && results.length > 0 && (
        <ul className="tw-absolute tw-left-0 tw-right-0 tw-top-full tw-z-[1000] tw-mt-1 tw-max-h-[240px] tw-overflow-auto tw-list-none tw-m-0 tw-p-0 tw-bg-white tw-border tw-border-[#ddd] tw-rounded-[8px] tw-shadow-[0_6px_20px_rgba(0,0,0,0.15)]">
          {results.map((s, i) => (
            <li
              key={`${s.code}-${i}`}
              onMouseDown={() => pick(s)}
              className="tw-px-[12px] tw-py-[8px] tw-text-[14px] tw-text-[#333] tw-cursor-pointer hover:tw-bg-[#eef0f8]"
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
      {open && query.trim() && results.length === 0 && (
        <div className="tw-absolute tw-left-0 tw-right-0 tw-top-full tw-z-[1000] tw-mt-1 tw-bg-white tw-border tw-border-[#ddd] tw-rounded-[8px] tw-px-[12px] tw-py-[8px] tw-text-[14px] tw-text-[#999]">
          查無符合的高中
        </div>
      )}
    </div>
  );
}
