import { useBlockProps } from '@wordpress/block-editor';

export const BlockEdit = () => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<p>Example block</p>
		</div>
	);
};
