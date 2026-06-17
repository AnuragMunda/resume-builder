import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const A4_WIDTH_PX = Math.round((210 / 25.4) * 96);
const A4_HEIGHT_PX = Math.round((297 / 25.4) * 96);

export async function exportPdf(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  const imgData = await toPng(element, {
    width: A4_WIDTH_PX,
    height: A4_HEIGHT_PX,
    style: {
      transform: "none",
      transformOrigin: "top left",
    },
    pixelRatio: 2,
  });

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
}
