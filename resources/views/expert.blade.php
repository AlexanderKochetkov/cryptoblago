@extends('index')

@section('content')

    <div class="export-block export-block-no">
        <div style="max-width: 1000px; text-align: center; margin: 0 auto;">
            <h2 class="title is-2" style="">Вы не верифицированы как эксперт</h2>
        </div>
    </div>


    <div class="export-block export-block-list">
        <div style="max-width: 1000px; text-align: center; margin: 0 auto;">
            <h2 class="title is-2" style="">Заявки</h2>
        </div>

        @foreach($workers as $worker)
            <div class="card" style="max-width: 400px; margin: 20px auto;" data-worker-k="{{ $worker->k }}">
                <header class="card-header">
                    <p class="card-header-title">
                        Заявка {{ $worker->id }}
                    </p>
                </header>
                <div class="card-content">
                    <div class="content">
                        {{ $worker->k }}
                        {{--<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>--}}
                    </div>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item approveWorker">Подтвердить исполнителя</a>
                </footer>
            </div>
        @endforeach

    </div>


@endsection