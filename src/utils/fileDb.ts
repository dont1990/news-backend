import fs from "fs";
import path from "path";

export function readJson<T>(fileName: string): T {
  const filePath = path.join(__dirname, "..", "data", fileName);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data) as T;
}

export function writeJson<T>(fileName: string, data: T): void {
  const filePath = path.join(__dirname, "..", "data", fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}
