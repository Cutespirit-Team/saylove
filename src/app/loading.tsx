// 換頁時若內容尚未渲染好，先顯示轉圈（導覽列/頁尾來自 layout，會持續顯示）。
// 這是 Next App Router 的特殊檔案：點連結會立即切到目標頁並顯示此 UI，
// 伺服器把資料算好後再換上實際內容。
export default function Loading() {
  return (
    <div className="route-spinner">
      <div className="route-spinner__circle" />
    </div>
  );
}
