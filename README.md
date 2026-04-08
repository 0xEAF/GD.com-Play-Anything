# GD.com Play Anything

This extension allows you to play ANY 1.0* level in Geometry Dash.

*not all 1.0 levels, it misses jump pads, orbs and lots of other stuff from 1.0 itself

## NOTE: I'm the first one to do it (I did it at 8PM on April 4th, literally a few hours after the website's release). [Heres proof](https://x.com/00xeaf/status/2040504535295152206)

## [Demo / Proof of concept](https://x.com/00xeaf/status/2040504535295152206)

## Installation

### On Firefox

The extension will be published on the Mozilla Add-Ons store. Just wait.

### On Chrome, Brave, and others

It is unfortunately not possible for me to publish it to the Google Chrome Webstore, because I don't want to pay the $5 fee AND still have to show Google my government ID to publish a f*cking extension, WHYY??

There are two ways to work around this, here's the first:

1. Open [`chrome://extensions`](chrome://extensions)
2. Enable "Developer mode"
3. Download the [latest CRX files from the releases](https://github.com/0xEAF/GD.com-Play-Anything/releases)
4. Drag and drop the CRX file into the Chrome extension manager window
5. Click "Add extension"
6. Click on "dangerous extension detected" pop-up warning
7. Click the triple dots and select "keep this extension"
8. Disable developer mode

However, **this may not work on some systems** (personally, Brave on Linux worked fine but not Brave on Windows) so instead here's method 2:

1. Open [`chrome://extensions`](chrome://extensions)
2. Enable "Developer mode"
3. Download the [repo as a ZIP file](https://github.com/0xEAF/NG-Music-Artwork/archive/refs/heads/main.zip)
4. Extract the ZIP file anywhere
6. Click "Load unpacked extension"
7. Select the extracted folder and click OK
8. **Do NOT disable developer mode, ever** (which, I think, shouldn't even be a problem in most cases if you aren't stupid)

> ### NOTE
> You will have to do one of these methods at each update, and there is no way to automatically check for one or update the extension automatically.

### For Opera and Edge

Currently it is impossible for me to publish the extension to the Opera Add-Ons or Edge Add-Ons store because their account set-up is just impossible to finish for some reason (it just never finishes loading), so you'll have to follow the Chrome instructions.

## How to use

  1. Run `downloadScript.py`
  2. Put any level ID
  3. It'll download the level inside a `.txt` file and the song in a `.mp3` file (NOTE: If the song is a main level song, it won't, so you'll have to extract the MP3 audio yourself from the game's files)
  4. Give those to the extension by opening its popup (by clicking on its icon)
  5. Click "Inject"
  6. Have fun

## How does it work

Instead of doing like [most people apparently were going to do](https://x.com/TheRealGDColon/status/2040254875800367107) I smartly decided to make a Chrome extension that simply edits the content of the requests containing the level and song data, that's literally it.

## Bugs

May be a lot of it, personally I had one at some point where the audio would not change but idk it's just a proof of concept, not anything serious
