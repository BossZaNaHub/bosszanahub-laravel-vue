@extends('layouts.main') 
@section('title','Result')
@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-lg-12 col-sm-12">
            <div class="title kn_lig">
                <ol class="breadcrumb">
                    <li class="active">คำนวณ KPI</li>
                    <li id="topic">Result KPI (Point &amp; Grade)</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<div class="container-fluid">
    <div id="users">
        <div class="row mb20">
            <div class="col-md-4 col-sm-12">
                <div class="form-group">
                    <div class="input-group mb-3 date" id="datetimepicker1">
                        <input type="text" class="form-control" aria-label="" placeholder="แก้ไขรายการ" value="{{$date}}">
                        <div class="input-group-append input-group-addon">
                            <span class="input-group-text"><span class="far fa-calendar-alt"></span></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb10">
                <div id="custom-search-input ">
                    <div class="inner-addon right-addon">
                        <i class="glyphicon glyphicon-search"></i>
                        <input type="text" class="form-control search" placeholder="ค้นหา" />
                    </div>
                </div>
            </div>
            <div class="col-md-5 mb10">
                <ul class="pager">
                    <li><a class="sort" data-sort="id-staff">Sort by id</a></li>
                    <li><a class="sort" data-sort="name">Sort by name</a></li>
                    <li><a class="sort" data-sort="dept">Sort by department</a></li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <table class="table">
                    <thead class="thead-dark">
                        <tr class="info">
                            <th>รหัสพนักงาน</th>
                            <th>ชื่อ-นามสกุล</th>
                            <th>แผนก</th>
                            <th>performance point</th>
                            <th>weekly point</th>
                            <th>late point</th>
                            <th>KPI</th>
                            <th>เกรด</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="view" role="dialog">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title name">Modal Header</h4>
            </div>
            <div class="modal-body">
                <table class="table table-bordered">
                    <tr class="info">
                        <th>แผน</th>
                        <th>หัวข้อ</th>
                        <th>คะแนนที่ได้</th>
                        <th>จากคะแนนเต็ม</th>
                        <th>หมายเหตุ</th>
                    </tr>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
@stop