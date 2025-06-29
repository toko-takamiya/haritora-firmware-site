<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { type FirmwareVersion } from '$lib/store';
	import { Device, firmwareVersions } from '$lib/store';
	import { firmwareUpdater } from '$lib/store/updater';
	import { Progress } from '@skeletonlabs/skeleton-svelte';

	let selectedDevice = $state(Device.HaritoraX2);
	let firmwareList = $derived(firmwareVersions[selectedDevice]);
	let selectedFirmware = $state<FirmwareVersion>();

	let dfuDevice = $state<BluetoothDevice | null>(null);
	let updateProgress = $state(0);
	let updateStatus = $state(m['dfu.status.waiting']());
	let isUpdating = $state(false);
	let logMessages = $state<string[]>([]);

	// TODO: use connection_lost and cancelled

	$effect(() => {
		selectedFirmware = firmwareList[0];
	});

	if (firmwareUpdater) {
		firmwareUpdater.setProgressCallback((progress) => {
			updateProgress = Math.round((progress.currentBytes / progress.totalBytes) * 100);
			updateStatus = m['dfu.status.updating']({
				progress: updateProgress,
				total: progress.totalBytes,
				current: progress.currentBytes
			});
		});

		firmwareUpdater.setLogCallback((message) => {
			logMessages = [...logMessages, message];
		});
	}

	async function handleSetUpdateMode() {
		try {
			isUpdating = true;
			updateStatus = m['dfu.status.setting_update_mode']();
			logMessages = [];

			if (!firmwareUpdater) {
				updateStatus = m['dfu.status.firmware_updater_not_initialized']();
				return;
			}

			await firmwareUpdater.setUpdateMode();
			updateStatus = m['dfu.status.set_update_mode']();
		} catch (error) {
			updateStatus = `${error instanceof Error ? error.message : 'Unknown error'}`;
			console.error('Set update mode error:', error);
		} finally {
			isUpdating = false;
		}
	}

	async function handleSelectDFUDevice() {
		try {
			isUpdating = true;
			updateStatus = m['dfu.status.selecting_dfu']();

			if (!firmwareUpdater) {
				updateStatus = m['dfu.status.firmware_updater_not_initialized']();
				return;
			}

			dfuDevice = await firmwareUpdater.selectDFUDevice();
			updateStatus = m['dfu.status.dfu_selected']();
		} catch (error) {
			updateStatus = `${error instanceof Error ? error.message : 'Unknown error'}`;
			console.error('Select DFU device error:', error);
		} finally {
			isUpdating = false;
		}
	}

	async function handleFlashFirmware() {
		if (!dfuDevice || !selectedFirmware) {
			updateStatus = m['dfu.status.please_select']();
			return;
		}

		try {
			isUpdating = true;
			updateProgress = 0;
			updateStatus = m['dfu.status.starting_update']();

			if (!firmwareUpdater) {
				updateStatus = m['dfu.status.firmware_updater_not_initialized']();
				return;
			}

			const firmwareBuffer = await firmwareUpdater.downloadFirmware(selectedFirmware);
			await firmwareUpdater.flashFirmware(dfuDevice, firmwareBuffer);

			updateStatus = m['dfu.status.firmware_completed']();
			updateProgress = 100;
		} catch (error) {
			updateStatus = `${error instanceof Error ? error.message : 'Unknown error'}`;
			console.error('Flash firmware error:', error);
		} finally {
			isUpdating = false;
		}
	}
</script>

<!-- TODO: add button to check version -->
<div class="mx-auto w-full max-w-2xl space-y-6">
	<!-- Device and firmware selection -->
	<div class="flex flex-col gap-6 rounded-lg bg-gray-800 p-6 shadow md:flex-row">
		<div class="flex-1">
			<label class="mb-2 block font-semibold" for="device-select">{m['select.device']()}</label>
			<select id="device-select" class="select w-full" bind:value={selectedDevice}>
				{#each Object.values(Device) as device}
					<option value={device}>{device}</option>
				{/each}
			</select>
		</div>
		<div class="flex-1">
			<label class="mb-2 block font-semibold" for="firmware-select">{m['select.firmware']()}</label>
			<select id="firmware-select" class="select w-full" bind:value={selectedFirmware}>
				{#each firmwareList as fw}
					<option value={fw}>{m['firmware.version']({ version: fw.version, date: fw.date })}</option
					>
				{/each}
			</select>
		</div>
	</div>

	<!-- Release notes -->
	{#if selectedFirmware}
		<div class="rounded-lg bg-gray-800 p-6 shadow">
			<strong class="mb-2 block">{m['firmware.release_notes']()}:</strong>
			<div class="whitespace-pre-line text-gray-300">{selectedFirmware?.notes}</div>
		</div>
	{/if}

	<!-- DFU Steps -->
	<div class="flex flex-col items-center gap-6 rounded-lg bg-gray-800 p-6 shadow">
		<div class="flex flex-col items-center justify-center gap-3">
			<div class="text-center">
				<p>{m['dfu.step.set_update_mode']({ tracker: selectedDevice })}</p>
				<p class="text-sm opacity-70">
					{selectedDevice === Device.HaritoraX2
						? m['dfu.step_note.set_update_mode']().replace('HaritoraXW-Update', 'HaritoraX2-Update')
						: m['dfu.step_note.set_update_mode']()}
				</p>
			</div>
			<button class="btn bg-primary-500" disabled={isUpdating} onclick={handleSetUpdateMode}>
				{m['dfu.button.set_update_mode']()}
			</button>
		</div>
		<hr class="hr" />
		<div class="flex flex-col items-center justify-center gap-3">
			<div class="text-center">
				<p>{m['dfu.step.select_update_mode']({ tracker: selectedDevice })}</p>
				<p class="text-sm opacity-70">
					{selectedDevice === Device.HaritoraX2
						? m['dfu.step_note.select_update_mode']().replace(
								'HaritoraXW-Update',
								'HaritoraX2-Update'
							)
						: m['dfu.step_note.select_update_mode']()}
				</p>
			</div>
			<button class="btn bg-primary-500" disabled={isUpdating} onclick={handleSelectDFUDevice}>
				{m['dfu.button.select_update_mode']()}
			</button>
		</div>
		<hr class="hr" />
		<div class="flex flex-col items-center justify-center gap-3">
			<div class="text-center">
				<p>{m['dfu.step.flash']({ tracker: selectedDevice })}</p>
				<p class="text-sm opacity-70">{m['dfu.step_note.flash']()}</p>
			</div>
			<button
				class="btn bg-secondary-500"
				disabled={isUpdating || !dfuDevice || !selectedFirmware}
				onclick={handleFlashFirmware}
			>
				{m['dfu.button.flash']()}
			</button>
		</div>
		<hr class="hr" />
		<div class="flex w-full flex-col items-center justify-center gap-4 text-center">
			<p>{m['dfu.status.status']({ status: updateStatus })}</p>
			<Progress value={updateProgress > 0 ? updateProgress : null} />
		</div>
	</div>

	<!-- Debug log (optional) -->
	{#if logMessages.length > 0}
		<div class="rounded-lg bg-gray-800 p-6 shadow">
			<strong class="mb-2 block">Debug Log:</strong>
			<div class="max-h-40 overflow-y-auto font-mono text-xs text-gray-400">
				{#each logMessages as message}
					<div>{message}</div>
				{/each}
			</div>
		</div>
	{/if}

	<p class="mt-10 text-center text-sm opacity-70">
		{m['disclaimer']()}
	</p>
</div>
