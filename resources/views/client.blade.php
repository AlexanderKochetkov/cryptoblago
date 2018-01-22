@extends('index')

@section('content')
    <div class="container has-text-centered" style="max-width: 1000px;">
        {{ Form::open() }}

        <input name="order_id" id="orderId" type="hidden" value="">
        <input name="k" class="k" type="hidden">
        {{--<div class="field">
        <label class="label">Name</label>
        <div class="control">
            <input class="input" type="text" placeholder="Text input">
        </div>
    </div>


     <div class="field">
        <label class="label">Subject</label>
        <div class="control">
            <div class="select">
                <select>
                    <option>Select dropdown</option>
                    <option>With options</option>
                </select>
            </div>
        </div>
    </div>--}}

        <br>

        <div class="field">
            <label class="label is-large">Заявка на оказание благотворительной услуги</label>
            <div class="control">
                <textarea name="text" class="textarea is-large" placeholder="1. Название проекта
2. Необходимая сумма денег
3. Описание потребности
4. Описание исполнителя" style="min-height: 250px;"></textarea>
            </div>
        </div>

        {{--<div class="field">
            <div class="control">
                <label class="checkbox">
                    <input type="checkbox">
                    I agree to the <a href="#">terms and conditions</a>
                </label>
            </div>
        </div>--}}


        <div class="field is-grouped has-text-centered">
            <div class="control" style="margin: 0 auto;">
                <a class="button is-link is-large" id="clientButton">Подать заявку</a>
            </div>
        </div>
        {{ Form::close() }}
    </div>

    <br><br>

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
                    {{ $order->text }}
                    {{--<time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>--}}
                </div>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item acceptOrderByClient">Подтвердить выполнение</a>
            </footer>
        </div>
    @endforeach

@endsection