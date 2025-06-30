<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { currentLocale, packetSendDelay, showAllVersions } from '$lib/store';
	import '../app.css';
	import { getLocale } from '$lib/paraglide/runtime';

	let { children } = $props();
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
