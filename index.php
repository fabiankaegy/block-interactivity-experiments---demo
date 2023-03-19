<?php

/**
 * Plugin Name:       Interactivity API Demo
 * Version:           0.0.1
 * Requires at least: 6.0
 * Requires PHP:      5.6
 * Description:       Plugin that demoes the usage of the Interactivity API.
 * Author:            Fabian Kägy
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       interactivity-api-demo
 */


// Check if Gutenberg plugin is active.
if ( ! function_exists( 'is_plugin_active' ) ) {
	include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
}
if ( ! is_plugin_active( 'block-interactivity-experiments/wp-directives.php' ) ) {
	// Show an error message.
	add_action(
		'admin_notices',
		function () {
			echo sprintf( '<div class="error"><p>%s</p></div>', __( 'This plugin requires the WP Directives plugin to be installed and activated.', 'wp-movies-demo' ) );
		}
	);

	// Deactivate the plugin.
	deactivate_plugins( plugin_basename( __FILE__ ) );
	return;
}

add_action( 'init', 'auto_register_block_types' );

// We need these filters to ensure the view.js files can access the window.__experimentalInteractivity
// Once the bundling is solved and we stop using
// window.__experimentalInteractivity we can remove them.
// enqueue_interactive_blocks_scripts( 'movie-like-icon' );

/**
 * A helper function that enqueues scripts for the interactive blocks.
 *
 * @param string $block - The block name.
 * @return void
 */
function enqueue_interactive_blocks_scripts( $block ) {
	$interactive_block_filter = function ( $content ) use ( $block ) {
		wp_register_script(
			'wpmovies/' . $block,
			plugin_dir_url( __FILE__ ) . 'build/blocks/interactive/' . $block . '/view.js',
			array( 'wp-directive-runtime' ),
			'1.0.0',
			true
		);
		wp_enqueue_script( 'wpmovies/' . $block );
		return $content;
	};
	add_filter( 'render_block_wpmovies/' . $block, $interactive_block_filter );
}

// Avoid sending any JavaScript not related to the Interactivity API.
function dequeue_twemoji() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 ); // Emojis
}
add_action( 'wp_enqueue_scripts', 'dequeue_twemoji' );

/**
 * Add a unique key attribute to all images.
 *
 * TODO: Replace with `data-wp-key` once this is fixed:
 * https://github.com/WordPress/block-interactivity-experiments/issues/180
 *
 * @param $content The block content.
 * @return $content The block content with the added key attributes.
 */

function wpmovies_add_key_to_featured_image( $content ) {
	$p = new WP_HTML_Tag_Processor( $content );
	while ( $p->next_tag( array( 'tag_name' => 'img' ) ) ) {
		$src = $p->get_attribute( 'src' );
		if ( preg_match( '/\/([\w-]+)\.jpg$/', $src, $matches ) ) {
			$p->set_attribute( 'key', $matches[1] );
		}
	};
	return (string) $p;
}

add_filter( 'render_block', 'wpmovies_add_key_to_featured_image', 10, 1 );


function auto_register_block_types() {
	// Register all the blocks in the theme
	if ( file_exists( __DIR__ . '/build/blocks/' ) ) {
		$block_json_files = glob( __DIR__ . '/build/blocks/*/block.json' );

		// auto register all blocks that were found.
		foreach ( $block_json_files as $filename ) {
			$block_folder = dirname( $filename );
			register_block_type( $block_folder );
		};
	};
}

function add_script_dependency( $handle, $dep ) {
	global $wp_scripts;

	$script = $wp_scripts->query( $handle, 'registered' );
	if ( ! $script )
		return false;

	if ( ! in_array( $dep, $script->deps, true ) ) {
		$script->deps[] = $dep;

		// move script to the footer if it's not already there
		$wp_scripts->add_data( $handle, 'group', 1 );
	}

	return true;
}

add_action( 'wp_enqueue_scripts', 'auto_inject_interactivity_dependency' );

function auto_inject_interactivity_dependency() {
	$registered_blocks = \WP_Block_Type_Registry::get_instance()->get_all_registered();

	foreach ( $registered_blocks as $name => $block ) {
		$has_interactivity_support = $block->supports['interactivity'] ?? false;

		if ( ! $has_interactivity_support ) {
			continue;
		}
		foreach ( $block->view_script_handles as $handle ) {
			add_script_dependency( $handle, 'wp-directive-runtime' );
		}
	}
}
