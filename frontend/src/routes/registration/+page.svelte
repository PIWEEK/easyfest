<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import timonIcon from '../../assets/images/timon.svg';
	import skullIcon from '../../assets/images/calavera.svg';

	let { data } = $props();

	const EVENT_STATUS = {
		HYPE: 'hype',
		PUBLIC: 'public',
		FINISHED: 'finished'
	};

	const registrationInfo = $derived(data.fetch_registration_info_data ?? {});
	const site = $derived(data.fetch_site_data ?? {});
	const eventStatus = $derived(site.eventStatus ?? EVENT_STATUS.HYPE);
	const registrationFormUrl = 'https://forms.gle/WumaSCAoXLTspAe2A';

	function parseRegistrationContent(content?: string) {
		if (!content) {
			return {
				normalBlocks: [],
				steps: []
			};
		}

		const blocks = content
			.trim()
			.split(/\n\s*\n/)
			.map((block) => block.trim())
			.filter(Boolean);

		const normalBlocks = [];
		const steps = [];

		for (const block of blocks) {
			const match = block.match(/^(\d+)[\).\s-]+([\s\S]*)$/);

			if (match) {
				steps.push(match[2].trim());
			} else {
				normalBlocks.push(block);
			}
		}

		return { normalBlocks, steps };
	}

	function statusLabel(content: string | undefined, fallback: string) {
		if (!content) return fallback;

		return content
			.replace(/[#*_`>~-]/g, '')
			.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
			.trim();
	}

	const registrationContent = $derived(parseRegistrationContent(registrationInfo.content));
	const soonLabel = $derived(
		statusLabel(registrationInfo.content_soon, 'Pronto abriremos las inscripciones')
	);
	const openLabel = $derived(
		statusLabel(registrationInfo.content_open, '¡Inscripciones abiertas!')
	);
	const finishedLabel = $derived(
		statusLabel(registrationInfo.content_finished, 'Inscripciones finalizadas')
	);
</script>

<section class="hero page-title">
	<h3 class="title">{registrationInfo.title}</h3>
</section>

<section class="section registration-page">
	<div class="container">
		<div class="content content-border">
			<section class="registration-status">
				<div class="registration-status__sign">
					<img
						class="registration-status__icon registration-status__icon--left"
						src={timonIcon}
						alt=""
					/>

					<div class="registration-status__buttons">
						{#if eventStatus === EVENT_STATUS.HYPE}
							<span
								class="button registration-status__button registration-status__button--disabled"
								aria-disabled="true"
							>
								{soonLabel}
							</span>
						{:else if eventStatus === EVENT_STATUS.PUBLIC}
							<a
								href={registrationFormUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="button registration-status__button"
							>
								{openLabel} <span aria-hidden="true">→</span>
							</a>
						{:else if eventStatus === EVENT_STATUS.FINISHED}
							<p class="registration-status__message">{finishedLabel}</p>
						{/if}
					</div>

					<img
						class="registration-status__icon registration-status__icon--right"
						src={skullIcon}
						alt=""
					/>
				</div>
			</section>

			<section class="registration-process">
				{#if registrationContent.normalBlocks.length > 0}
					<div class="registration-process__intro">
						{#each registrationContent.normalBlocks as block}
							<SvelteMarkdown options={{ mangle: false }} source={block} />
						{/each}
					</div>
				{/if}

				{#if registrationContent.steps.length > 0}
					<ol class="registration-steps">
						{#each registrationContent.steps as step, index}
							<li class="registration-step">
								<span class="registration-step__number">{index + 1}</span>
								<div class="registration-step__content">
									<SvelteMarkdown options={{ mangle: false }} source={step} />
								</div>
							</li>
						{/each}
					</ol>
				{/if}
			</section>
		</div>
	</div>
</section>

<style>
	.registration-status {
		margin-bottom: 3rem;
	}

	.registration-status__sign {
		position: relative;
		display: grid;
		grid-template-columns: 6.5rem minmax(0, 1fr) 6.5rem;
		align-items: center;
		gap: 1rem;
		max-width: min(100%, 52rem);
		margin-right: auto;
		margin-left: auto;
		padding: 1rem;
		overflow: hidden;
		border: 3px solid #4d2b13;
		background:
			linear-gradient(
				90deg,
				rgba(70, 38, 15, 0.28),
				transparent 14%,
				transparent 86%,
				rgba(70, 38, 15, 0.28)
			),
			repeating-linear-gradient(
				90deg,
				#8a5a2b 0,
				#8a5a2b 1.7rem,
				#7a4b22 1.7rem,
				#7a4b22 1.9rem,
				#9b6a35 1.9rem,
				#9b6a35 3.6rem
			);
		box-shadow:
			inset 0 0 0 2px rgba(255, 226, 154, 0.22),
			inset 0 0 1.8rem rgba(45, 22, 8, 0.5),
			0 1.1rem 2.4rem rgba(13, 59, 68, 0.24);
	}

	.registration-status__sign::before,
	.registration-status__sign::after {
		content: '';
		position: absolute;
		top: 0.75rem;
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 50%;
		background: radial-gradient(circle, #f3d27a 0 28%, #6c3d1b 30% 100%);
		box-shadow:
			0 0 0 2px rgba(45, 22, 8, 0.35),
			0 0.15rem 0.25rem rgba(0, 0, 0, 0.35);
	}

	.registration-status__sign::before {
		left: 0.75rem;
	}

	.registration-status__sign::after {
		right: 0.75rem;
	}

	.registration-status__icon {
		display: block;
		width: 100%;
		max-width: 4.8rem;
		height: auto;
		justify-self: center;
		opacity: 0.92;
		filter: brightness(0) invert(1) drop-shadow(0 0.25rem 0.25rem rgba(45, 22, 8, 0.45));
	}

	.registration-status__icon--left {
		transform: rotate(-8deg);
	}

	.registration-status__icon--right {
		transform: rotate(8deg);
	}

	.registration-status__buttons {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 0.9rem;
		max-width: 100%;
		padding: 1.15rem 1.4rem;
		border: 2px solid rgba(77, 43, 19, 0.78);
		background:
			linear-gradient(rgba(255, 244, 207, 0.92), rgba(255, 244, 207, 0.92)),
			radial-gradient(circle at 20% 20%, rgba(176, 107, 45, 0.18), transparent 34%),
			radial-gradient(circle at 80% 80%, rgba(13, 59, 68, 0.12), transparent 38%);
		box-shadow:
			inset 0 0 0 3px rgba(255, 255, 255, 0.35),
			0 0.55rem 1rem rgba(45, 22, 8, 0.24);
	}

	.registration-status__buttons::before,
	.registration-status__buttons::after {
		content: '';
		position: absolute;
		right: 1rem;
		left: 1rem;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(77, 43, 19, 0.5), transparent);
	}

	.registration-status__buttons::before {
		top: 0.55rem;
	}

	.registration-status__buttons::after {
		bottom: 0.55rem;
	}

	.registration-status__button,
	.registration-status__message {
		position: relative;
		z-index: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		max-width: 100%;
		font-family: var(--bulma-family-primary, inherit);
		line-height: 1.25;
		text-align: center;
		white-space: normal;
		overflow-wrap: anywhere;
		hyphens: none;
	}

	.registration-status__button {
		min-height: auto;
		height: auto;
		padding: 1rem 2.1rem;
		overflow: hidden;
		border: 1px solid rgba(255, 244, 207, 0.72);
		border-radius: 999px;
		background:
			linear-gradient(135deg, rgba(255, 255, 255, 0.18), transparent 38%),
			linear-gradient(180deg, #ffe6a3 0%, #d7b56d 54%, #a96b2b 100%);
		color: #0d3b44;
		font-size: 1.1rem;
		font-weight: 900;
		text-shadow: 0 1px 0 rgba(255, 255, 255, 0.38);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.72),
			inset 0 -0.25rem 0 rgba(77, 43, 19, 0.22),
			0 0.9rem 1.8rem rgba(45, 22, 8, 0.28);
		transition:
			transform 180ms ease,
			box-shadow 180ms ease,
			filter 180ms ease;
	}

	.registration-status__button::before {
		content: '';
		position: absolute;
		inset: 0.28rem;
		border: 1px solid rgba(77, 43, 19, 0.28);
		border-radius: inherit;
		pointer-events: none;
	}

	.registration-status__button::after {
		content: '';
		position: absolute;
		top: -60%;
		left: -35%;
		width: 32%;
		height: 220%;
		background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.45), transparent);
		transform: rotate(18deg);
		transition: left 260ms ease;
		pointer-events: none;
	}

	.registration-status__button:hover {
		border-color: rgba(255, 244, 207, 0.9);
		background:
			linear-gradient(135deg, rgba(255, 255, 255, 0.22), transparent 38%),
			linear-gradient(180deg, #fff0bd 0%, #ddb96d 54%, #a96b2b 100%);
		color: #0d3b44;
		filter: brightness(1.03);
		transform: translateY(-2px);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.8),
			inset 0 -0.25rem 0 rgba(77, 43, 19, 0.24),
			0 1.1rem 2rem rgba(45, 22, 8, 0.34);
	}

	.registration-status__button:hover::after {
		left: 105%;
	}

	.registration-status__button span {
		display: inline-block;
		flex-shrink: 0;
		margin-left: 0.35rem;
		line-height: 1;
		transition: transform 180ms ease;
	}

	.registration-status__button:hover span {
		transform: translateX(3px);
	}

	.registration-status__button--disabled,
	.registration-status__button--disabled:hover {
		cursor: not-allowed;
		border-color: rgba(255, 244, 207, 0.36);
		background:
			linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent 38%),
			linear-gradient(180deg, rgba(215, 181, 109, 0.52), rgba(169, 107, 43, 0.44));
		color: rgba(13, 59, 68, 0.62);
		text-shadow: none;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.26),
			inset 0 -0.2rem 0 rgba(77, 43, 19, 0.12),
			0 0.65rem 1.2rem rgba(45, 22, 8, 0.18);
		filter: none;
		transform: none;
	}

	.registration-status__button--disabled::after {
		display: none;
	}

	.registration-status__message {
		margin: 0;
		padding: 0.9rem 1.4rem;
		border: 2px solid #4d2b13;
		background: rgba(13, 59, 68, 0.88);
		color: rgba(255, 244, 207, 0.96);
		font-weight: 700;
		box-shadow:
			inset 0 0 0 2px rgba(255, 255, 255, 0.08),
			0 0.55rem 1rem rgba(45, 22, 8, 0.24);
	}

	.registration-process__intro {
		margin-bottom: 2rem;
	}

	.registration-steps {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.registration-step {
		position: relative;
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: 1.1rem;
		margin-bottom: 1.4rem;
	}

	.registration-step:not(:last-child)::before {
		content: '';
		position: absolute;
		top: 3rem;
		bottom: -1.4rem;
		left: 1.35rem;
		width: 0.35rem;
		border-radius: 999px;
		background: repeating-linear-gradient(
			180deg,
			#b06b2d 0,
			#b06b2d 0.45rem,
			#d7b56d 0.45rem,
			#d7b56d 0.9rem
		);
		box-shadow: inset 0 0 0 1px rgba(13, 59, 68, 0.12);
	}

	.registration-step__number {
		position: relative;
		z-index: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 3rem;
		height: 3rem;
		border: 3px solid #b06b2d;
		border-radius: 50%;
		background: #ffffff;
		color: #0d3b44;
		font-family: var(--bulma-family-primary, inherit);
		font-weight: 700;
		box-shadow:
			0 0 0 0.35rem rgba(255, 255, 255, 0.95),
			0 0.5rem 1rem rgba(13, 59, 68, 0.12);
	}

	.registration-step__content {
		padding: 1rem 1.25rem;
		border-left: 4px solid #43b2dc;
		background: rgba(255, 255, 255, 0.72);
		box-shadow: 0 0.6rem 1.4rem rgba(13, 59, 68, 0.08);
	}

	.registration-step__content :global(p) {
		margin: 0;
	}

	@media screen and (max-width: 768px) {
		.registration-status {
			margin-bottom: 2.25rem;
		}

		.registration-status__sign {
			display: block;
			max-width: 100%;
			padding: 0.85rem;
		}

		.registration-status__icon {
			position: relative;
			display: block;
			width: 3.25rem;
			max-width: 3.25rem;
			margin-right: auto;
			margin-left: auto;
			opacity: 0.92;
			pointer-events: none;
		}

		.registration-status__icon--left {
			margin-bottom: 0.65rem;
			transform: rotate(-8deg);
		}

		.registration-status__icon--right {
			margin-top: 0.65rem;
			transform: rotate(8deg);
		}

		.registration-status__buttons {
			z-index: 1;
			width: 100%;
			min-width: 0;
			padding: 1rem 0.85rem;
		}

		.registration-status__button,
		.registration-status__message {
			width: 100%;
			max-width: 100%;
			min-width: 0;
			padding: 0.9rem 1rem;
			overflow: visible;
			font-size: clamp(0.88rem, 3.7vw, 1rem);
			line-height: 1.25;
		}

		.registration-status__button span {
			margin-left: 0.25rem;
		}

		.registration-step {
			gap: 0.85rem;
		}

		.registration-step__content {
			padding: 0.9rem 1rem;
		}
	}
</style>
