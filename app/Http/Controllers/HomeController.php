<?php

namespace HomeController\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $email = env('EMAI_ADDRESS');
        // $query = DB::select('select * from staff where email = :email',['email' => $email]);
        // $role = DB::('staff = ?', $select_session["id_staff"])->fetch();
        // var_dump($query[0]->email);
        // $query[0]->
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {   
        $email = env('EMAI_ADDRESS');
        $query = DB::select('select * from staff where email = :email',['email' => $email]);

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
            'main' => 'แสดงรายละเอียด',
            'submain' => '',
            'style' => $css,
            'script' => $js,
            'staff' => $query,
            'email' => $email
        );

        return view('home/home' , $this->data);
    }

}
