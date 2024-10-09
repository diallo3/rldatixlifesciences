<?php

/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since   Timber 0.1
 */

use Timber\Timber;

$blog_page_id = get_option('page_for_posts');
$category_id = get_cat_ID('articles');

$context          = Timber::context();
$context['posts'] = Timber::get_posts();
$context['foo']   = 'bar';

$context['title'] = get_the_title( get_option('page_for_posts', true));
$context['hero_home'] = get_field('hero', $blog_page_id );
$context['categories'] = get_tags_by_category($category_id);

$templates = ['pages/index/index.twig'];
if (is_home()) {
	// array_unshift($templates, 'pages/front-page/front-page.twig', 'pages/home/home.twig', 'pages/page/page.twig');
}
Timber::render($templates, $context);
