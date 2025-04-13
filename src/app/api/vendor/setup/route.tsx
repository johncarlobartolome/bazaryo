import { NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { schema } from "@/lib/validation/vendorSetupSchema";

// Ensure the schema includes storeBanner and storeLogo fields
import { prisma } from "@/lib/prisma";
import { decodeToken } from "@/lib/auth";

export const config = {
  api: {
    bodyParser: false,
  },
};

// const uploadDir = path.join(process.cwd(), "/public/uploads");

// fs.mkdirSync(uploadDir, { recursive: true });

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    const decoded = token ? decodeToken(token) : null;

    // @ts-expect-error userId is expected
    const userId = decoded ? decoded.userId : null;

    const formData = await req.formData();
    const storeLogoFile = formData.get("storeLogo") as File;
    const storeBannerFile = formData.get("storeBanner") as File;

    const result = schema.safeParse(formData);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          status: false,
          message: "Validation failed",
          data: null,
          error: {
            code: "VALIDATION_ERROR",
            details: errors,
          },
        },
        { status: 400 }
      );
    }

    const { storeName, storeDescription, storeLocation, storePhone } =
      result.data;

    const files = { storeLogoFile, storeBannerFile };

    const savedFiles: string[] = [];

    for (const [key, file] of Object.entries(files)) {
      if (!file || !file.type.startsWith("image/")) {
        continue;
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      const fileExtension = path.extname(file.name);
      const filename = `${key}_${storeName}${fileExtension}`;
      const filepath = path.join(uploadDir, filename);

      await writeFile(filepath, buffer);
      savedFiles.push(filename);
    }

    const storeLogo =
      savedFiles.find((file) => file.startsWith("storeLogoFile")) || "";
    const storeBanner =
      savedFiles.find((file) => file.startsWith("storeBannerFile")) || "";
    console.log(storeLogo);
    await prisma.user.update({
      where: { id: userId },
      data: {
        role: "VENDOR",
      },
    });
    await prisma.vendor.create({
      data: {
        user: {
          connect: { id: userId },
        },
        storeName,
        storeDescription,
        storeLogo,
        storeBanner,
        storeLocation,
        storePhone: storePhone || "",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Vendor setup successful",
      error: null,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Unexpected server error",
        error: {
          code: "SERVER_ERROR",
        },
      },
      { status: 500 }
    );
  }
}
