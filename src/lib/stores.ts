import { writable } from 'svelte/store';

export const username = writable("");
export const role = writable("");
export const OrderItemCount = writable(0);