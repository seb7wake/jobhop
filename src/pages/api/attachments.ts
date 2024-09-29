import { NextApiRequest, NextApiResponse } from "next";

// POST https://harvest.greenhouse.io/v1/candidates/{id}/attachments
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const greenhouseApiKey = process.env.NEXT_PUBLIC_GREENHOUSE_API_KEY;

  try {
    const response = await fetch(
      `https://harvest.greenhouse.io/v1/candidates/${req.body.candidateId}/attachments`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(greenhouseApiKey + ":").toString(
            "base64"
          )}`,
          "On-Behalf-Of": "4280249007",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body.resume),
      }
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status on adding attachment: ${response.statusText}`
      );
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error adding attachment: " + error });
  }
}
