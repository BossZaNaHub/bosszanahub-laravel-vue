<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index() {

    	$css = array('css/role.css');

        $js = array('js/role.js');

        $email = env('EMAI_ADDRESS');

        $this->data = array(
            'home' => 'active',
            'main' => 'จัดการบทบาท',
            'submain' => '',
            'style' => $css,
            'script' => $js,
            // 'staff' => $staff,
            'email' => $email
        );

        return view('role/role' , $this->data);

    }
}
