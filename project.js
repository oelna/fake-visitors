'use strict';

const projects = document.querySelectorAll('#projects > li');

const randomInt = function (min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

const saveCounts = function () {
	const counts = {};
	for (const project of projects) {
		let projectTitle = project.dataset.project;
		let count = parseInt(project.querySelector('.count').textContent);

		counts[projectTitle] = count;
	}

	localStorage.setItem('lookingCounts', JSON.stringify(counts));
}

const loadCounts = function () {
	const countsStore = localStorage.getItem('lookingCounts');
	if (!countsStore) return;

	const counts = JSON.parse(countsStore);

	for (const project of projects) {
		let projectTitle = project.dataset.project;
		let count = counts[projectTitle] ? counts[projectTitle] : 0;

		project.querySelector('.count').textContent = count.toString();
	}
}

const newUpdate = function (ele, baseDelay) {
	const newDelay = baseDelay + (randomInt(0, 15)*1000);

	ele.interval = setTimeout(function (self) {

		const newValue = parseInt(self.textContent) + randomInt(-2, 2);
		self.textContent = Math.max(0, newValue);
		saveCounts();

		// schedule new update
		newUpdate(self, baseDelay);
	}, newDelay, ele);
}

loadCounts(); // set initial values

for (const project of projects) {
	let count = project.querySelector('.count');

	// first tick
	newUpdate(count, 20*1000);
}
