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
    return view('welcome');
});

//หน้าแรก
// Route::get('/','HomeController@index');

// หน้า BalancedScoreCard
Route::resource('balance','BscController');

//Require parameters
// Route::get('test/{id}/{name}', function ($id,$name) {
//     return view('header', ['id' => $id , 'name' => $name]);
// });

//Optional Parameters
// Route::get('test/{id?}/{name?}', function ($id=null,$name=null) {
//     return view('header', ['id' => $id , 'name' => $name]);
// });

//Regular Expression
Route::get('test-regular/{id?}/{name?}', function ($id,$name) {
    return view('header', ['id' => $id , 'name' => $name]);
})->where('id','[0-9]+');

//Match 
Route::match(['get','post'],'bill',function(){
	if (Request::isMethod('get')){
		return 'This get method';
	}else{
		return 'This non get method';
	}
});

//Any 
Route::get('test', 'TestController@index');

Route::any('poll', 'Auth\LoginController@poll');

Route::get('testcon','TestController@index');

Auth::routes();

Route::get('form', 'Auth\LoginController@form');
