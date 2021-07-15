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

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_profile.user_id_unique" ON "users_profile"("user_id");

-- AddForeignKey
ALTER TABLE "users_profile" ADD FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
