<script lang="js">
	/* Ejecuta código solo en navegador, después del render inicial */
	import { onMount } from 'svelte';

	/* Renderiza contenido Markdown procedente de Strapi */
	import SvelteMarkdown from '@humanspeak/svelte-markdown';

	/* Sistema de modales para abrir la ficha de cada perfil */
	import { modals } from 'svelte-modals';
	import Modal from '$lib/ProfileModal.svelte';

	/* Logo usado como imagen de respaldo y como centro de la órbita */
	import crewLogo from '../../assets/images/easyfest_logo.png';

	/* URL base de archivos subidos a Strapi */
	const storage_url = import.meta.env.VITE_STORAGE_URL;

	/* Datos recibidos desde la carga de la página */
	let { data } = $props();

	/* Abre el modal con la información del perfil seleccionado */
	function handleClick(publicprofile) {
		modals.open(Modal, { profile: publicprofile });
	}

	/* Obtiene una clave única para que Svelte no mezcle perfiles al reordenar */
	function getProfileKey(profile) {
		return profile.documentId ?? profile.id ?? profile.fullname;
	}

	/* Lee el orden definido en Strapi; si falta, lo manda al final */
	function getProfileOrder(profile) {
		return Number(profile.order ?? profile.position ?? profile.sort ?? 999);
	}

	/* Devuelve una copia del array en orden aleatorio */
	function shuffle(array) {
		const arr = [...array];

		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}

		return arr;
	}

	/* Orden base estable procedente de Strapi */
	const orderedProfiles = [...(data.org_profiles ?? [])].sort((a, b) => {
		return getProfileOrder(a) - getProfileOrder(b);
	});

	/* Perfiles 1 a 3: capitanes */
	const orderedCaptains = orderedProfiles.filter((profile) => {
		const order = getProfileOrder(profile);
		return order >= 1 && order <= 3;
	});

	/* Perfiles 4 en adelante: tripulación */
	const orderedCrew = orderedProfiles.filter((profile) => {
		return getProfileOrder(profile) >= 4;
	});

	/* Estado reactivo final que se pintará en pantalla */
	let captains = $state([]);
	let crew = $state([]);
	let isCrewReady = $state(false);

	/*
	 * Orden aleatorio solo en cliente para que cada imagen mantenga correctamente asociada su ficha/modal.
	 */
	onMount(() => {
		captains = shuffle(orderedCaptains);
		crew = shuffle(orderedCrew);
		isCrewReady = true;
	});
</script>

<section class="hero page-title">
	<h3 class="title">{data.org_team.title}</h3>
</section>

