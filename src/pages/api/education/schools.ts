import allowCors from "@/utils/cors";
import { NextApiRequest, NextApiResponse } from "next";
import { parseLinkHeader, sortSchools } from "@/utils/helpers";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const greenhouseApiKey = process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY;
  try {
    let allSchools = [];
    let nextPageUrl = "https://harvest.greenhouse.io/v1/schools?per_page=500"; // Start with the first page, max per_page is 500
    const authHeader = `Basic ${Buffer.from(greenhouseApiKey + ":").toString(
      "base64"
    )}`;

    // Fetch all schools in batches of 500
    while (nextPageUrl && nextPageUrl !== "" && nextPageUrl !== null) {
      const response = await fetch(nextPageUrl, {
        method: "GET",
        headers: {
          Authorization: authHeader,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      allSchools = allSchools.concat(data);

      const linkHeader = response.headers.get("Link");
      if (linkHeader) {
        const parsedLinks = parseLinkHeader(linkHeader);
        nextPageUrl = parsedLinks.next || "";
      } else {
        nextPageUrl = "";
      }
    }

    const sortedSchools = sortSchools(allSchools);

    res.status(200).json(sortedSchools);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving schools: " + error });
  }
}

export default allowCors(handler);
