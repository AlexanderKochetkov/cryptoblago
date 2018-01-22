@extends('index')

@section('content')
    <section class="hero is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    {{--<h3 class="title has-text-grey">Регистрация</h3>--}}
                    <div class="box">

                        {{ Form::open() }}
                            {{--<div class="field">
                                <div class="control">
                                    <input class="input is-large" type="email" placeholder="Email" autofocus="">
                                </div>
                            </div>--}}

                            {{--<div class="field">
                                <div class="control">
                                    <input class="input is-large" type="password" placeholder="Пароль">
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <input class="input is-large" type="password" placeholder="Your Password">
                                </div>
                            </div>--}}

                            <div class="field">
                                <div class="select is-large">
                                    {{ Form::select('role', roles() ) }}
                                </div>
                            </div>
                            <a class="button is-block is-info is-large">Регистрация</a>
                        {{ Form::close() }}
                    </div>
                    {{--<p class="has-text-grey">
                        <a href="/">Sign In</a>
                    </p>--}}
                </div>
            </div>
        </div>
    </section>
@endsection