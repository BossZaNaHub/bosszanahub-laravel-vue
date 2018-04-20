@extends('layouts.main') @section('content')
@section('title','Role Permission')
<div class="container-fluid">
    <div class="row">
        <div class="col-md-6 col-xs-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="text-center">Role : Permission Management</h4>
                </div>
                <div class="panel-body">
                    <div class="col-md-12">
                      
                    </div>
                    <div class="col-md-12 edit-form">
                        <form id="edit-form">
                            <div class="form-group">
                                <label for="id">รหัสพนักงาน</label>
                                <input type="text" class="form-control" name="id" data-id="1" readonly>
                            </div>
                            <div class="form-group">
                                <label for="name">ชื่อพนักงาน</label>
                                <input type="text" class="form-control" name="name" data-id="2" readonly>
                            </div>
                            <div class="form-group">
                                <label>บทบาท</label>
                            </div>
                            <div class="checkbox">
                                <div class="col-md-4 col-xs-12">
                                    <label>
                                        <input class="check" type="checkbox" data-id="5" name="chk_perf">คิดคะแนน Performance</label>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                    <label>
                                        <input class="check" type="checkbox" data-id="6" name="chk_week">คิดคะแนน Weekly</label>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                    <label>
                                        <input class="check" type="checkbox" data-id="7" name="chk_time">คิดคะแนน Time Attendance</label>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-default mt10 edit">แก้ไข</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div class="col-md-6 col-xs-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4>เพิ่มพนักงานใหม่ และบทบาท</h4>
                </div>
                <div class="panel-body">
                    <div class="col-md-12">
                        <div class="form-group">
                           
                        </div>
                    </div>
                    <div class="col-md-12 create-form">
                        <form id="create-form">
                            <div class="form-group">
                                <label for="id">รหัสพนักงาน</label>
                                <input type="text" class="form-control" name="id" data-id="1" readonly>
                            </div>
                            <div class="form-group">
                                <label for="name">ชื่อพนักงาน</label>
                                <input type="text" class="form-control" name="name" data-id="2" readonly>
                            </div>
                            <div class="form-group">
                                <label>บทบาท</label>
                               
                            </div>
                            <div class="checkbox">
                                <div class="col-md-4 col-xs-12">
                                    <label>
                                        <input class="check" type="checkbox" name="chk_perf">คิดคะแนน Performance</label>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                    <label>
                                        <input class="check" type="checkbox" name="chk_week">คิดคะแนน Weekly</label>
                                </div>
                                <div class="col-md-4 col-xs-12">
                                    <label>
                                        <input class="check" type="checkbox" name="chk_time">คิดคะแนน Time Attendance</label>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-default mt10 new">เพิ่มเข้าระบบ KPI</button>
                        </form>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</div>
@stop