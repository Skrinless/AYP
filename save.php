<?php
/*
 * AYP CMS — publish endpoint.
 * Receives the full content.js text from admin.html and writes it to disk,
 * keeping a .bak of the previous version. Returns JSON { ok:true }.
 */
require __DIR__ . '/config.php';
header('Content-Type: application/json');

function fail($msg, $code = 400) {
	http_response_code($code);
	echo json_encode(array('ok' => false, 'error' => $msg));
	exit;
}

// --- auth ---
$token = isset($_POST['token']) ? (string) $_POST['token'] : '';
if (!hash_equals(AYP_TOKEN, $token)) {
	fail('unauthorized', 401);
}

// --- validate content ---
$content = isset($_POST['content']) ? (string) $_POST['content'] : '';
$len = strlen($content);
if ($len < 40) {
	fail('content too short');
}
if ($len > AYP_MAX_CONTENT_BYTES) {
	fail('content too large');
}
if (strpos($content, 'window.DEFAULT_CONTENT') === false) {
	fail('invalid content format');
}

// --- backup previous version, then write ---
if (file_exists(AYP_CONTENT_FILE)) {
	@copy(AYP_CONTENT_FILE, AYP_CONTENT_FILE . '.bak');
}
if (file_put_contents(AYP_CONTENT_FILE, $content, LOCK_EX) === false) {
	fail('could not write content.js', 500);
}

echo json_encode(array('ok' => true));
