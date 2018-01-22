@extends('index')

@section('content')

    <div style="max-width: 1000px; text-align: center; margin: 0 auto;">
        <h2 class="title is-2" style="">Заявки на оказание благотворительной услуги</h2>
    </div>

    @foreach($orders as $order)
        <div class="card" style="max-width: 400px; margin: 20px auto;" data-order-id="{{ $order->order_id }}">
            <header class="card-header">
                <p class="card-header-title">
                    Заявка {{ $order->id }}
                </p>
            </header>
            <div class="card-content">
                <div class="content">
                    {{ $order->text }}
                    {{--<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>--}}
                </div>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item payOrderBySponsor">Оплатить</a>
            </footer>
        </div>
    @endforeach


@endsection