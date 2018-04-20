@extends('layouts.main') @section('content')
<div class="container">
    <div class="row">
        <div class="col">
            <div class="alert alert-warning" role="alert" style="display: none;">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="form-group">
                {{ Html::link('balance' , 'ดูรายการที่เคยสร้างไว้ทั้งหมด' , array('class' => 'btn btn-info')) }}
            </div>
        </div>
        <div class="col">
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
    <h2>สร้างรายการใหม่</h2>
    <div class="row">
        <div class="col-md-6 col-sm-6">
            <div class="form-group">
                <input id="title" type="text" class="form-control" aria-label="" placeholder="กรอกชื่อรายการ">
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <p id="get-title" class="text-center"></p>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">ลำดับ</th>
                        <th scope="col">หัวข้อ Balance Scorecard</th>
                        <th scope="col">ตัวเลือก</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="topic">
                        <th scope="row">1</th>
                        <td>
                            <input type="text" class="form-control" id="bscTopic" aria-describedby="" placeholder="กรุณากรอกหัวข้อ">
                        </td>
                        <td>
                            <button type="button" class="btn btn-danger removeTopic">ลบ</button>
                        </td>
                    </tr>
                    <tr>
                        <th colspan="3" class="text-center">
                            <button class="btn btn-light text-center" onclick="addTopic()">เพิ่ม <i class="fas fa-plus"></i></button>
                            <button class="btn btn-danger text-center" onclick="removeAllTopic()">ลบทุกรายการ <i class="fas fa-minus"></i></button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="row">
        <div class="col-md-3">
            <div class="form-group">
                <button type="submit" class="btn btn-primary">บันทึกข้อมูล</button>
            </div>
        </div>
    </div>
</div>
@endsection