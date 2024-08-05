<?php

/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * To generate specific templates for your pages you can use:
 * /mytheme/templates/page-mypage.twig
 * (which will still route through this PHP file)
 * OR
 * /mytheme/page-mypage.php
 * (in which case you'll want to duplicate this file and save to the above path)
 *
 * Methods for TimberHelper can be found in the /lib sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */

use Timber\Timber;

$page_content = get_field('page_content');



$context = Timber::context();

if (have_rows('page_content')) {
    while (have_rows('page_content')) {
        the_row();

        if (get_row_layout() == 'featured_posts') {
            $featured_posts = get_sub_field('featured_posts')[0];
            
            $type = $featured_posts['type_of_posts'];

            if ($type == 'recommended') {
                $recommended = $featured_posts['recommended'];
                $context['featured_posts'] = Timber::get_posts($recommended);

            } elseif ($type == 'popular') {
                $context['featured_posts'] = Timber::get_posts([
                    'post_type' => 'post',
                    'posts_per_page' => 3,
                    'orderby' => 'comment_count'
                ]);
            } elseif ($type == 'category') {
                $category = $featured_posts['post_category'];

                $category_args = [
                    'post_type' => 'post',
                    'posts_per_page' => 3,
                    'category__in' => array($category)
                ];
                $context['featured_posts'] = Timber::get_posts($category_args);
                wp_reset_postdata();
            } else {
                $context['featured_posts'] = Timber::get_posts([
                    'post_type' => 'post',
                    'posts_per_page' => 3
                ]);
            }
        }
    }
    
}

$timber_post     = Timber::get_post();
$context['post'] = $timber_post;
$templates = [
	'pages/page-' . $timber_post->post_name . '/page-' . $timber_post->post_name . '.twig',
	'pages/page/page.twig'
];
Timber::render($templates, $context);
