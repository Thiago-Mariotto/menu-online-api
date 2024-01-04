type ObjectWithPossibleFields<T> = {
  [key: string]: T;
};

export default function removeFields<T extends { [s: string]: unknown }, K extends keyof T>(
  object: T,
  fieldsToRemove: K[]
): ObjectWithPossibleFields<T> {
  const result = Object.fromEntries(
    Object.entries(object).filter(([key]) => !fieldsToRemove.includes(key as K))
  );

  return result as ObjectWithPossibleFields<T>;
}