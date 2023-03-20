import { registerBlockType } from '@wordpress/blocks';

import { title } from '@wordpress/icons';
import { BlockEdit } from './edit';
import metadata from './block.json';

import './index.css';

registerBlockType(metadata, {
	icon: title,
	edit: BlockEdit,
	save: () => null,
});
