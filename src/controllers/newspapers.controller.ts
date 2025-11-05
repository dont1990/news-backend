import { Request, Response } from "express";
import { scrapeJaaar } from "../services/scrapeNewspapers";

export async function getNewspapers(req: Request, res: Response) {
  const search = String(req.query.search || "").toLowerCase();
  const sort = String(req.query.sort || "az"); // "az" | "za"
  const limit = Number(req.query.limit) || 12; // for infinite scroll
  const page = Number(req.query.page) || 1;

  let data = await scrapeJaaar();

  // 🔍 Search filter
  if (search) {
    data = data.filter(
      (n) =>
        n.name.toLowerCase().includes(search) ||
        n.headline.toLowerCase().includes(search)
    );
  }

  // 🔤 Alphabetical sort
  data.sort((a, b) => {
    const nameA = a.name.trim().toLowerCase();
    const nameB = b.name.trim().toLowerCase();
    if (sort === "za") return nameB.localeCompare(nameA, "fa");
    return nameA.localeCompare(nameB, "fa");
  });

  // 📄 Pagination for infinite scroll
  const start = (page - 1) * limit;
  const paginated = data.slice(start, start + limit);

  res.json({
    data: paginated,
    page,
    hasMore: start + limit < data.length,
    total: data.length,
  });
}
