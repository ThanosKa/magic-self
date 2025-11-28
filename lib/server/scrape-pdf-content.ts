import { pdfLogger } from "@/lib/server/logger"

export async function scrapePdfContent(pdfUrl: string): Promise<string> {
  try {
    pdfLogger.info({ pdfUrl }, "Starting PDF content extraction")

    // Fetch the PDF file
    const response = await fetch(pdfUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.statusText}`)
    }

    const arrayBuffer = await response.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    pdfLogger.debug({ byteLength: uint8Array.length }, "PDF fetched successfully")

    // Use pdf-parse to extract text
    const pdfParse = (await import("pdf-parse")).default
    const data = await pdfParse(Buffer.from(uint8Array))

    const text = data.text.trim()

    pdfLogger.info({ extractedLength: text.length, pages: data.numpages }, "PDF content extracted successfully")

    return text
  } catch (error) {
    pdfLogger.error(
      { error: error instanceof Error ? error.message : "Unknown error", pdfUrl },
      "Failed to extract PDF content",
    )
    throw error
  }
}
