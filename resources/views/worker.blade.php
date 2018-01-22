@extends('index')

@section('content')

    <div class="worker-block worker-block-no">
        <div style="max-width: 1000px; text-align: center; margin: 0 auto;">
            <h2 class="title is-2" style="">Вы не верифицированы как исполнитель</h2>
        </div>

        <br><br>

        @if(!$isWorker)
            <div style="width: 100%; text-align: center">
                <a href="?worker=1" class="button is-link is-large">Подать заявку, чтобы стать исполнителем</a>
            </div>
        @endif

    </div>
    <br><br>

    <div class="worker-block worker-block-list">

        <div style="max-width: 1000px; text-align: center; margin: 0 auto;">
            <h2 class="title is-2" style="">Заявки</h2>
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
                        Текст заявки
                        {{--<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>--}}
                    </div>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item acceptOrderByWorker">Подтвердить выполнение</a>
                    <a href="#" class="card-footer-item workerClaimReward">Запросить вознаграждение</a>
                </footer>
            </div>
        @endforeach

    </div>

@endsection