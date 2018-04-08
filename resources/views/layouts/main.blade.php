<html>
<head>
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>@yield('title')</title>
	{{ Html::style('css/bootstrap.min.css') }}
	{{ Html::style('css/header.css') }}
	{{ Html::style('css/font-awesome.css') }}
	@if (isset($style))
		@foreach($style as $css)
			{{ Html::style($css) }}
		@endforeach
	@endif
</head>
<body>
	<header>
		@include('layouts.header')
	</header>
	<section class="kn_lig">
		<nav aria-label="breadcrumb">
  			<ol class="breadcrumb">
    			<li class="breadcrumb-item active" aria-current="page">{{ $main }}</li>
    			@if (!empty($submain))
    				<li class="breadcrumb-item" aria-current="page"><a href="">{{ $submain }}</a></li>
    			@endif
  			</ol>
		</nav>
		@yield('content')
	</section>
	<footer>
		@include('layouts.footer')
	</footer>
	{{ Html::script('js/jquery-3.2.1.min.js') }}
	{{ Html::script('js/bootstrap.min.js') }}
	{{ Html::script('js/fontawesome-all.js') }}
	@if (isset($script))
		@foreach($script as $js)
			{{ Html::script($js) }}
		@endforeach
	@endif
	{{-- {{ Html::script('js/master.js') }} --}}
</body>
</html>