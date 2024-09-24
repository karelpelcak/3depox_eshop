import { writable, derived, get } from 'svelte/store';
import type { CartItem } from './types';

export const username = writable('');
export const role = writable('');
export const TotalPrice = writable(0);

const isBrowser = typeof window !== 'undefined';

const getStoredCart = (): CartItem[] => {
    if (!isBrowser) return [];
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
};

const initialCart: CartItem[] = getStoredCart();

const cart = writable<CartItem[]>(initialCart);

if (isBrowser) {
    cart.subscribe((value) => {
        localStorage.setItem('cart', JSON.stringify(value));
    });
}



const addToCart = (productId: number) => {
    
    cart.update((items) => {
        const item = items.find((item) => item.id === productId);
        if (item) {
            return items.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
        }
        return [...items, { id: productId, quantity: 1 }];
    });
};

const removeFromCart = (productId: number) => {
    cart.update((items) => {
        const item = items.find((item) => item.id === productId);
        if (item) {
            if (item.quantity > 1) {
                return items.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item));
            }
            return items.filter((item) => item.id !== productId);
        }
        return items;
    });
};

const totalQuantity = derived(cart, ($cart) => $cart.reduce((total, item) => total + item.quantity, 0));

export { cart, addToCart, removeFromCart, totalQuantity };
