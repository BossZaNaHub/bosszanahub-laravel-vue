@extends('layouts.main') @section('content') 
@section('title','Email')
<div class="container-fluid">
    <div id="email">
        <div class="row mb20">
            <div class="col-md-4 col-sm-12 mb10">
                <div class="input-group date datetimepicker">
                    <input type="text" class="form-control" placeholder="ปี-เดือน" id="getDate2" value="{{$month}}">
                    <div class="input-group-addon">
                        <span class="glyphicon glyphicon-calendar"></span>
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
                    <li><a class="sort" data-sort="id-staff">Sort by name</a></li>
                    <li><a class="sort" data-sort="name">Sort by department</a></li>
                    <li><a class="sort" data-sort="dept">Sort by email</a></li>
                </ul>
            </div>
        </div>
        <div class="table-responsive kn_lig">
            <table class="table">
                <thead class="thead-dark">
                    <tr class="info">
                        <th>
                            <input type="checkbox" name="allbox" id="chkAll">
                        </th>
                        <th>ชื่อ-นามสกุล</th>
                        <th>แผนก</th>
                        <th>KPI POINT</th>
                        <th>Email</th>
                        <th class="text-center">
                            <button class="btn btn-sm btn-success email-click">ส่งอีเมล</button>
                        </th>
                    </tr>
                </thead>
                <tbody class="list">
                    @if (!empty($result))
                    @foreach ($result as $r)
                    <tr>
                        <td><input type="checkbox" name="chkitem" id="chkItem"></td>
                        <td>{{$r->fullname}}</td>
                        <td>{{$r->dept}}</td>
                        <td>{{$r->total}} %</td>
                        <td>{{$r->email}}</td>
                        <td class="text-center"><i class="fas fa-envelope"></i></td>
                    </tr>
                    @endforeach
                    @else
                    <tr>
                        <td colspan="6" class="text-center">ยังไม่มีรายการอัพเดท</td>
                    </tr>
                    @endif
                </tbody>
            </table>
        </div>
    </div>
</div>
@stop