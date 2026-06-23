import TransferCertificate
from "../models/TransferCertificate.js";

export const updateTCService =
  async (
    tcId,
    payload
  ) => {

    const tc =
      await TransferCertificate.findById(
        tcId
      );

    if (!tc) {
      throw new Error(
        "TC not found"
      );
    }

    if (
      tc.status === "Issued"
    ) {
      throw new Error(
        "Issued TC cannot be modified"
      );
    }

    Object.assign(
      tc,
      payload
    );

    await tc.save();

    return tc;
  };