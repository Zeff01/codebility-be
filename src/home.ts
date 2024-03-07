import * as path from "path";
import fs from "fs/promises";
import { Router, type Request, type Response } from "express";
const pdfFilePath = "prisma/ERD.pdf";

const home: Router = Router();

home.get("/", async (_req: Request, res: Response) => {
  try {
    // Read the PDF file
    const data = await fs.readFile(pdfFilePath);
    // Set content type as PDF
    res.setHeader("Content-Type", "application/pdf");
    // Send the PDF file as response
    res.send(data);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).send({
      success: false,
      message: err.toString(),
    });
  }
});

home.get("/erd", (_req: Request, res: Response) => {
  try {
    res.sendFile(path.join(__dirname, "../public/erd.html"));
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.toString(),
    });
  }
});

export default home;
