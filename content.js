chrome.storage.local.get(["level", "song"], (data) => {
	if (data.level) {
		window.dispatchEvent(new CustomEvent("__gdext_level__", { detail: data.level }));
	}
	if (data.song) {
		window.dispatchEvent(new CustomEvent("__gdext_song__", { detail: data.song }));
	}
});