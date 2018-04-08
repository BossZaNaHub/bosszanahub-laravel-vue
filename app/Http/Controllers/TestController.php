<?php

namespace HomeController\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index() {
    	
    	return view('test');
        
    }
}
