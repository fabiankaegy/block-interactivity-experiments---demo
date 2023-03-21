import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import { BlockEdit } from './edit';
import metadata from './block.json';
import { Icon } from './icon';

import './index.css';

registerBlockType(metadata, {
	icon: Icon,
	edit: BlockEdit,
	save: () => <InnerBlocks.Content />,
});
