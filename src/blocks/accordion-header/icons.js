import { SVG, Path } from '@wordpress/components';

export const ChevronDown = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512 512"
		height={24}
		width={24}
	>
		<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
	</svg>
);

export const IconLeft = () => (
	<SVG x="0" y="0" width="24" height="24" viewBox="0 0 23 11">
		<Path d="M9.9 3.9L5.6 8.2 1.2 3.9 2.4 2.8 5.6 5.9 8.7 2.8z" />
		<Path d="M11.8 4.5H21.8V6.5H11.8z" />
	</SVG>
);

export const IconRight = () => (
	<SVG x="0" y="0" width="24" height="24" viewBox="0 0 23 11">
		<Path d="M21.8 3.9L17.5 8.2 13.1 3.9 14.3 2.8 17.5 5.9 20.6 2.8z" />
		<Path d="M1.2 4.5H11.2V6.5H1.2z" />
	</SVG>
);
