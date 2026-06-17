"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

type ConfirmFn = (opts: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

// 站內確認對話框,取代瀏覽器原生的 window.confirm。
// 用法：const confirm = useConfirm(); if (await confirm({ message: "..." })) { ... }
export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm 必須在 <ConfirmProvider> 內使用");
  return ctx;
}

export default function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [opts, setOpts] = useState<ConfirmOptions | null>(null);
  const resolver = useRef<((v: boolean) => void) | null>(null);
  const confirmBtnRef = useRef<HTMLButtonElement>(null);

  const confirm = useCallback<ConfirmFn>((options) => {
    setOpts(options);
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  const close = useCallback((value: boolean) => {
    resolver.current?.(value);
    resolver.current = null;
    setOpts(null);
  }, []);

  useEffect(() => {
    if (!opts) return;
    confirmBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [opts, close]);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {opts && (
        <div
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) close(false);
          }}
          className="tw-fixed tw-inset-0 tw-z-[2147483600] tw-flex tw-items-center tw-justify-center tw-p-4 tw-bg-[rgba(20,20,40,0.45)] tw-backdrop-blur-[2px] tw-animate-confirm-fade motion-reduce:tw-animate-none"
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-label={opts.title ?? "確認"}
            className="tw-w-full tw-max-w-[360px] tw-bg-white tw-rounded-[14px] tw-p-[22px] tw-shadow-[0_16px_48px_rgba(20,20,40,0.25)] tw-animate-confirm-pop motion-reduce:tw-animate-none"
          >
            {opts.title && (
              <h3 className="tw-m-0 tw-mb-2 tw-text-[18px] tw-font-extrabold tw-text-[#3b5999]">{opts.title}</h3>
            )}
            <p className="tw-m-0 tw-mb-5 tw-text-[14.5px] tw-leading-[1.7] tw-text-[#555] tw-[text-wrap:pretty]">
              {opts.message}
            </p>
            <div className="tw-flex tw-justify-end tw-gap-[10px]">
              <button
                type="button"
                onClick={() => close(false)}
                className="tw-border-0 tw-rounded-[9px] tw-px-[18px] tw-py-2 tw-text-[14px] tw-font-semibold tw-cursor-pointer tw-bg-[#eef0f4] tw-text-[#555] hover:tw-bg-[#e3e6ee] focus-visible:tw-outline-2 focus-visible:tw-outline-[#3b5999]"
              >
                {opts.cancelText ?? "取消"}
              </button>
              <button
                ref={confirmBtnRef}
                type="button"
                onClick={() => close(true)}
                className={`tw-border-0 tw-rounded-[9px] tw-px-[18px] tw-py-2 tw-text-[14px] tw-font-semibold tw-cursor-pointer tw-text-white hover:tw-brightness-95 focus-visible:tw-outline-2 focus-visible:tw-outline-white ${
                  opts.danger ? "tw-bg-[#e74c3c]" : "tw-bg-[#3b5999]"
                }`}
              >
                {opts.confirmText ?? "確認"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}
