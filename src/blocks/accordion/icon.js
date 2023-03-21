import { SVG, Path } from '@wordpress/components';

export const Icon = () => {
	return (
		<SVG
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<Path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M4 10L8 8L4 6V10ZM12 17V15.5H4V17H12ZM4 11.5H20V13H4V11.5ZM20 7.25L10 7.25V8.75L20 8.75V7.25Z"
			/>
		</SVG>
	);
};
