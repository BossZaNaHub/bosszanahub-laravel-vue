<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DateTime;
use DB;

class EmailController extends Controller
{
    public function index() {

    	$email = env('EMAI_ADDRESS');

		$now = new DateTime('first day of last month');
        $prev_month = $now->format('Y-m');

    	$select_result = DB::select('select * from kpi_view_result where perf_date like :date',['date' => $prev_month.'%']);
    
        $css = array(
            'css/index.css',
            'css/bootstrap-datetimepicker.min.css'
        );
        $js = array(
            'js/moment.js',
            'js/bootstrap-datetimepicker.min.js',
            'js/Chart.min.js',
            'js/home.js'
        );
        $this->data = array(
            'home' => 'active',
            'main' => 'อีเมล์',
            'submain' => '',
            'style' => $css,
            'script' => $js,
            'email' => $email,
            'result' => $select_result,
            'month' => $prev_month
        );
    	return view('email/email' , $this->data);
    }
}
