<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light">
            <a class="navbar-brand" href="/test">Boss Portfolio</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <router-link class="nav-link" :to="{name: 'home'}">Home <span class="sr-only">(current)</span></router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'portfolio'}">My Project</router-link>
                    </li>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{name: 'aboutme'}">About Me</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="container-fluid">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {}
</script>