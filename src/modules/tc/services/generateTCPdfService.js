import School from "../../../models/School.js";
import TransferCertificate from "../models/TransferCertificate.js";

const tc =
  await TransferCertificate
    .findById(tcId);

if (!tc) {
  throw new Error(
    "TC not found"
  );
}

const school =
  await School.findById(
    tc.schoolId
  );

if (school?.sealImage) {
  doc.image(
    school.sealImage,
    400,
    600,
    {
      width: 100,
    }
  );
}

if (
  school?.principalSignature
) {
  doc.image(
    school.principalSignature,
    200,
    600,
    {
      width: 120,
    }
  );
}