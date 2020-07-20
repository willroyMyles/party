import {EventEmitter} from "events"

export const eventEmitter = new EventEmitter()

export const eventStrings = {
	themeChanged: "theme changed enuh pawdi",
	eventClicked: "event clicked",
	locationConfirmed: "used when confirmed is pressed to relay location to create pot view",
	dataFromProviderFinishedLoad: "used to signal data finished loading",
	loggingIn: "used when logging in or signing up ",
	imageGotten: "used to signal to past image view that a new images has been recieved",
	showToast: {
		working: "used when sneding data to back end",
		success: "used when an operation is successful",
		error: "used when some thing went wrong",
	},
}
