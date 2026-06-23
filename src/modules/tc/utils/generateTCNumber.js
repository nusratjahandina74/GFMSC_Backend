import TransferCertificate
from "../models/TransferCertificate.js";

export const generateTCNumber =
  async () => {

    const count =
      await TransferCertificate.countDocuments();

    const year =
      new Date().getFullYear();

    return `TC-${year}-${String(
      count + 1
    ).padStart(5, "0")}`;
  };