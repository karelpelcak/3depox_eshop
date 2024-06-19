import { role } from "$/lib/stores";
import { get } from "svelte/store";

export const handleCheckAdmin = async () => {
  console.log($role);
};
