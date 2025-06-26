<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { currentLocale, updateLocale, type FirmwareVersion } from '$lib/store';
	import { Device, firmwareVersions } from '$lib/store';

	let selectedDevice = $state(Device.HaritoraX2);
	let firmwareList = $derived(firmwareVersions[selectedDevice]);
	let selectedFirmware = $state<FirmwareVersion>();
	let dfuStep = $state(1);

	$effect(() => {
		selectedFirmware = firmwareList[0];
	});
</script>

<div class="mb-6 flex justify-center gap-3">
	<button
		class="btn btn-sm bg-primary-500 {$currentLocale === 'en' ? 'bg-primary-800' : ''}"
		onclick={() => updateLocale('en')}>en</button
	>
	<button
		class="btn btn-sm bg-primary-500 {$currentLocale === 'ja' ? 'bg-primary-800' : ''}"
		onclick={() => updateLocale('ja')}>ja</button
	>
</div>

<div class="mx-auto w-full max-w-2xl space-y-6">
	<!-- Device and firmware selection -->
	<div class="flex flex-col gap-6 rounded-lg bg-gray-800 p-6 shadow md:flex-row">
		<div class="flex-1">
			<label class="mb-2 block font-semibold" for="device-select"
				>{m.select_device({ tracker: selectedDevice })}</label
			>
			<select id="device-select" class="select w-full" bind:value={selectedDevice}>
				{#each Object.values(Device) as device}
					<option value={device}>{device}</option>
				{/each}
			</select>
		</div>
		<div class="flex-1">
			<label class="mb-2 block font-semibold" for="firmware-select">{m.select_firmware()}</label>
			<select id="firmware-select" class="select w-full" bind:value={selectedFirmware}>
				{#each firmwareList as fw}
					<option value={fw}>{m.firmware_version({ version: fw.version, date: fw.date })}</option>
				{/each}
			</select>
		</div>
	</div>

	<!-- Release notes -->
	{#if selectedFirmware}
		<div class="rounded-lg bg-gray-800 p-6 shadow">
			<strong class="mb-2 block">{m.release_notes()}:</strong>
			<div class="whitespace-pre-line text-gray-300">{selectedFirmware?.notes}</div>
		</div>
	{/if}

	<!-- DFU Steps -->
	<div class="flex flex-col items-center gap-6 rounded-lg bg-gray-800 p-6 shadow">
		<div class="flex flex-col items-center justify-center gap-3">
			<div class="text-center">
				<p>{m.dfu_step_set_update_mode({ tracker: selectedDevice })}</p>
				<p class="text-sm opacity-70">{m.dfu_step_set_update_mode_note()}</p>
			</div>
			<button
				class="btn bg-primary-500"
				onclick={() => {
					alert('Set device to update mode (placeholder)');
					dfuStep = 2;
				}}>{m.button_set_update_mode()}</button
			>
		</div>
		<hr class="hr" />
		<div class="flex flex-col items-center justify-center gap-3">
			<div class="text-center">
				<p>{m.dfu_step_select_update_mode({ tracker: selectedDevice })}</p>
				<p class="text-sm opacity-70">{m.dfu_step_select_update_mode_note()}</p>
			</div>
			<button
				class="btn bg-primary-500"
				onclick={() => {
					alert('Select device in update mode (placeholder)');
					dfuStep = 3;
				}}>{m.button_select_update_mode()}</button
			>
		</div>
		<hr class="hr" />
		<div class="flex flex-col items-center justify-center gap-3">
			<div class="text-center">
				<p>{m.dfu_step_flash({ tracker: selectedDevice })}</p>
				<p class="text-sm opacity-70">{m.dfu_step_flash_note()}</p>
			</div>
			<button class="btn bg-secondary-500" onclick={() => alert('Flashing firmware (placeholder)')}
				>{m.button_flash()}</button
			>
		</div>
	</div>
</div>

<p class="mt-10 text-center text-sm opacity-70">
	{m.disclaimer()}
</p>
