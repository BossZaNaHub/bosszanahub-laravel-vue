@extends('layouts.main') @section('content')
<div class="container-fluid">
    <div class="row mb20">
        <div class="col-md-6 col-sm-12">
            <div class="card">
                <img class="card-img-top img-fluid" src="https://placeimg.com/300/150/any" alt="">
                <div class="card-body">
                	<?php foreach ($staff as $s) { ?>
                    <h5 class="card-title"><?=$s->title_th." ".$s->fname_th." ".$s->lname_th?></h5>
                    <p class="card-text"><?=$s->dept?>, <?=$s->posit?>&nbsp;<i class="fas fa-user"></i></p>
                    <p class="card-text"><?=$s->email?>&nbsp;<i class="fas fa-envelope"></i></p>
                    <p><i class="fas fa-gift"></i>&nbsp;<?php echo date('F j, Y')?></p>
                    <?php } ?>
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