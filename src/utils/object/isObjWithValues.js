export const isObjWithValues = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return false; // Not an object or is null
  }

  return Object.values(obj).some(
    (value) => value !== undefined && value !== null && value !== ""
  );
};
