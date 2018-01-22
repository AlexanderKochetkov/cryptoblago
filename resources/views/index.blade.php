<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <meta name="ExpertListAddress" content="{!! config('smart.ExpertList.address') !!}">
    <meta name="ExpertVoteAddress" content="{!! config('smart.ExpertVote.address') !!}">
    <meta name="OrdersAddress" content="{!! config('smart.Orders.address') !!}">

    <meta name="ExpertListABI" content='{!! config('smart.ExpertList.ABI') !!}'>
    <meta name="ExpertVoteABI" content='{!! config('smart.ExpertVote.ABI') !!}'>
    <meta name="OrdersABI" content='{!! config('smart.Orders.ABI') !!}'>

    <title>Cryptoblogo</title>

    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
</head>
<body>

<div class="tabs is-large is-centered">
    <ul>
        <li class="{{ Request::segment(1) == 'client' ? 'is-active' : '' }}">
            <a href="{{ url('client') }}">Клиент</a></li>
        <li class="{{ Request::segment(1) == 'sponsor' ? 'is-active' : '' }}">
            <a href="{{ url('sponsor') }}">Спонсор</a>
        </li>
        <li class="{{ Request::segment(1) == 'worker' ? 'is-active' : '' }}">
            <a href="{{ url('worker') }}">Исполнитель</a>
        </li>
        <li class="{{ Request::segment(1) == 'expert' ? 'is-active' : '' }}">
            <a href="{{ url('expert') }}">Эксперт</a>
        </li>
    </ul>
</div>

@yield('content')

<button id="testWeb">TEST WEB3</button>

<script src="{{ mix('/js/app.js') }}"></script>
</body>
</html>
