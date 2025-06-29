<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { type FirmwareVersion } from '$lib/store';
	import { Device, firmwareVersions } from '$lib/store';
	import { Progress } from '@skeletonlabs/skeleton-svelte';

	let selectedDevice = $state(Device.HaritoraX2);
	let firmwareList = $derived(firmwareVersions[selectedDevice]);
	let selectedFirmware = $state<FirmwareVersion>();

	$effect(() => {
		selectedFirmware = firmwareList[0];
	});
</script>

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
					<option value={fw}>{m['firmware.version']({ version: fw.version, date: fw.date })}</option>
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
				<p class="text-sm opacity-70">{m['dfu.step_note.set_update_mode']()}</p>
			</div>
			<button
				class="btn bg-primary-500"
				onclick={() => {
					alert('Set device to update mode (placeholder)');
				}}>{m['dfu.button.set_update_mode']()}</button
			>
		</div>
		<hr class="hr" />
		<div class="flex flex-col items-center justify-center gap-3">
			<div class="text-center">
				<p>{m['dfu.step.select_update_mode']({ tracker: selectedDevice })}</p>
				<p class="text-sm opacity-70">{m['dfu.step_note.select_update_mode']()}</p>
			</div>
			<button
				class="btn bg-primary-500"
				onclick={() => {
					alert('Select device in update mode (placeholder)');
				}}>{m['dfu.button.select_update_mode']()}</button
			>
		</div>
		<hr class="hr" />
		<div class="flex flex-col items-center justify-center gap-3">
			<div class="text-center">
				<p>{m['dfu.step.flash']({ tracker: selectedDevice })}</p>
				<p class="text-sm opacity-70">{m['dfu.step_note.flash']()}</p>
			</div>
			<button class="btn bg-secondary-500" onclick={() => alert('Flashing firmware (placeholder)')}
				>{m['dfu.button.flash']()}</button
			>
		</div>
		<hr class="hr" />
		<div class="flex flex-col items-center justify-center gap-4">
			<p>{m['dfu.progress.status']({ status: 'meow' })}</p>
			<Progress value={null} />
		</div>
	</div>

	<p class="mt-10 text-center text-sm opacity-70">
		{m['disclaimer']()}
	</p>
</div>
