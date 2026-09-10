<?php
/*
 * AYP CMS — image upload endpoint.
 * Receives one image from admin.html, validates it, saves it into /img/
 * with a safe unique filename, and returns JSON { ok:true, path:"img/..." }.
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

// --- basic presence / error checks ---
if (!isset($_FILES['image']) || !is_array($_FILES['image'])) {
	fail('no file received');
}
$file = $_FILES['image'];
if ($file['error'] !== UPLOAD_ERR_OK) {
	fail('upload error code ' . $file['error']);
}
if ($file['size'] <= 0 || $file['size'] > AYP_MAX_IMAGE_BYTES) {
	fail('file too large (max 6MB)');
}

// --- verify it is really an image (not just by extension) ---
$info = @getimagesize($file['tmp_name']);
if ($info === false) {
	fail('not a valid image');
}
$allowed = array(
	IMAGETYPE_JPEG => 'jpg',
	IMAGETYPE_PNG  => 'png',
	IMAGETYPE_GIF  => 'gif',
	IMAGETYPE_WEBP => 'webp',
);
if (!isset($allowed[$info[2]])) {
	fail('unsupported image type (use JPG, PNG, GIF or WEBP)');
}
$ext = $allowed[$info[2]];

// --- build a safe, unique filename from the original name ---
$base = pathinfo($file['name'], PATHINFO_FILENAME);
$base = strtolower($base);
$base = preg_replace('/[^a-z0-9]+/', '-', $base);
$base = trim($base, '-');
if ($base === '') {
	$base = 'image';
}
$base = substr($base, 0, 40);
$name = $base . '-' . bin2hex(random_bytes(4)) . '.' . $ext;

// --- ensure destination dir exists and save ---
if (!is_dir(AYP_IMG_DIR)) {
	@mkdir(AYP_IMG_DIR, 0755, true);
}
$dest = AYP_IMG_DIR . '/' . $name;
if (!move_uploaded_file($file['tmp_name'], $dest)) {
	fail('could not save file on server', 500);
}
@chmod($dest, 0644);

echo json_encode(array('ok' => true, 'path' => 'img/' . $name));
