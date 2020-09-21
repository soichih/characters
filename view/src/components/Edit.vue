<template>
<div>
    <h3 v-if="$route.params.id">Edit Character</h3>
    <h3 v-else>New Character / <small>{{form.name}}</small></h3>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="Name" prop="name" required>
            <el-input v-model="form.name"></el-input>
        </el-form-item>    

        <el-form-item label="Birthdate" prop="birthdate" required>
            <el-date-picker type="date" placeholder="Select Birthday!" v-model="form.birthdate" 
                style="width: 100%;">
            </el-date-picker>
        </el-form-item>    

        <el-form-item label="Gender" prop="gender" required>
            <el-radio-group v-model="form.gender">
                <el-radio label="male">Male</el-radio>
                <el-radio label="female">Female</el-radio>
                <el-radio label="nonbinary">Non-Binary</el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="Height(kg)" prop="height" required>
            <el-input type="number" v-model.number="form.height"></el-input>
        </el-form-item>

        <el-form-item label="Weight(cm)" prop="weight" required>
            <el-input type="number" v-model.number="form.weight"></el-input>
        </el-form-item>

        <el-form-item label="Home" prop="home">
            <el-input type="text" v-model="form.home"></el-input>
        </el-form-item>

        <el-form-item label="Location" prop="location">
            <el-input type="textarea" v-model="form.location"></el-input>
        </el-form-item>

        <br>
        <el-form-item>
            <el-button type="primary" @click="submit">Submit</el-button>
            <el-button @click="cancel">Cancel</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            form: {
                name: "",
                birthdate: null, 
                gender: "male",
                height: null,
                weight: null,
                home: "",
                location: "",
            },
            rules: {
                name: { required: true, message: 'name is required', trigger: 'blur' },
                birthdate: { type: 'date', required: true, message: 'b-day is required', trigger: 'change' },
                gender: { required: true, message: 'please specify gender', trigger: 'blur' },
                height: { required: true, message: 'please specify between 50-200 cm', trigger: 'blur' },
                weight: { required: true, message: 'please specify between 10-300 kg', trigger: 'blur' },
            },
        }
    },
    mounted() {
        console.log("mounted edit", this.$route.params.id);
        if(this.$route.params.id) {
            axios.get(this.$root.api+'/ch/'+this.$route.params.id).then(res=>{
                this.form = res.data;
                this.form.birthdate = new Date(this.form.birthdate);
                this.form.createDate = new Date(this.form.createDate);
                this.form.updateDate = new Date(this.form.updateDate);
            });
        }
    },
    methods: {
        cancel() {
            this.$router.push("/list");
        },
        submit() {
            this.$refs["form"].validate(v=>{
                if(!v) return;

                //post or put?
                let func = (data)=>{
                    return axios.post(this.$root.api+'/ch', data);
                }
                if(this.$route.params.id) func = (data)=>{
                    return axios.put(this.$root.api+'/ch/'+this.$route.params.id, data);
                }

                func(this.form).then(res=>{
                    this.$notify({ title: 'Success', message: res.data.message, type: 'success' });
                    this.$router.push("/list");
                }).catch(err=>{
                    this.$notify({ title: 'Error', message: err.response.data.message, type: 'danger' });
                });
            });
        },
    },
}
</script>

<style scoped>
</style>
