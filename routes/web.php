<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    $kk = '';
    return view('login', compact('kk'));
});

Route::get('reg', function () {
    $roles = roles();
    return view('reg', compact('roles'));
});

Route::get('nometamask', function () {
    $kk = '';
    return view('nometamask', compact('kk'));
});


Route::get('client/{kk?}', 'PageController@client');
Route::post('client/{kk?}', 'PageController@clientPost');

Route::get('worker/{kk?}', 'PageController@worker');

Route::get('expert/{kk?}', 'PageController@expert');

Route::get('sponsor/{kk?}', 'PageController@sponsor');

/*
Route::group(['middleware' => ['role:client']], function () {
    Route::get('client', 'PageController@client');
});

Route::group(['middleware' => ['role:worker']], function () {
    Route::get('worker', 'PageController@worker');
});

Route::group(['middleware' => ['role:expert']], function () {
    Route::get('expert', 'PageController@expert');
});

Route::group(['middleware' => ['role:sponsor']], function () {
    Route::get('sponsor', 'PageController@sponsor');
});*/
