import { EncryptStorage } from "encrypt-storage";
import { isObjWithValues } from "../object/isObjWithValues";

export const encryptStorage = new EncryptStorage("your-secret-key");

export const setItem = (payload) => {
  encryptStorage.setItem(payload);
};

export const getItem = (string) => {
  try {
    return encryptStorage.getItem(string);
  } catch (error) {
    console.error("error");
  }
};

export const removeItem = (string) => {
  return encryptStorage.removeItem(string);
};
