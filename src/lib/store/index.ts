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
	filename: string;
	notes: string;
};

export type FirmwareVersionsMap = {
	[key in Device]: FirmwareVersion[];
};

// assume all "unknown" versions (commit hashes / "unknown" notes) have dates from VR Manager's Steam depot
const haritorax2Versions: FirmwareVersion[] = [
	{ version: '095fdce', date: '2024-12-11', filename: 'mc4seb-2-095fdce.zip', notes: 'Unknown' },
	{ version: 'ce48200', date: '2024-12-17', filename: 'mc4seb-2-ce48200.zip', notes: 'Unknown' },
	{ version: 'c796754', date: '2025-01-08', filename: 'mc4seb-2-c796754.zip', notes: 'Unknown' },
	{
		version: '9648bfd (likely 1.0.5)',
		date: '2025-01-21',
		filename: 'mc4seb-2-9648bfd.zip',
		notes: 'Unknown'
	},
	{
		version: 'b9b09e9 (likely 1.0.14)',
		date: '2025-01-23',
		filename: 'mc4seb-2-b9b09e9.zip',
		notes: 'Unknown'
	},
	{
		version: '1.0.21',
		date: '2025-03-25', // date from official manual
		filename: 'mc4seb-2-b645dee.zip',
		notes:
			'LiDAR sensor capture angle improved (wider).\r\nFixed an issue where auto power-off sometimes not work in GX dongle mode.\r\nOther minor modifications.'
	},
	{ version: 'a85a6e5', date: '2025-02-27', filename: 'mc4seb-2-a85a6e5.zip', notes: 'Unknown' },
	{
		version: '1.0.24',
		date: '2025-05-12', // date from official manual
		filename: 'mc4seb-2-b475ca6.zip',
		notes:
			'Fixed a rare issue where the power could not be turned on without a forced shutdown.\r\nFixed a problem where the red LED would flash rapidly just before charging was complete.\r\nOther minor fixes'
	},
	{
		version: '1.0.25',
		date: '2025-05-19', // date from official manual
		filename: 'mc4seb-2-3a1129c.zip',
		notes: 'Fixed an issue where the red LED would remain on even after charging was complete.'
	},
	{
		version: 'c4d6efb',
		date: '2025-06-03',
		filename: 'mc4seb-2-c4d6efb.zip',
		notes: 'Unknown'
	},
	{
		version: 'ab87abb',
		date: '2025-06-28',
		filename: 'mc4seb-2-ab87abb.zip',
		notes: 'Unknown'
	}
];

const haritoraxWirelessVersions: FirmwareVersion[] = [
	{
		version: '1.0.18',
		date: '2023-10-30', // date from official manual
		filename: 'mc3_sensor_20231117_e53a9ce.zip',
		notes: 'Supported GX6 communication dongle.'
	},
	{
		version: '1.0.25',
		date: '2024-07-28', // date from official manual
		filename: 'mc3_sensor_20240613_e1dd725.zip',
		notes: 'No change in functionality or performance under normal use.'
	},
	{
		version: 'ea3497b',
		date: '2024-08-01', // date from file name
		filename: 'mc3_sensor_20240801_ea3497b.zip',
		notes: 'Unknown'
	},
	{
		version: '68aced4',
		date: '2025-01-20', // date from file name
		filename: 'mc3_sensor_mc3_bootloader_20250120_68aced4.zip',
		notes: 'Unknown'
	},
	{
		version: '1.0.28',
		date: '2025-06-03', // date from official manual
		filename: 'mc3_sensor_20250430_5398332.zip',
		notes:
			'It is now possible to change the attachment point for all previously sold “HaritoraX Wireless Elbow Expansion Sets.\r\nFor example, you can change from Elbow → Foot or Elbow → Wrist.\r\n\r\nOther minor improvements.'
	}
];

const haritorax11bVersions: FirmwareVersion[] = [
	{ version: '1.0.0', date: '2021-05-10', filename: '', notes: 'HaritoraX 1.1b initial release' },
	{ version: '1.1.0', date: '2021-08-22', filename: '', notes: 'HaritoraX 1.1b feature update' }
];

const haritorax11Versions: FirmwareVersion[] = [
	{ version: '1.1.0', date: '2020-11-11', filename: '', notes: 'HaritoraX 1.1 initial release' },
	{ version: '1.1.1', date: '2021-01-15', filename: '', notes: 'HaritoraX 1.1 bug fixes' }
];

const haritorax10Versions: FirmwareVersion[] = [
	{ version: '1.0.0', date: '2020-01-01', filename: '', notes: 'HaritoraX 1.0 initial release' },
	{ version: '1.0.2', date: '2020-03-10', filename: '', notes: 'HaritoraX 1.0 bug fixes' }
];

// assume all "unknown" versions (commit hashes / "unknown" notes) have dates from VR Manager's Steam depot
const gxVersions: FirmwareVersion[] = [
	{
		version: '1.0.17',
		date: '2023-10-30', // date from official manual
		filename: 'mc3_dongle_20230927_477d506.zip',
		notes: 'Firmware on initial shipment'
	},
	{
		version: '1.0.19',
		date: '2023-10-31', // date from official manual
		filename: 'mc3_dongle_20231005_fece09a.zip',
		notes: 'Fixed communication-related problems.'
	},
	{
		version: '1.0.26',
		date: '2025-01-30', // date from official manual
		filename: 'mc3_dongle_mc3_bootloader_20240801_ea3497b.zip',
		notes: 'Compatible with HaritoraX 2.'
	}
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
