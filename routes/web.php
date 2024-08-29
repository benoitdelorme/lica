<?php

use Illuminate\Support\Facades\Route;

// The Sitemap Index route for listing sitemaps of all (multi)sites.
Route::statamic('/sitemaps.xml', 'sitemap/sitemaps', [
  'layout' => null,
  'content_type' => 'application/xml'
]);

// The Default Site Sitemap route.
Route::statamic('/sitemap.xml', 'sitemap/sitemap', [
  'layout' => null,
  'content_type' => 'application/xml'
]);

// The Multisite Site Sitemap route(s).
Route::statamic('/{site_handle}/sitemap.xml', 'sitemap/sitemap', [
  'layout' => null,
  'content_type' => 'application/xml'
]); 