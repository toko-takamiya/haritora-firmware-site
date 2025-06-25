import { getLocale, setLocale } from '$lib/paraglide/runtime';
import { writable } from 'svelte/store';

export const currentLocale = writable(getLocale());

export function updateLocale(newLocale) {
	setLocale(newLocale, { reload: false });
	currentLocale.set(newLocale);
}
