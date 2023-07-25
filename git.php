<?php
	define('ENV', parse_ini_file('.env',true));
	$ch = curl_init("https://api.github.com/users/lcnervick/repos");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_USERAGENT,'Leif Nervick Website');
	curl_setopt($ch, CURLOPT_HEADER, [
		'X-GitHub-Api-Version: 2022-11-28',
		'Authorization: Bearer '.ENV['GitHub']['token']
	]);
	$output = curl_exec($ch);
	$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
	if($http_status === 200) {
		$data = explode("\n", rtrim($output));
		exit(json_encode(['data' => json_decode(array_pop($data))]));
	}
?>