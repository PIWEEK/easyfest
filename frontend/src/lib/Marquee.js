/**
 * Marquee
 * 
 * @param {HTMLElement} element - The marquee HTML element with only one direct child
 * @param {Number} [speed=undefined] - Speed
 */
export default class Marquee {
	constructor(element, speed = undefined) {
		this.element = element
		this.elementClone = element.cloneNode(true)
		this.content = element.firstElementChild
		this.allContent = [this.content]
		this.elementWidth = this.element.getBoundingClientRect().width;
		this.contentWidth = this.content.getBoundingClientRect().width;
		this.speed = speed;

		this.#validate() && this.#init()
	}

	#validate() {
		if (this.element.children.length > 1) {
			console.error('Marquee element must have only ONE direct children');
			return false
		}

		return true;
	}

	#init() {
		for (let index = 0; index < Math.ceil(this.elementWidth / this.contentWidth); index++) {
			const clone = this.content.cloneNode(true)
			clone.ariaHidden = true
			this.allContent.push(clone)
			this.element.appendChild(clone)
		}
		this.#setUnitSpeed()
		this.#eventListenerResize()
	}

	#setUnitSpeed() {
		const unitSpeed = this.speed ? window.innerWidth / this.speed : undefined
		if (unitSpeed) {
			this.allContent.forEach(item => {
				item.style.animationDuration = `${unitSpeed / (this.elementWidth / this.contentWidth)}s`
			})
		}
	}

	#eventListenerResize() {
		window.addEventListener('resize', () => this.reset())
	}

	reset() {
		this.element.after(this.elementClone)
		this.element.remove()
		return new Marquee(this.elementClone, this.speed)
	}

	setSpeed(speed) {
		this.speed = speed
		this.#setUnitSpeed()
	}

	pause() {
		this.allContent.forEach(item => item.style.animationPlayState = 'paused')
	}

	play() {
		this.allContent.forEach(item => item.style.animationPlayState = 'running')
	}
}