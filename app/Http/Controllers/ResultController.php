<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DateTime;

class ResultController extends Controller
{
    public function index()
    {   
        $email = env('EMAI_ADDRESS');

        $css = array(
            'css/result.css',
            'css/bootstrap-datetimepicker.min.css'
        );
        $js = array(
            'js/moment.js',
            'js/bootstrap-datetimepicker.min.js',
            'js/list.min.js',
            'js/result.js'
        );

        $now = new DateTime('first day of last month');
        $prev_month = $now->format('Y-m');

        // $select_session = DB::select->staff('email = ?',$param["username"])->fetch();

        // $query = DB::select('select * from staff where email = :email',['email' => $email]);

        $this->data = array(
        	'home' => 'active',
            'main' => 'ผลลัพธ์ทั้งหมด',
            'submain' => '',
            'style' => $css,
            'script' => $js,
            'date' => $prev_month,
            'email' => $email
            // 'result' => $query
        );

        return view('performance/result' , $this->data);
    }
}
