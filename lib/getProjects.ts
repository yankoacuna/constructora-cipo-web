import Papa from "papaparse";

export interface Project {
  id: string;
  url: string;
  title: string;
  category: string;
}

export async function getProjects(): Promise<Project[] | null> {
  const csvUrl = process.env.SHEETS_CSV_URL;
  
  if (!csvUrl) {
    console.warn("INFO: No SHEETS_CSV_URL defined in environment variables. Falling back to local projects.");
    return null; 
  }

  try {
    const res = await fetch(csvUrl, { next: { revalidate: 0 } });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch CSV: ${res.status} ${res.statusText}`);
    }

    const csvText = await res.text();

    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (result.errors.length > 0) {
      console.error("CSV Parsing errors:", result.errors);
    }
    
    const parsedData = result.data.map((row: any) => {
      const normalizedRow: Record<string, string> = {};
      for (const [key, value] of Object.entries(row)) {
        if (typeof key === 'string' && typeof value === 'string') {
          // Normalize to handle 'ID', 'Id', 'Url', etc.
          // Fallback to removing all sorts of accents
          normalizedRow[key.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")] = value.trim();
        }
      }
      let urlVal = (normalizedRow.url || normalizedRow.link || "").trim();
      let extractedId = normalizedRow.id || "";

      // Clean the URL and extract the ID automatically
      if (urlVal) {
        // Strip everything after the ID like /embed or ?utm_source=
        urlVal = urlVal.replace(/\/embed.*$/, "").split('?')[0].replace(/\/$/, "") + "/";
        
        if (!extractedId) {
          const match = urlVal.match(/\/(?:p|reel)\/([A-Za-z0-9_-]+)/i);
          if (match && match[1]) {
            extractedId = match[1];
          }
        }
      }

      return {
        id: extractedId,
        url: urlVal,
        title: normalizedRow.titulo || normalizedRow.title || "Proyecto",
        category: normalizedRow.categoria || normalizedRow.category || "Todos",
      } as Project;
    }).filter(p => p.id && p.url);

    return parsedData.length > 0 ? parsedData : null;

  } catch (error) {
    console.error("Error fetching projects from sheets:", error);
    return null;
  }
}
