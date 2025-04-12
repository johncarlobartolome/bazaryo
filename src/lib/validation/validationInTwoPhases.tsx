import { ZodError, ZodType } from "zod";

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string[]> };

export async function validateInTwoPhasesAsync<T>(
  baseSchema: ZodType<T>,
  fullSchemaFactory: () => ZodType<T>,
  data: unknown
): Promise<ValidationResult<T>> {
  const fieldResult = await baseSchema.safeParseAsync(data);

  if (!fieldResult.success) {
    return {
      success: false,
      errors: extractZodFieldErrorsAdvanced(fieldResult.error),
    };
  }

  const fullSchema = fullSchemaFactory();
  const fullResult = await fullSchema.safeParseAsync(data);

  if (!fullResult.success) {
    return {
      success: false,
      errors: extractZodFieldErrorsAdvanced(fullResult.error),
    };
  }

  return { success: true, data: fullResult.data };
}

function extractZodFieldErrorsAdvanced(
  error: ZodError
): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const path = issue.path.join(".");
    if (!fieldErrors[path]) {
      fieldErrors[path] = [];
    }
    fieldErrors[path].push(issue.message);
  }

  return fieldErrors;
}