<section class="section">
	<div class="container">
		<div class="content team-intro">
			{#if data.org_team.content}
				<SvelteMarkdown options={{ mangle: false }} source={data.org_team.content} />
			{/if}
		</div>

		<div class="crew-chart">
			<div class="crew-chart__intro">
				<span class="crew-chart__eyebrow">Carta de tripulación</span>
				<h4 class="crew-chart__title">La nave de la Mereth Gaerlen</h4>
				<p class="crew-chart__text">
					Pulsad sobre cada rostro para descubrir quién es quién en esta travesía.
				</p>
			</div>

			{#if isCrewReady}
				<div class="crew-orbit">
					<div class="crew-orbit__ring crew-orbit__ring--outer"></div>
					<div class="crew-orbit__ring crew-orbit__ring--inner"></div>

					<div class="captains-core">
						<div class="captains-core__hub">
							<img src={crewLogo} alt="Logo Mereth Gaerlen" class="captains-core__logo" />
						</div>

						{#each captains as captain, i (getProfileKey(captain))}
							<button
								type="button"
								class="profile-node profile-node--captain"
								style={`--angle:${i * 120}deg;`}
								onclick={() => handleClick(captain)}
								aria-label={`Abrir perfil de ${captain.fullname}`}
								title={captain.fullname}
							>
								<span class="profile-node__avatar">
									{#if captain.photo?.url}
										<img src="{storage_url}{captain.photo.url}" alt={captain.fullname} />
									{:else}
										<img src={crewLogo} alt={captain.fullname} />
									{/if}
								</span>
							</button>
						{/each}
					</div>

					{#each crew as publicprofile, i (getProfileKey(publicprofile))}
						<button
							type="button"
							class="profile-node profile-node--crew"
							style={`--angle:${i * (360 / crew.length)}deg;`}
							onclick={() => handleClick(publicprofile)}
							aria-label={`Abrir perfil de ${publicprofile.fullname}`}
							title={publicprofile.fullname}
						>
							<span class="profile-node__avatar">
								{#if publicprofile.photo?.url}
									<img src="{storage_url}{publicprofile.photo.url}" alt={publicprofile.fullname} />
								{:else}
									<img src={crewLogo} alt={publicprofile.fullname} />
								{/if}
							</span>
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	/* Separación del texto introductorio respecto al bloque visual */
	.team-intro {
		margin-bottom: 2rem;
	}

	/* Contenedor general de la carta de tripulación */
	.crew-chart {
		margin: 3rem auto 1rem;
		padding: 2.2rem 1.5rem 2.8rem;
		border-radius: 2rem;
		background: radial-gradient(
			circle at center,
			rgba(255, 255, 255, 0.94) 0%,
			rgba(204, 234, 245, 0.38) 45%,
			rgba(255, 255, 255, 0.98) 100%
		);
		box-shadow:
			0 18px 45px rgba(13, 59, 68, 0.1),
			inset 0 0 0 1px rgba(13, 59, 68, 0.06);
	}

	/* Cabecera textual del bloque de tripulación */
	.crew-chart__intro {
		text-align: center;
		max-width: 760px;
		margin: 0 auto 2.2rem;
	}

	/* Etiqueta superior: “Carta de tripulación” */
	.crew-chart__eyebrow {
		display: inline-block;
		margin-bottom: 0.9rem;
		padding: 0.5rem 1rem;
		border-radius: 999px;
		background: rgba(13, 59, 68, 0.08);
		color: #0d3b44;
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	/* Título principal del bloque */
	.crew-chart__title {
		margin: 0 0 0.75rem;
		font-size: clamp(1.7rem, 2.3vw, 2.4rem);
		line-height: 1.2;
		color: #0d3b44;
	}

	/* Texto explicativo bajo el título */
	.crew-chart__text {
		margin: 0;
		color: #28464d;
		line-height: 1.65;
	}

	/* Área orbital de escritorio: radios y tamaño general */
	.crew-orbit {
		--captain-radius: 8.6rem;
		--crew-radius: 21.5rem;

		position: relative;
		width: min(100%, 980px);
		height: 900px;
		margin: 0 auto;
		opacity: 0;
		animation: crew-orbit-in 0.25s ease forwards;
	}

	/* Entrada suave del bloque orbital */
	@keyframes crew-orbit-in {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	/* Base común de los círculos orbitales */
	.crew-orbit__ring {
		position: absolute;
		left: 50%;
		top: 50%;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	/* Círculo exterior de tripulantes */
	.crew-orbit__ring--outer {
		width: calc(var(--crew-radius) * 2);
		height: calc(var(--crew-radius) * 2);
		border: 1px dashed rgba(176, 107, 45, 0.35);
		box-shadow: inset 0 0 0 14px rgba(204, 234, 245, 0.12);
	}

	/* Círculo interior de capitanes */
	.crew-orbit__ring--inner {
		width: calc(var(--captain-radius) * 2);
		height: calc(var(--captain-radius) * 2);
		border: 1px solid rgba(13, 59, 68, 0.14);
		box-shadow: inset 0 0 0 12px rgba(255, 255, 255, 0.6);
	}

	/* Área circular donde se colocan los capitanes en escritorio */
	.captains-core {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(var(--captain-radius) * 2);
		height: calc(var(--captain-radius) * 2);
		transform: translate(-50%, -50%);
		border-radius: 50%;
	}

	/* Círculo central con el logo */
	.captains-core__hub {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 100px;
		height: 100px;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #0d3b44, #1e6170);
		box-shadow:
			0 14px 28px rgba(13, 59, 68, 0.22),
			inset 0 0 0 2px rgba(255, 255, 255, 0.18);
		overflow: hidden;
	}

	/* Logo central dentro del círculo */
	.captains-core__logo {
		width: 80%;
		height: 80%;
		object-fit: contain;
		display: block;
	}

	/* Nodo genérico de perfil colocado por ángulo y radio */
	.profile-node {
		position: absolute;
		left: 50%;
		top: 50%;
		border: 0;
		padding: 0;
		margin: 0;
		background: transparent;
		cursor: pointer;
		line-height: 0;
		transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(-1 * var(--radius)))
			rotate(calc(-1 * var(--angle)));
		transition:
			transform 0.25s ease,
			filter 0.25s ease;
	}

	/* Radio orbital de los capitanes */
	.profile-node--captain {
		--radius: var(--captain-radius);
	}

	/* Radio orbital de la tripulación */
	.profile-node--crew {
		--radius: var(--crew-radius);
	}

	/* Efecto hover en escritorio */
	.profile-node:hover {
		transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(-1 * var(--radius)))
			rotate(calc(-1 * var(--angle))) scale(1.07);
		filter: brightness(1.04);
	}

	/* Marco circular de cada avatar */
	.profile-node__avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: 50%;
		background: #fff;
		box-sizing: border-box;
	}

	/* Imagen recortada dentro del círculo */
	.profile-node__avatar img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center center;
		border-radius: 50%;
	}

	/* Avatar de capitán en escritorio */
	.profile-node--captain .profile-node__avatar {
		width: 124px;
		height: 124px;
		border: 4px solid #b06b2d;
		box-shadow:
			0 14px 26px rgba(13, 59, 68, 0.18),
			0 0 0 7px rgba(255, 255, 255, 0.92);
	}

	/* Avatar de tripulante en escritorio */
	.profile-node--crew .profile-node__avatar {
		width: 124px;
		height: 124px;
		border: 4px solid #0d3b44;
		box-shadow:
			0 14px 26px rgba(13, 59, 68, 0.18),
			0 0 0 7px rgba(255, 255, 255, 0.92);
	}

	/* Ajustes intermedios para tablet */
	@media screen and (max-width: 1024px) {
		.crew-orbit {
			--captain-radius: 7.5rem;
			--crew-radius: 17.8rem;
			height: 760px;
		}

		.captains-core__hub {
			width: 85px;
			height: 85px;
		}

		.profile-node--captain .profile-node__avatar {
			width: 104px;
			height: 104px;
		}

		.profile-node--crew .profile-node__avatar {
			width: 104px;
			height: 104px;
		}
	}

	/* Versión móvil: se abandona la órbita y se pasa a retícula */
	@media screen and (max-width: 768px) {
		.crew-chart {
			padding: 1.5rem 0.75rem 2rem;
			border-radius: 1.4rem;
		}

		.crew-chart__intro {
			margin-bottom: 1.5rem;
		}

		.crew-chart__eyebrow {
			font-size: 0.95rem;
			padding: 0.45rem 0.9rem;
		}

		.crew-chart__title {
			font-size: 1.55rem;
		}

		.crew-chart__text {
			line-height: 1.6;
		}

		/* Retícula móvil general */
		.crew-orbit {
			display: grid;
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.85rem 0.45rem;
			height: auto;
			width: 100%;
			margin-top: 1.25rem;
			opacity: 1;
			animation: none;
			justify-items: center;
		}

		/* Oculta los elementos orbitales en móvil */
		.crew-orbit__ring,
		.crew-orbit__ring--outer,
		.crew-orbit__ring--inner,
		.captains-core__hub {
			display: none !important;
		}

		/* Capitanes en triángulo móvil */
		.captains-core {
			position: relative;
			left: auto !important;
			top: auto !important;
			transform: none !important;

			width: 176px;
			height: auto;

			display: grid;
			grid-template-columns: repeat(2, 74px);
			grid-template-rows: repeat(2, 74px);
			column-gap: 28px;
			row-gap: 16px;

			grid-column: 1 / -1;
			justify-self: center;
			align-self: center;

			margin: 0 auto 1rem;
			padding: 0;

			border: 0 !important;
			box-shadow: none !important;
			background: transparent !important;
		}

		/* Triángulo visual entre capitanes, estilo sutil */
		.captains-core::before {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 176px;
			height: 164px;
			background-image: url("data:image/svg+xml,%3Csvg width='176' height='164' viewBox='0 0 176 164' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='88,37 37,127 139,127 88,37' fill='none' stroke='rgba(13,59,68,0.14)' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
			background-repeat: no-repeat;
			background-position: center;
			background-size: 176px 164px;
			pointer-events: none;
			z-index: 0;
		}

		/* Evita restos decorativos adicionales */
		.captains-core::after {
			display: none !important;
			content: none !important;
		}

		/* Capitán superior centrado */
		.captains-core .profile-node--captain:first-of-type {
			grid-column: 1 / -1;
			grid-row: 1;
			justify-self: center;
		}

		/* Capitán inferior izquierdo */
		.captains-core .profile-node--captain:nth-of-type(2) {
			grid-column: 1;
			grid-row: 2;
			justify-self: center;
		}

		/* Capitán inferior derecho */
		.captains-core .profile-node--captain:nth-of-type(3) {
			grid-column: 2;
			grid-row: 2;
			justify-self: center;
		}

		/* Desactiva posicionamiento orbital en móvil */
		.captains-core .profile-node--captain,
		.profile-node--crew {
			position: static;
			transform: none !important;
			display: flex;
			justify-content: center;
			align-items: center;
			z-index: 1;
		}

		/* Sin hover en móvil */
		.captains-core .profile-node--captain:hover,
		.profile-node--crew:hover {
			transform: none !important;
			filter: none;
		}

		/* Tamaño común de avatares en móvil */
		.profile-node--captain .profile-node__avatar,
		.profile-node--crew .profile-node__avatar {
			width: 74px !important;
			height: 74px !important;
			min-width: 74px !important;
			min-height: 74px !important;
			max-width: 74px !important;
			max-height: 74px !important;
			box-shadow: 0 6px 14px rgba(13, 59, 68, 0.14);
		}

		/* Borde de capitán en móvil */
		.profile-node--captain .profile-node__avatar {
			border: 3px solid #b06b2d;
		}

		/* Borde de tripulante en móvil */
		.profile-node--crew .profile-node__avatar {
			border: 3px solid #0d3b44;
		}

		/* Asegura recorte circular en móvil */
		.profile-node__avatar img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center center;
			border-radius: 50%;
			display: block;
		}
	}

	/* Ajustes para pantallas muy estrechas */
	@media screen and (max-width: 420px) {
		.crew-chart {
			padding-left: 0.65rem;
			padding-right: 0.65rem;
		}

		.crew-orbit {
			gap: 0.7rem 0.35rem;
			justify-items: center;
		}

		/* Triángulo compacto de capitanes */
		.captains-core {
			left: auto !important;
			top: auto !important;
			transform: none !important;

			width: 160px;
			height: auto;

			grid-template-columns: repeat(2, 68px);
			grid-template-rows: repeat(2, 68px);
			column-gap: 24px;
			row-gap: 14px;

			margin: 0 auto 1rem;
		}

		/* Triángulo visual ajustado al tamaño compacto */
		.captains-core::before {
			width: 160px;
			height: 152px;
			background-image: url("data:image/svg+xml,%3Csvg width='160' height='152' viewBox='0 0 160 152' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='80,34 34,118 126,118 80,34' fill='none' stroke='rgba(13,59,68,0.14)' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
			background-size: 160px 152px;
		}

		/* Avatares compactos */
		.profile-node--captain .profile-node__avatar,
		.profile-node--crew .profile-node__avatar {
			width: 68px !important;
			height: 68px !important;
			min-width: 68px !important;
			min-height: 68px !important;
			max-width: 68px !important;
			max-height: 68px !important;
		}
	}
</style>
