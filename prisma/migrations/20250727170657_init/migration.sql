-- CreateTable
CREATE TABLE "ClinicianAccessRequest" (
    "id" TEXT NOT NULL,
    "clinicianUsername" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "ClinicianAccessRequest_pkey" PRIMARY KEY ("id")
);
