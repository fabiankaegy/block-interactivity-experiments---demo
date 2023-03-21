/* eslint-disable @wordpress/no-unsafe-wp-apis */
import {
	useBlockProps,
	RichText,
	withColors,
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	BlockControls,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { DropdownMenu, MenuGroup, MenuItem } from '@wordpress/components';
import { useHasSelectedInnerBlock } from '@10up/block-components';
import classnames from 'classnames';
import { ChevronDown, IconLeft, IconRight } from './icons';

export const AccordionHeaderBlockEdit = (props) => {
	const {
		attributes,
		setAttributes,
		isSelected,
		clientId,
		activeBackgroundColor,
		setActiveBackgroundColor,
		activeTextColor,
		setActiveTextColor,
		__unstableLayoutClassNames: layoutClassNames,
	} = props;
	const { title, iconPosition } = attributes;

	const hasSelectedInnerBlock = useHasSelectedInnerBlock();

	const hasSelection = isSelected || hasSelectedInnerBlock;

	const blockProps = useBlockProps({
		className: classnames('accordion-header', layoutClassNames, {
			[`icon-position-${iconPosition}`]: iconPosition,
		}),
		'aria-expanded': hasSelection,
	});

	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	return (
		<>
			<BlockControls group="block">
				<DropdownMenu
					icon={iconPosition === 'left' ? IconLeft : IconRight}
					label={__('Icon Position', 'tenup')}
				>
					{({ onClose }) => (
						<MenuGroup>
							<MenuItem
								iconPosition="left"
								icon={<IconLeft />}
								role="menuitemradio"
								isSelected={iconPosition === 'left'}
								onClick={() => {
									setAttributes({ iconPosition: 'left' });
									onClose();
								}}
							>
								{__('Left', 'tenup')}
							</MenuItem>
							<MenuItem
								iconPosition="left"
								icon={<IconRight />}
								role="menuitemradio"
								isSelected={iconPosition === 'right'}
								onClick={() => {
									setAttributes({ iconPosition: 'right' });
									onClose();
								}}
							>
								{__('Right', 'tenup')}
							</MenuItem>
						</MenuGroup>
					)}
				</DropdownMenu>
			</BlockControls>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					__experimentalIsRenderedInSidebar
					settings={[
						{
							colorValue: activeTextColor.color,
							label: __('Expanded Text', 'tenup'),
							onColorChange: setActiveTextColor,
							resetAllFilter: () => setActiveTextColor(),
						},
						{
							colorValue: activeBackgroundColor.color,
							label: __('Expanded Background', 'tenup'),
							onColorChange: setActiveBackgroundColor,
							resetAllFilter: () => setActiveBackgroundColor(),
						},
					]}
					panelId={clientId}
					{...colorGradientSettings}
					gradients={[]}
					disableCustomGradients
				/>
			</InspectorControls>
			<button type="button" {...blockProps}>
				<RichText
					tagName="span"
					value={title}
					onChange={(value) => setAttributes({ title: value })}
					placeholder={__('Accordion Title', 'tenup')}
					withoutInteractiveFormatting
					className="wp-block-tenup-accordion-item__title"
				/>
				<div className="wp-block-tenup-accordion-item__icon">
					<ChevronDown />
				</div>
			</button>
		</>
	);
};

export const BlockEdit = withColors({
	activeTextColor: 'color',
	activeBackgroundColor: 'color',
})(AccordionHeaderBlockEdit);
