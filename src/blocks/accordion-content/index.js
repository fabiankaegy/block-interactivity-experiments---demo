import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { postContent } from '@wordpress/icons';

import { AccordionContentBlockEdit } from './edit';
import metadata from './block.json';

registerBlockType( metadata, {
	icon: postContent,
	edit: AccordionContentBlockEdit,
	save: () => <InnerBlocks.Content />,
} );
