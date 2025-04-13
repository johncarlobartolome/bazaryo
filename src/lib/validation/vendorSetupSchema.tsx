import { zfd } from "zod-form-data";
import { z } from "zod";
import validator from "validator";

export const schema = zfd.formData({
  storeName: zfd.text(z.string().min(1, "Store name is required")),
  storeDescription: zfd.text(
    z.string().min(1, "Store description is required")
  ),
  storeLocation: zfd.text(z.string().min(1, "Store location is required")),
  storePhone: zfd.text(z.string().refine(validator.isMobilePhone).optional()),
});
