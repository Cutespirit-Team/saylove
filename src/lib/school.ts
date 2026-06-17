import { promises as fs } from "fs";
import path from "path";

// 對應原本各頁讀取 school/school.csv 的邏輯。
// CSV 每行：學校名稱,學校代碼
export interface SchoolEntry {
  name: string;
  code: string;
}

let cache: SchoolEntry[] | undefined;

export async function getSchools(): Promise<SchoolEntry[]> {
  if (cache) return cache;
  const filePath = path.join(process.cwd(), "public", "school", "school.csv");
  const content = await fs.readFile(filePath, "utf-8");
  // 原 PHP 用 fgets 逐行（保留空行行為），以 \n 切割
  const lines = content.split("\n");
  const list: SchoolEntry[] = [];
  for (const line of lines) {
    const parts = line.split(",");
    list.push({ name: parts[0] ?? "", code: (parts[1] ?? "").trim() });
  }
  cache = list;
  return list;
}

// 學校名稱清單（給搜尋自動完成的 suggestions 用）
export async function getSchoolNames(): Promise<string[]> {
  const schools = await getSchools();
  return schools.map((s) => s.name);
}

// 名稱 -> 代碼
export async function schoolNameToCode(name: string): Promise<string | undefined> {
  const schools = await getSchools();
  const found = schools.find((s) => s.name.trim() === name.trim());
  return found?.code;
}

// 代碼 -> 名稱
export async function schoolCodeToName(code: string): Promise<string | undefined> {
  const schools = await getSchools();
  const found = schools.find((s) => s.code === code.trim());
  return found?.name;
}

// 名稱是否存在（對應 posts.php 的學校有效性檢查）
export async function isValidSchoolName(name: string): Promise<boolean> {
  const schools = await getSchools();
  return schools.some((s) => s.name.trim() === name.trim());
}
