import { writable } from "svelte/store";

export const viewportWidth = writable(window.innerWidth);

const updateWidth = () => {
  viewportWidth.set(window.innerWidth);
};

window.addEventListener("resize", updateWidth);

export const destroyWidthListener = () => {
  window.removeEventListener("resize", updateWidth);
};
