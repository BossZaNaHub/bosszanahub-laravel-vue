<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKpiBscsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kpi_bscs', function (Blueprint $table) {
            $table->increments('id');
            $table->text('bsc_id');
            $table->text('bsc_title');
            $table->text('staff');
            $table->timestamps();
        });

        Schema::create('kpi_bsc_descriptions', function (Blueprint $table) {
            $table->increments('id');
            $table->text('bsc_detail_id');
            $table->text('bsc_detail');
            $table->text('staff');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kpi_bscs');
    }
}
