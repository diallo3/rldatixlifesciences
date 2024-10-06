<?php

/**
 * The template for displaying Archive pages.
 *
 * Used to display archive-type pages if nothing more specific matches a query.
 * For example, puts together date-based pages if no date.php file exists.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.2
 */

use Timber\Timber;

$context = Timber::context();

$context['title'] = 'Archive';



$templates = [
	'pages/archive/archive.twig',
	'pages/index/index.twig'
];

if (is_day()) {
	$context['title'] = 'Archive: ' . get_the_date('D M Y');
} elseif (is_month()) {
	$context['title'] = 'Archive: ' . get_the_date('M Y');
} elseif (is_year()) {
	$context['title'] = 'Archive: ' . get_the_date('Y');
} elseif (is_tag()) {
	$context['title'] = single_tag_title('', false);
    $context['description'] = term_description();
} elseif (is_category()) {
	$context['title'] = single_cat_title('', false);
	$templateName = 'archive-' . get_query_var('cat');
    $context['description'] = term_description();
	array_unshift($templates, 'pages/' . $templateName . '/' . $templateName . '.twig');
} elseif (is_post_type_archive()) {
    $context['post_title'] = post_type_archive_title('', false);
	$context['title'] = post_type_archive_title('', false);
	$templateName = 'archive-' . get_post_type();
	array_unshift($templates, 'pages/' . $templateName . '/' . $templateName . '.twig');
}


if(is_category()){
    // Get the current category
    $current_category = get_queried_object();

    $query_args = [
        'post_type' => 'post',
        'posts_per_page' => -1, 
        'meta_key' => 'start_date', 
        'orderby' => 'meta_value', 
        'order' => 'ASC',
    ];

    // Check if the current category is 'Events' and if so, only show events that haven't passed yet
    if ($current_category && $current_category->slug == 'events') {
        $query_args['meta_query'] = [
            [
                'key' => 'start_date', 
                'value' => date('Ymd'), 
                'compare' => '>=', 
                'type' => 'DATE',
            ],
        ];
        $context['posts'] = Timber::get_posts($query_args);
    }
    
} else {
    $context['posts'] = Timber::get_posts();
}



Timber::render($templates, $context);
