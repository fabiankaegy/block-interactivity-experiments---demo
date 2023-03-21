// Disclaimer: Importing the `store` using a global is just a temporary solution.
const { store } = window.__experimentalInteractivity;

store({
	actions: {
		accordion: {
			toggle: ({ context }) => {
				context.isExpanded = !context.isExpanded;
			}
		}
	}
})
