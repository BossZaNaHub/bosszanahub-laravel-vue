@extends('layouts.main') @section('content')
@section('title','Key Performance Indicator')
<div class="container-fluid">
    <div class="row mb20">
        <div class="col-md-6 col-sm-12">
            <div class="card">
                <img class="card-img-top img-fluid" src="https://placeimg.com/300/150/any" alt="">
                <div class="card-body">
                    @foreach ($staff as $s)           
                	<h5 class="card-title">{{$s->title}} {{$s->name}} {{$s->last}}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">{{$s->dept}} , {{$s->posit}}</h6>
                    <p class="card-text"><i class="fas fa-envelope"></i> {{$s->email}}</p>
                    <p class="card-text"><i class="fas fa-birthday-cake"></i> {{thaidate('d F Y',strtotime($s->birthday))}}</p>
                    <span class="badge badge-dark">{{$s->role_name}}</span>
                    @endforeach
                </div>
            </div>
        </div>
        <div class="col-md-6 col-sm-12">
            <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary">Year</button>
                <button type="button" class="btn btn-secondary">Month</button>
            </div>
            <canvas id="monthChart"></canvas>
            <canvas id="yearChart"></canvas>
        </div>
    </div>
</div>
@stop