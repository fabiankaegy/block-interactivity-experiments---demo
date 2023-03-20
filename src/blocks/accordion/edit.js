import {
	useBlockProps,
	useInnerBlocksProps,
	withColors,
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	getColorClassName,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { useHasSelectedInnerBlock } from '@10up/block-components';

export const BaseBlockEdit = (props) => {
	const {
		clientId,
		activeTextColor,
		setActiveTextColor,
		activeBackgroundColor,
		setActiveBackgroundColor,
		isSelected,
	} = props;

	const hasSelectedInnerBlock = useHasSelectedInnerBlock();

	const isExpanded = isSelected || hasSelectedInnerBlock;

	const containerClasses = classnames({
		'has-active-text-color':
			!!activeTextColor.color || !!activeTextColor?.class,
		[getColorClassName('color', activeTextColor?.slug)]:
			!!activeTextColor?.slug && isExpanded,
		'has-active-background':
			!!activeBackgroundColor.color || activeBackgroundColor?.class,
		[getColorClassName('background-color', activeBackgroundColor?.slug)]:
			!!activeBackgroundColor?.slug && isExpanded,
	});

	const styles = {
		color: !activeTextColor?.slug && activeTextColor?.color,
		backgroundColor:
			!activeBackgroundColor?.slug &&
			activeBackgroundColor?.color &&
			activeBackgroundColor.color,
	};

	const blockProps = useBlockProps({
		className: containerClasses,
		style: isExpanded ? styles : {},
	});
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [['tenup/accordion-header'], ['tenup/accordion-content']],
		templateLock: 'all',
	});

	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	return (
		<>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					__experimentalIsRenderedInSidebar
					settings={[
						{
							colorValue: activeTextColor.color,
							label: __('Expanded Text'),
							onColorChange: setActiveTextColor,
							resetAllFilter: () => setActiveTextColor(),
						},
						{
							colorValue: activeBackgroundColor.color,
							label: __('Expanded Background'),
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
			<div {...innerBlocksProps} />
		</>
	);
};

export const BlockEdit = withColors({
	activeTextColor: 'color',
	activeBackgroundColor: 'color',
})(BaseBlockEdit);
