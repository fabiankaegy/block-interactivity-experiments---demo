// Disclaimer: Importing the `store` using a global is just a temporary solution.
const { store } = window.__experimentalInteractivity;

store({
	actions: {
		toggle: ({ context }) => {
			context.show = !context.show;
		}
	},
	effects: {
		logShow: ({ context }) => {
			console.log(context.show);
		}
	},
})
