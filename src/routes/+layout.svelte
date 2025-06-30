<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { currentLocale } from '$lib/store';
	import '../app.css';
	import Toast from '$lib/components/Toast.svelte';
	import { type Toast as ToastType, toasts } from '$lib/store/ToastProvider';

	let { children } = $props();

	let toastList = $state<ToastType[]>([]);
	toasts.subscribe((value) => {
		toastList = value as ToastType[];
	});
</script>

<!-- #key used so we can force re-render when locale updates -->
{#key $currentLocale}
	<div
		class="app flex min-h-screen flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-gray-100"
	>
		<Header />

		<main class="flex flex-1 flex-col items-center justify-center px-4 py-8">
			{@render children()}
		</main>

		<Footer />
	</div>
{/key}

<div class="fixed right-0 bottom-28 z-50 flex flex-col-reverse gap-4 p-4 md:bottom-0">
	{#each toastList as { id, type, message, durations }}
		<div class="flex justify-end">
			<Toast {id} {type} {message} {durations} />
		</div>
	{/each}
</div>
