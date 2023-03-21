<?php
/**
 * Accordion Content markup
 *
 * @package tenup\Blocks\AccordionContent
 *
 * @var array    $attributes         Block attributes.
 * @var string   $content            Block content.
 * @var WP_Block $block              Block instance.
 * @var array    $context            Block context.
 */

?>

<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> data-wp-bind.aria-hidden="!context.isExpanded" >
	<?php
	/*
	* the block_content is the html generated from innerBlocks
	* it is being created from the save method in JS or the render_callback
	* in php and is sanitized.
	*
	* Re sanitizing it through `wp_kses_post` causes
	* embed blocks to break and other core filters don't apply.
	* therefore no additional sanitization is done and it is being output as is
	*
	* @see https://github.com/10up/gutenberg-best-practices/discussions/6
	*/
	echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	?>
</div>
