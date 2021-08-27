-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "isFirstTimeLogin" BOOLEAN DEFAULT true,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_profile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "dba" TEXT,
    "mid" TEXT,
    "company" TEXT,
    "contact" TEXT,
    "main" TEXT,
    "mobile" TEXT,
    "address_line_1" TEXT,
    "address_line_2" TEXT,
    "country" TEXT,
    "state" TEXT,
    "business_type" TEXT[],
    "payment_channels" TEXT[],
    "payment_channels_covered" TEXT[],
    "mcc" TEXT,
    "url" TEXT,
    "ip_address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "versionNumbers" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "payment_application_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paymentApplications" (
    "id" SERIAL NOT NULL,
    "paymentName" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employeeTraining" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "company_email" TEXT,
    "employee_number" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_profile.user_id_unique" ON "users_profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "employeeTraining.company_email_unique" ON "employeeTraining"("company_email");

-- CreateIndex
CREATE UNIQUE INDEX "employeeTraining.employee_number_unique" ON "employeeTraining"("employee_number");

-- AddForeignKey
ALTER TABLE "users_profile" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "versionNumbers" ADD FOREIGN KEY ("payment_application_id") REFERENCES "paymentApplications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
