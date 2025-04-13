// @ts-expect-error it's a detailed error
export default function getFlatDetailsFromErrors(details) {
  return Object.fromEntries(
    Object.entries(details).map(([key, value]) => [key, (value as string[])[0]])
  );
}
