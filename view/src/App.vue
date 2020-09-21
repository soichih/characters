<template>
<el-container id="app">
    <el-header>
        <p style="float: right;">
            <el-dropdown @command="handleTestAction">
                <el-button type="secondary" size="small">
                    Application Test<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="guest">Become Guest</el-dropdown-item>
                    <el-dropdown-item command="admin">Become Admin</el-dropdown-item>
                    <el-dropdown-item command="logoff">Logoff</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </p>
        <h2>Characters!</h2>
    </el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
</el-container>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            page: "List"
        }
    },

    methods: {
        handleTestAction(command) {
            console.log(command);
            if(command == "guest") this.setJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd1ZXN0Iiwic2NvcGVzIjpbInVzZXIiXSwiaWF0IjoxNjAwNjQ0Njg4LCJleHAiOjE2MDE1MDg2ODh9.5JEf11Lr4a2tRItfnr4HtTrfGc2h9wpuymog8DUfE-w");
            if(command == "admin") this.setJwt("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic2NvcGVzIjpbImFkbWluIl0sImlhdCI6MTYwMDY0NDc2MiwiZXhwIjoxNjAxNTA4NzYyfQ.0oOl3O2JUNDfaH_ybhVqBBAZIVSSZ9PxNQLsvQSA68s");
            if(command == "logoff") this.setJwt(null);
        },

        setJwt(jwt) {
            this.$root.jwt = jwt;
            if(jwt) {
                axios.defaults.headers.common['Authorization'] =  "Bearer "+jwt;
            } else {
                delete axios.defaults.headers.common['Authorization'];
            }
        }
    }
}
</script>

<style>
body, html {
font-family: Arial;
color: #666;
}
h2 {
color: #888;
text-transform: uppercase;
}
#app {
}
.test {
background-color: #ddd;
color: #888;
padding: 20px;
}
</style>
