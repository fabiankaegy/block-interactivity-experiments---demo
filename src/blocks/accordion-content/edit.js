import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useHasSelectedInnerBlock } from '@10up/block-components';

export const AccordionContentBlockEdit = (props) => {
	const { isSelected } = props;
	const hasSelectedInnerBlock = useHasSelectedInnerBlock();

	const hasSelection = isSelected || hasSelectedInnerBlock;

	const blockProps = useBlockProps({
		className: 'accordion-content',
		'aria-hidden': !hasSelection,
	});
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: [
			'core/paragraph',
			'core/heading',
			'core/image',
			'core/list',
			'core/list-item',
			'core/buttons',
			'core/button',
			'core/separator',
		],
		template: [['core/paragraph']],
		templateLock: false,
	});

	return <div {...innerBlocksProps} />;
};
