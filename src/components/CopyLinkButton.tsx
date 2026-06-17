"use client";

// 對應原本「點我複製文章連結」按鈕（原以 jQuery + execCommand 複製隱藏 input 的值）。
export default function CopyLinkButton({ link }: { link: string }) {
  const onClick = () => {
    const fallback = () => {
      const textArea = document.createElement("textarea");
      textArea.value = link;
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 999999);
      try {
        document.execCommand("Copy");
      } catch {
        /* noop */
      }
      document.body.removeChild(textArea);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(link).catch(fallback);
    } else {
      fallback();
    }
  };

  return (
    <>
      <input value={link} style={{ display: "none" }} readOnly />
      <button type="button" className="copy_coupon" onClick={onClick}>
        點我複製文章連結
      </button>
    </>
  );
}
