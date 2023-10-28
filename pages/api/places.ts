// pages/api/places.ts

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  console.log("in places ts");

  try {
    const { location, key, input } = req.query;
    const apiUrl =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

    const response = await axios.get(apiUrl, {
      params: { location, key, input, inputtype: "textquery", radius: 1000 },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
