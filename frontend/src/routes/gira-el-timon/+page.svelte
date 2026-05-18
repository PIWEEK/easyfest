<script lang="ts">
	import SvelteMarkdown from '@humanspeak/svelte-markdown';
	import timonImage from '../../assets/images/timon_png.png';

	let { data } = $props();

	const TOTAL_OPTIONS = 8;
	const SLICE_DEGREES = 360 / TOTAL_OPTIONS;

	let wheelRotation = $state(0);
	let isSpinning = $state(false);
	let selectedPrize = $state(null);

	function parseWheelContent(content = '') {
		const lines = content.split('\n');
		const introLines = [];
		const prizes = [];
		let currentPrize = null;
		let hasStartedPrizes = false;

		for (const line of lines) {
			const match = line.match(/^\s*(\d{1,2})[\).\s-]+(.+)$/);

			if (match) {
				hasStartedPrizes = true;

				if (currentPrize) prizes.push(currentPrize);

				currentPrize = {
					number: Number(match[1]),
					text: match[2].trim()
				};

				continue;
			}

			if (hasStartedPrizes && currentPrize && line.trim()) {
				currentPrize.text += `\n${line.trim()}`;
			} else if (!hasStartedPrizes) {
				introLines.push(line);
			}
		}

		if (currentPrize) prizes.push(currentPrize);

		return {
			intro: introLines.join('\n').trim(),
			prizes: Array.from({ length: TOTAL_OPTIONS }, (_, index) => {
				const number = index + 1;
				return (
					prizes.find((prize) => prize.number === number) ?? {
						number,
						text: `Premio ${number}`
					}
				);
			})
		};
	}

	const wheelContent = $derived(parseWheelContent(data.content));
	const prizes = $derived(wheelContent.prizes);

	function spinWheel() {
		if (isSpinning || prizes.length === 0) return;

		isSpinning = true;
		selectedPrize = null;

		const selectedIndex = Math.floor(Math.random() * TOTAL_OPTIONS);
		const fullSpins = 5 + Math.floor(Math.random() * 3);

		const currentRotation = ((wheelRotation % 360) + 360) % 360;
		const desiredRotation = (360 - selectedIndex * SLICE_DEGREES) % 360;
		const correctionRotation = (desiredRotation - currentRotation + 360) % 360;

		wheelRotation += fullSpins * 360 + correctionRotation;

		window.setTimeout(() => {
			selectedPrize = prizes[selectedIndex];
			isSpinning = false;
		}, 2800);
	}

	function closePrize() {
		selectedPrize = null;
	}
</script>

<section class="hero page-title">
	<h3 class="title">{data.title}</h3>
</section>

