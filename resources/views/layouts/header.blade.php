<nav class="navbar navbar-expand-lg navbar-inverse navbar-light kn_lig">
    <a class="navbar-brand" href="#"><img src="{{ asset('images/logo-xs.png') }}" width="30" height="30" alt="">KPI SYSTEM</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-between" id="navbar">
        <ul class="navbar-nav">
            <li class="nav-item {{{ (Request::is('home') ? 'active' : '') }}}"><a class="nav-link" href="home">แสดงรายละเอียด <span class="sr-only">(current)</span></a></li>
            <li class="nav-item dropdown {{{ (Request::is('result') ? 'active' : '') }}} {{{ (Request::is('bsc') ? 'active' : '') }}}">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">BSC Performance</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item {{{ (Request::is('bsc') ? 'active' : '') }}}" href="#">Performance</a>
                    <a class="dropdown-item {{{ (Request::is('result') ? 'active' : '') }}}" href="#">Result</a>
                </div>
            </li>
            <li class="nav-item {{{ (Request::is('email') ? 'active' : '') }}}"><a class="nav-link" href="email">ส่งอีเมล์</a></li>
            <li class="nav-item"><a class="nav-link" href="#">รายงาน (Report)</a></li>
            <li class="nav-item {{{ (Request::is('role') ? 'active' : '') }}}"><a class="nav-link" href="role">จัดการบทบาท</a></li>
            <li class="nav-item"><a class="nav-link" data-toggle="modal" data-target="#manual">คู่มือการใช้งาน</a></li>
        </ul>
        <ul class="navbar-nav">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ $email }}</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">ออกจากระบบ</a>
                </div>
            </li>
        </ul>
    </div>
</nav>
<div class="modal fade" id="manual" role="dialog" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">คู่มือการใช้งาน</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="embed-responsive embed-responsive-1by1">
                    <iframe class="embed-responsive-item" src="{{ asset('manual/manual_kpi.pdf') }}"></iframe>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">ปิด</button>
            </div>
        </div>
    </div>
</div>