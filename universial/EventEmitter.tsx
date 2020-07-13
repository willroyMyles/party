import {EventEmitter} from "events"

export const eventEmitter = new EventEmitter()

export const eventStrings = {
	themeChanged: "theme changed enuh pawdi",
	eventClicked: "event clicked",
	locationConfirmed: "used when confirmed is pressed to relay location to create pot view",
	dataFromProviderFinishedLoad: "used to signal data finished loading",
	loggingIn: "used when logging in or signing up ",
}
