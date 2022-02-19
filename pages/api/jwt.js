// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { verify } from "jsonwebtoken";

export default async function handler(req, res) {
  try {
    const { token } = req.headers.token;
    const auth = await verify(token, "test12");
    if (auth) {
      res.status(200).json({ name: "Congrats! The server says hi!" });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
