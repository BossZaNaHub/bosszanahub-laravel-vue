@extends('layouts.main') @section('content')
<div class="container">
    <div class="row">
        <div class="col-md-3 col-sm-6">
            <button class="btn btn-primary">สร้างรายการใหม่</button>
        </div>
        <div class="col-md-3 col-sm-6">
        	<div class="form-group">
            <div class="input-group mb-3 date" id="datetimepicker1">
                <input type="text" class="form-control" aria-label="" placeholder="ดูรายการที่เคยสร้าง">
                <div class="input-group-append input-group-addon">
                    <span class="input-group-text"><span class="far fa-calendar-alt"></span></span>
                </div>
            </div>
        	</div>
        </div>
    </div>
    <div class="row">
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">ลำดับ</th>
                    <th scope="col">หัวข้อ Balance Scorecard</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                </tr>
                <tr>
                    <th colspan="2" class="text-center"><button class="btn btn-light text-center">เพิ่ม <i class="fas fa-plus"></i></button></th>
                </tr>
            </tbody>
        </table>
    </div>
</div>
@endsection