<?php
/**
 * Accordion Header markup
 *
 * @package tenup\Blocks\AccordionHeader
 *
 * @var array    $attributes         Block attributes.
 * @var string   $content            Block content.
 * @var WP_Block $block              Block instance.
 * @var array    $context            Block context.
 */

?>

<button <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?> data-wp-on:click="actions.accordion.toggle" data-wp-bind:aria-expanded="context.isExpanded">
	<span class="wp-block-tenup-accordion-item__title">
		<?php echo wp_kses_post( $attributes['title'] ); ?>
	</span>
	<div class="wp-block-tenup-accordion-item__icon">
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="24" width="24">
		<path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
	</svg>
	</div>
</button>
