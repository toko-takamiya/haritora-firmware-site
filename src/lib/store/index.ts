import { getLocale, setLocale } from '$lib/paraglide/runtime';
import { writable } from 'svelte/store';

export const currentLocale = writable(getLocale());

export function updateLocale(newLocale) {
	setLocale(newLocale, { reload: false });
	currentLocale.set(newLocale);
}

/*
 * Firmware objects
 */

export type FirmwareVersion = {
	version: string;
	date: string;
	notes: string;
};

export type FirmwareVersionsMap = {
	[key in Device]: FirmwareVersion[];
};

const haritorax2Versions: FirmwareVersion[] = [
	{ version: '2.0.0', date: '2022-01-01', notes: 'HaritoraX 2 initial release' },
	{ version: '2.1.0', date: '2022-06-01', notes: 'HaritoraX 2 feature update' }
];

const haritoraxWirelessVersions: FirmwareVersion[] = [
	{ version: '1.0.0', date: '2023-03-15', notes: 'HaritoraX Wireless initial release' },
	{ version: '1.1.0', date: '2023-07-20', notes: 'HaritoraX Wireless bug fixes' }
];

const haritorax11bVersions: FirmwareVersion[] = [
	{ version: '1.0.0', date: '2021-05-10', notes: 'HaritoraX 1.1b initial release' },
	{ version: '1.1.0', date: '2021-08-22', notes: 'HaritoraX 1.1b feature update' }
];

const haritorax11Versions: FirmwareVersion[] = [
	{ version: '1.1.0', date: '2020-11-11', notes: 'HaritoraX 1.1 initial release' },
	{ version: '1.1.1', date: '2021-01-15', notes: 'HaritoraX 1.1 bug fixes' }
];

const haritorax10Versions: FirmwareVersion[] = [
	{ version: '1.0.0', date: '2020-01-01', notes: 'HaritoraX 1.0 initial release' },
	{ version: '1.0.2', date: '2020-03-10', notes: 'HaritoraX 1.0 bug fixes' }
];

const gxVersions: FirmwareVersion[] = [
	{ version: '1.0.0', date: '2021-01-01', notes: 'GX initial release' },
	{ version: '1.1.0', date: '2021-06-01', notes: 'GX feature update' }
];

export enum Device {
	HaritoraX2 = 'HaritoraX 2',
	HaritoraXWireless = 'HaritoraX Wireless',
	HaritoraX11b = 'HaritoraX 1.1b',
	HaritoraX11 = 'HaritoraX 1.1',
	HaritoraX10 = 'HaritoraX (1.0)',
	GX = 'GX (6/2)'
}

export const firmwareVersions: FirmwareVersionsMap = {
	[Device.HaritoraX2]: haritorax2Versions,
	[Device.HaritoraXWireless]: haritoraxWirelessVersions,
	[Device.HaritoraX11b]: haritorax11bVersions,
	[Device.HaritoraX11]: haritorax11Versions,
	[Device.HaritoraX10]: haritorax10Versions,
	[Device.GX]: gxVersions
};
