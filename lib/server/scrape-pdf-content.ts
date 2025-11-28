import { pdfToText } from "pdf-ts";
import { logger } from "@/lib/server/logger";

export async function scrapePdfContent(pdfUrl: string): Promise<string> {
  try {
    logger.info({ pdfUrl }, "Starting PDF content extraction");

    const response = await fetch(pdfUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    logger.debug({ byteLength: uint8Array.length }, "PDF fetched successfully");

    // Use pdf-ts to extract text
    const text = await pdfToText(uint8Array);

    logger.info(
      { extractedLength: text.trim().length },
      "PDF content extracted successfully"
    );

    return text.trim();
  } catch (error) {
    logger.error(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        pdfUrl,
      },
      "Failed to extract PDF content"
    );
    throw error;
  }
}
