<template>
<div>
    <el-table :data="chs" style="width: 100%">
        <el-table-column prop="name" sortable label="Name" width="180"></el-table-column>
        <el-table-column prop="gender" sortable label="Gender" width="180"></el-table-column>
        <el-table-column prop="birthdate" sortable label="B-Day">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ new Date(scope.row.birthdate).toLocaleString() }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="height" sortable label="Height(cm)" width="130"></el-table-column>
        <el-table-column prop="weight" sortable label="Weight(cm)" width="130"></el-table-column>
        <el-table-column prop="createDate" sortable label="Created On">
            <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ new Date(scope.row.createDate).toLocaleString() }}</span>
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="Operations" width="120">
          <template slot-scope="scope">
            <el-button @click="del(scope.$index)" type="text"><i class="el-icon-delete"></i></el-button>
            <el-button @click="edit(scope.$index)" type="text"><i class="el-icon-edit"></i></el-button>
          </template>
        </el-table-column>
    </el-table>
    <br>
    <el-button @click="$router.push('/create')" type="primary">Create</el-button>
</div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            chs: [],
        }
    },
    mounted() {
        axios.get(this.$root.api+'/chs').then(res=>{
            this.chs = res.data;
        });
    },
    methods: {
        del(idx) {
            const row = this.chs[idx];
            if(confirm("do you want to remove this character? "+row.name)) {
                axios.delete(this.$root.api+'/ch/'+row._id).then(res=>{
                    this.$notify({ title: 'Success', message: res.data.message, type: 'success' });
                    delete this.chs[idx];
                }).catch(err=>{
                    this.$notify({ title: 'Error', message: err.response.data.message, type: 'danger' });
                });
            }
        },
        edit(idx) {
            const row = this.chs[idx];
            this.$router.push("/edit/"+row._id);
        }
    },
}
</script>

<style scoped>
.character {
box-shadow: 1px 1px 3px #0001;     
}
</style>
