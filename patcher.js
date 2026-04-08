(function() {
	let levelData = null;
	let songBuffer = null; // ArrayBuffer for audio
	const pendingLevel = [];
	const pendingSong = [];

	const origOpen = XMLHttpRequest.prototype.open;
	const origSend = XMLHttpRequest.prototype.send;

	XMLHttpRequest.prototype.open = function(method, url, ...rest) {
		this._gdUrl = url;
		return origOpen.apply(this, [method, url, ...rest]);
	};

	XMLHttpRequest.prototype.send = function(...args) {
		if (this._gdUrl && this._gdUrl.includes("1.txt")) {
			if (levelData !== null) {
				fakeTextResponse(this, levelData);
			} else {
				pendingLevel.push(this);
			}
			return;
		}

		if (this._gdUrl && this._gdUrl.includes("StereoMadness.mp3")) {
			if (songBuffer !== null) {
				fakeBinaryResponse(this, songBuffer);
			} else {
				pendingSong.push(this);
			}
			return;
		}

		return origSend.apply(this, args);
	};

	function fakeTextResponse(xhr, data) {
		setTimeout(() => {
			Object.defineProperty(xhr, "readyState",   { get: () => 4,    configurable: true });
			Object.defineProperty(xhr, "status",       { get: () => 200,  configurable: true });
			Object.defineProperty(xhr, "responseText", { get: () => data, configurable: true });
			Object.defineProperty(xhr, "response",     { get: () => data, configurable: true });
			xhr.dispatchEvent(new Event("readystatechange"));
			xhr.dispatchEvent(new Event("load"));
			xhr.dispatchEvent(new Event("loadend"));
		}, 0);
	}

	function fakeBinaryResponse(xhr, buffer) {
		setTimeout(() => {
			Object.defineProperty(xhr, "readyState", { get: () => 4,      configurable: true });
			Object.defineProperty(xhr, "status",     { get: () => 200,    configurable: true });
			Object.defineProperty(xhr, "response",   { get: () => buffer, configurable: true });
			xhr.dispatchEvent(new Event("readystatechange"));
			xhr.dispatchEvent(new Event("load"));
			xhr.dispatchEvent(new Event("loadend"));
		}, 0);
	}

	window.addEventListener("__gdext_level__", (e) => {
		levelData = e.detail;
		for (const xhr of pendingLevel) fakeTextResponse(xhr, levelData);
		pendingLevel.length = 0;
	});

	window.addEventListener("__gdext_song__", (e) => {
		// e.detail is a base64 data URL — decode to ArrayBuffer
		const [meta, base64] = e.detail.split(",");
		const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
		songBuffer = bytes.buffer;
		for (const xhr of pendingSong) fakeBinaryResponse(xhr, songBuffer);
		pendingSong.length = 0;
	});
})();