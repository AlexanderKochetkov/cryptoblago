<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Worker;
use Illuminate\Http\Request;

class PageController extends Controller
{

    function client($kk = '')
    {
        $orders = Order::whereK($kk)->get();
        return view('client', compact('kk', 'orders'));
    }

    function clientPost()
    {
        $order = new Order();
        $order->text = \Request::input('text');
        $order->k = \Request::input('k');
        $order->order_id = \Request::input('order_id');
        $order->save();
        return redirect()->back();
    }

    function sponsor($kk = '')
    {
        $orders = Order::all(); //whereK($kk)->get();
        return view('sponsor', compact('kk', 'orders'));
    }

    function worker($kk = '')
    {
        $isWorker = Worker::whereK($kk)->first();
        if (!$isWorker) {
            if ($worker = \Request::input('worker')) {
                $worker = new Worker;
                $worker->k = $kk;
                $worker->save();
            };
        };

        $orders = Order::all();
        return view('worker', compact('kk', 'orders', 'isWorker'));
    }

    function expert($kk = '')
    {
        $workers = Worker::all();
        return view('expert', compact('kk', 'workers'));
    }
}
