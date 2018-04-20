@extends('layouts.main') @section('content')
<div class="container">
    <div class="row">
        <div class="col-md-3 col-sm-6">
            {{ Html::link('balance/create' , 'สร้างรายการใหม่' , array('class' => 'btn btn-primary')) }}
        </div>
        <div class="col-md-3 col-sm-6">
            <div class="form-group">
                <div class="input-group mb-3 date" id="datetimepicker1">
                    <input type="text" class="form-control" aria-label="" placeholder="แก้ไขรายการ">
                    <div class="input-group-append input-group-addon">
                        <span class="input-group-text"><span class="far fa-calendar-alt"></span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ชื่อรายการที่สร้าง</th>
                        <th scope="col">วันที่สร้างรายการ</th>
                        <th scope="col">วันที่ปรับเปลี่ยนแก้ไข</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection