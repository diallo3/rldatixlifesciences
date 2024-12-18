<?php

/**
 * Retrieves the SVG code from a given file location.
 *
 * @param string|null $file_location The path to the SVG file. Default is null.
 *
 * @return string|false The SVG code as a string if the file exists, false otherwise.
 */
function svg_code($file_location = null) {
	if (WP_DEBUG) {
		$opts = array(
			'ssl' => array(
				'verify_peer' => false,
				'verify_peer_name' => false,
			)
		);
		$context = stream_context_create($opts);
		libxml_set_streams_context($context);
	}
	$return = false;
	if ($file_location) {
		$iconfile = new DOMDocument();
		$iconfile->load($file_location);
		$html = $iconfile->saveHTML($iconfile->getElementsByTagName('svg')[0]);
		$return = $html;
	}
	return $return;
}

/**
 * Retrieves the site logo as either SVG code or an image, depending on the file type.
 *
 * @return string The site logo represented as SVG code or an HTML image tag.
 */
function site_logo() {
	$logo = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM8 13H16C16 15.2091 14.2091 17 12 17C9.79086 17 8 15.2091 8 13ZM8 11C7.17157 11 6.5 10.3284 6.5 9.5C6.5 8.67157 7.17157 8 8 8C8.82843 8 9.5 8.67157 9.5 9.5C9.5 10.3284 8.82843 11 8 11ZM16 11C15.1716 11 14.5 10.3284 14.5 9.5C14.5 8.67157 15.1716 8 16 8C16.8284 8 17.5 8.67157 17.5 9.5C17.5 10.3284 16.8284 11 16 11Z"></path></svg>';
	if (get_theme_mod('custom_logo')) {
		// get the url of the selected logo image
		$logo_url = wp_get_attachment_url(get_theme_mod('custom_logo'));

		// make it a local path so we don't have to make an http requests
		$logo_url = ltrim(parse_url($logo_url, PHP_URL_PATH), '/');

		if (str_contains($logo_url, '.svg')) {
			$logo = svg_code($logo_url);
		} else {
			$logo = '<img src="' . $logo_url . '" alt="site logo" />';
		}
	}
	return $logo;
}

/**
 * Add a custom field to the general settings page
 */
// add_filter('register_post_type_args', 'my_post_type_args', 10, 2);
function my_post_type_args($args, $post_type){

    $post_types = array('post', 'case-study', 'document');
    
    // target "my-post-type"
    if($post_type && in_array($post_type, $post_types)) {
    
        // admin
        $args['acfe_admin_archive'] = true;
    
    }
    
    // return
    return $args;
    
}



function include_categories_by_name($query) {
    // Check if this is the main query on the front-end and it's an archive or the main posts page
    if ($query->is_main_query() && !is_admin() && (is_home() )) {
        
        // List of category names to include
        $included_category_names = array('articles'); // Replace with your category slugs
        
        // Convert category names to IDs
        $included_categories = array();
        foreach ($included_category_names as $category_name) {
            $category = get_term_by('slug', $category_name, 'category');
            if ($category) {
                $included_categories[] = $category->term_id;
            }
        }

        // Modify the query to include only these categories
        if (!empty($included_categories)) {
            $query->set('category__in', $included_categories);
        }
    }
}

add_action('pre_get_posts', 'include_categories_by_name');

function get_tags_by_category($category_id) {
    // Get all posts in the category
    $args = array(
        'category' => $category_id,
        'posts_per_page' => -1, // Get all posts
    );

    $posts = get_posts($args);
    $post_ids = wp_list_pluck($posts, 'ID'); // Extract post IDs

    // Get all tags associated with the posts
    $tags = wp_get_object_terms($post_ids, 'post_tag', array('fields' => 'all'));

    return $tags;
}



// AJAX handler for search results
function ajax_search() {
    // Load Timber for Twig templating
    $context = Timber::context();
    
    // Get the search query from the request
    $search_query = sanitize_text_field( $_GET['s'] );

    $included_category_names = array('articles'); // Replace with your category slugs
    $included_categories = array();
    foreach ($included_category_names as $category_name) {
        $category = get_term_by('slug', $category_name, 'category');
        if ($category) {
            $included_categories[] = $category->term_id;
        }
    }
    
    // Setup a custom WP_Query
    $args = array(
        's' => $search_query,
        'post_type' => 'post',
        'post_status' => 'publish',
        'category__in' => $included_categories,
        'posts_per_page' => -1,
    );
    
    $context['posts'] = Timber::get_posts( $args );
    
    // Render the search results Twig template
    Timber::render( '/templates/components/containers/archive/partials/_partials-search-results.twig', $context );
    
    // End AJAX request
    wp_die();
}

// Register AJAX action for logged-in and guest users
add_action( 'wp_ajax_nopriv_ajax_search', 'ajax_search' );
add_action( 'wp_ajax_ajax_search', 'ajax_search' );


// if has embed or iframe
add_filter('timber/context', function ($context) {
    // Ensure the post object exists
    $post = $context['post'] ?? Timber::get_post();

    // If the post exists, analyze its content
    if ($post) {
        $content = $post->post_content; // Get raw post content
        $context['has_embed_or_iframe'] = check_for_embed_or_iframe($content);
    } else {
        $context['has_embed_or_iframe'] = false; // Default to false if no post
    }

    return $context;
});

// Function to check for embeds and iframes
function check_for_embed_or_iframe($content) {
    // Apply WordPress filters to process shortcodes and embeds
    $processed_content = apply_filters('the_content', $content);

    // Check for iframe tags
    if (preg_match('/<iframe\b[^>]*>(.*?)<\/iframe>/', $processed_content)) {
        return true;
    }

    // Check for WordPress embed shortcode
    if (preg_match('/\[embed\b[^]]*\](.*?)\[\/embed\]/', $processed_content)) {
        return true;
    }

    // No iframe or embed detected
    return false;
}