<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactFormController;
use Illuminate\Http\Request;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

$routeData = json_decode(file_get_contents(base_path("/routes/routes.json")));

$standard_props = [
    "routes" => $routeData,
];

$register_auto_routes = function($routes, $std_props, $route_prefix = '') use (&$register_auto_routes) {
    foreach($routes as $page => $route) {
        if($route_prefix) $route->path = $route_prefix.'/'.$route->path;

        if(isset($route->override)) continue;

        Route::get($route->path, function (Request $request) use ($route, $std_props) {
            if($request->cookie('passwordResetToken')) $std_props += ['passwordResetToken' => $request->cookie('passwordResetToken')];
            return view('app', $std_props + [
                "title" => $route->title,
                "description" => $route->description,
            ]);
        })
        ->name($page)
        ->middleware(isset($route->protected) ? 'auth' : null);

        if(isset($route->children)) $register_auto_routes($route->children, $std_props, $route->path);
    }
};

$register_auto_routes($routeData, $standard_props);

Route::post('/contact-us', [ContactFormController::class, 'processForm'])->name('contact-form');

Route::get('/repoList', function() {
	$ch = curl_init("https://api.github.com/users/lcnervick/repos");
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_USERAGENT,'Leif Nervick Website');
	curl_setopt($ch, CURLOPT_HEADER, [
		'X-GitHub-Api-Version: 2022-11-28',
		'Authorization: Bearer '.env('GITHUB_TOKEN ')
    ]);
	$output = curl_exec($ch);
	$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
	curl_close($ch);
	if($http_status === 200) {
		$data = explode("\n", rtrim($output));
		return response()->json(['repoList' => json_decode(array_pop($data))]);
	}
    return response()->json(['error' => 'Error getting repository list.']);

});

Route::fallback(function () use($standard_props) {
    // return response()->json([
    //     'fallback_route' => true,
    //     'request' => $_SERVER
    // ]);
    return view('app', $standard_props + [
        "title" => "Not Found",
        "description"=> ""
    ]);
});