<section class="section wheel-page">
	<div class="container">
		<div class="content content-border">
			{#if wheelContent.intro}
				<div class="wheel-intro">
					<SvelteMarkdown options={{ mangle: false }} source={wheelContent.intro} />
				</div>
			{/if}

			<div class="wheel-game">
				<button
					class="button wheel-spin-button"
					type="button"
					disabled={isSpinning}
					onclick={spinWheel}
				>
					{isSpinning ? 'El timón está girando...' : 'Pulsa para girar el timón'}
				</button>

				<div class="wheel-stage">
					<div class="wheel-pointer" aria-hidden="true"></div>

					<div
						class="wheel"
						style={`--wheel-rotation: ${wheelRotation}deg;`}
						aria-label="Timón de premios"
					>
						<img class="wheel__image" src={timonImage} alt="" />

						{#each prizes as prize, index}
							<div
								class="wheel__number"
								style={`--angle: ${index * SLICE_DEGREES}deg;`}
								aria-label={`Opción ${prize.number}`}
							>
								<span>{prize.number}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

{#if selectedPrize}
	<div class="prize-modal" role="dialog" aria-modal="true">
		<button class="prize-modal__backdrop" type="button" aria-label="Cerrar" onclick={closePrize}
		></button>

		<article class="prize-card">
			<p class="prize-card__eyebrow">Te ha tocado...</p>
			<h4 class="prize-card__title">El número {selectedPrize.number}</h4>

			<div class="content prize-card__content">
				<SvelteMarkdown options={{ mangle: false }} source={selectedPrize.text} />
			</div>

			<button class="button prize-card__button" type="button" onclick={closePrize}>Cerrar</button>
		</article>
	</div>
{/if}

<style>
	.wheel-intro {
		margin-bottom: 2.5rem;
	}

	.wheel-game {
		display: grid;
		justify-items: center;
		gap: 2rem;
		padding: 1rem 0 2rem;
	}

	.wheel-spin-button {
		padding: 1rem 2rem;
		background: #d7b56d;
		color: #0d3b44;
		font-family: var(--bulma-family-primary, inherit);
		font-weight: 800;
		box-shadow: 0 0.8rem 1.8rem rgba(13, 59, 68, 0.18);
	}

	.wheel-spin-button:hover:not(:disabled) {
		background: #e6c77b;
		color: #0d3b44;
		transform: translateY(-2px);
	}

	.wheel-stage {
		--number-radius: 11.5rem;

		position: relative;
		width: min(100%, 34rem);
		aspect-ratio: 1;
		display: grid;
		place-items: center;
	}

	.wheel-pointer {
		position: absolute;
		top: -2.9rem;
		left: 50%;
		z-index: 6;
		width: 4rem;
		height: 5.2rem;
		transform: translateX(-50%);
		filter: drop-shadow(0 0.45rem 0.35rem rgba(13, 59, 68, 0.42));
		pointer-events: none;
	}

	.wheel-pointer::before {
		content: '';
		position: absolute;
		top: 0;
		left: 50%;
		width: 1.55rem;
		height: 1.55rem;
		border: 3px solid #3b1f0d;
		border-radius: 50%;
		background: radial-gradient(circle, #fff0bd 0 28%, #d7b56d 30% 58%, #6c3d1b 60%);
		transform: translateX(-50%);
		box-shadow:
			inset 0 0 0 2px rgba(255, 255, 255, 0.35),
			0 0.25rem 0.45rem rgba(45, 22, 8, 0.35);
	}

	.wheel-pointer::after {
		content: '';
		position: absolute;
		top: 1.15rem;
		left: 50%;
		width: 2.25rem;
		height: 3.7rem;
		background:
			linear-gradient(90deg, rgba(255, 255, 255, 0.35), transparent 35%),
			linear-gradient(180deg, #ffe6a3 0%, #d7b56d 42%, #8a4f20 100%);
		clip-path: polygon(50% 100%, 0 0, 100% 0);
		transform: translateX(-50%);
		box-shadow:
			inset 0 0 0 1px rgba(255, 255, 255, 0.28),
			inset 0 -0.55rem 0 rgba(77, 43, 19, 0.32);
	}

	.wheel {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		transform: rotate(var(--wheel-rotation));
		transition: transform 2.8s cubic-bezier(0.12, 0.72, 0.18, 1);
	}

	.wheel__image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		filter: drop-shadow(0 1rem 1.6rem rgba(13, 59, 68, 0.22));
	}

	.wheel__number {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(var(--angle))
			translateY(calc(-1 * var(--number-radius))) rotate(calc(-1 * var(--angle)));
		width: 3rem;
		height: 3rem;
		display: grid;
		place-items: center;
		border: 2px solid #0d3b44;
		border-radius: 50%;
		background: rgba(255, 244, 207, 0.96);
		color: #0d3b44;
		font-family: var(--bulma-family-primary, inherit);
		font-weight: 800;
		box-shadow: 0 0.45rem 0.9rem rgba(13, 59, 68, 0.16);
	}

	.wheel__number span {
		display: block;
		transform: rotate(calc(-1 * var(--wheel-rotation)));
	}

	.prize-modal {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: grid;
		place-items: center;
		padding: 1rem;
	}

	.prize-modal__backdrop {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.55);
		border: 0;
	}

	.prize-card {
		position: relative;
		z-index: 1;
		width: min(100%, 34rem);
		padding: 2rem;
		background: #fff4cf;
		border: 3px solid #4d2b13;
		box-shadow:
			inset 0 0 0 4px rgba(255, 255, 255, 0.38),
			0 1.4rem 3rem rgba(0, 0, 0, 0.32);
		text-align: center;
	}

	.prize-card__eyebrow {
		margin-bottom: 0.4rem;
		font-family: var(--bulma-family-primary, inherit);
		font-weight: 800;
		text-transform: uppercase;
		color: #b06b2d;
	}

	.prize-card__title {
		margin-bottom: 1rem;
		color: #0d3b44;
	}

	.prize-card__content {
		text-align: left;
	}

	.prize-card__button {
		margin-top: 1rem;
		background: #0d3b44;
		color: #ffffff;
	}

	@media screen and (max-width: 768px) {
		.wheel-stage {
			--number-radius: 7.4rem;
			width: min(100%, 22rem);
		}

		.wheel__number {
			width: 2.25rem;
			height: 2.25rem;
			font-size: 0.9rem;
		}
	}
</style>
