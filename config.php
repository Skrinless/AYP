<?php
/*
 * AYP CMS — shared server config.
 * KEEP THIS FILE PRIVATE. The token below authorizes uploads and publishing.
 * The same value must match SERVER_TOKEN inside admin.html.
 *
 * To change the secret: pick a new random string, then update it BOTH here
 * and in admin.html (var SERVER_TOKEN = "...").
 */

define('AYP_TOKEN', 'ayp_9mQ2xVc7hR4tK1nZ');

// Where uploaded images are stored (must be web-accessible as /img/...).
define('AYP_IMG_DIR', __DIR__ . '/img');

// The content file the CMS publishes to.
define('AYP_CONTENT_FILE', __DIR__ . '/content.js');

// Limits
define('AYP_MAX_IMAGE_BYTES', 6 * 1024 * 1024);      // 6 MB per image
define('AYP_MAX_CONTENT_BYTES', 3 * 1024 * 1024);    // 3 MB content.js
