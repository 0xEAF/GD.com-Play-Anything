const level = document.getElementById('level');
const song = document.getElementById('song');
const play = document.getElementById("play");

level.addEventListener('change', (event) => {
	const file = event.target.files[0];
	
	if (file) {
		const reader = new FileReader();

		reader.onload = function(e) {
			const content = e.target.result;
			chrome.storage.local.set({ level: content });
		};

		reader.onerror = function(e) {
			console.error("Error reading file:", e.target.error);
		};

		reader.readAsText(file); 
	}
});

song.addEventListener('change', (event) => {
	const file = event.target.files[0];
	
	if (file) {
		const reader = new FileReader();

		reader.onload = function(e) {
			const content = e.target.result;
			chrome.storage.local.set({ song: content });
		};

		reader.onerror = function(e) {
			console.error("Error reading file:", e.target.error);
		};

		reader.readAsDataURL(file); 
	}
});

play.addEventListener("click", async () => {
	const [tab] = await chrome.tabs.query({
		active: true,
		currentWindow: true
	});

	chrome.tabs.reload(tab.id);
});