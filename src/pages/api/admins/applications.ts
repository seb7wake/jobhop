import allowCors from "@/utils/cors";
import { NextApiRequest, NextApiResponse } from "next";

// GET https://harvest.greenhouse.io/v1/applications
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const greenhouseApiKey = process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY;
  try {
    const response = await fetch(
      "https://harvest.greenhouse.io/v1/applications?job_id=4285367007",
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
    const reversedData = data.reverse();
    res.status(200).json(reversedData);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving applications: " + error });
  }
}

export default allowCors(handler);
