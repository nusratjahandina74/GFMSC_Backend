import PDFDocument
from "pdfkit";

import fs from "fs";

export const generateTCPdf =
  async (
    tc,
    student
  ) => {

    const path =
      `uploads/tc/${tc.tcNumber}.pdf`;

    const doc =
      new PDFDocument();

    doc.pipe(
      fs.createWriteStream(path)
    );

    doc.fontSize(20);

    doc.text(
      "TRANSFER CERTIFICATE",
      {
        align: "center",
      }
    );

    doc.moveDown();

    doc.text(
      `TC Number:
      ${tc.tcNumber}`
    );

    doc.text(
      `Student:
      ${student.fullName}`
    );

    doc.text(
      `Reason:
      ${tc.reason}`
    );

    doc.end();

    return path;
  };