<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Leif Nervick | Web Develoer Portfolio</title>
        <meta name="description" content="">
        
        <link rel="icon" href="{{ asset('favicon.png') }}">
        <link rel="apple-touch-icon" href="{{ asset('favicon.png') }}">
        
        <link rel="canonical" href="https://leifnervick.com/">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&family=Source+Code+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

        <script src="https://kit.fontawesome.com/9de295ac74.js" crossorigin="anonymous"></script>
        
        <script type="text/javascript">
            // Global ROUTE DATA
            const routeData = <?php echo json_encode($routes); ?>;
        </script>

        @viteReactRefresh
        @vite(['resources/app.jsx']);

        <!-- Styles -->

        <noscript>This site requires JavaScript to be enabled. Please enable JavaScript and try again</noscript>

    </head>
    <body>
        <div id="app" ></div>
    </body>
</html>
