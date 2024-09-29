import allowCors from "@/utils/cors";
import { NextApiRequest, NextApiResponse } from "next";

// GET GET https://harvest.greenhouse.io/v1/jobs/{id}
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const greenhouseApiKey = process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY;

  try {
    const response = await fetch(
      `https://harvest.greenhouse.io/v1/jobs/${req.query.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${Buffer.from(greenhouseApiKey + ":").toString(
            "base64"
          )}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving job: " + error });
  }
}

export default allowCors(handler);
