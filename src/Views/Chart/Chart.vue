<template>
    <div>
        <kendo-tabstrip class="tabstrip">
        <ul>
            <li class="k-state-active">
                Skill Set Data Representation
            </li>
            <li>
                User Data Representation
            </li>
        </ul>
        <div class="tabstrip-data">
            <div v-if="users.length > 0">
                <skill-set :users="users"></skill-set>
            </div>
            
        </div>
        <div class="tabstrip-data">
            <div>
              <div class="user-data" v-if="userDataSet.length > 0">
              <user-data :data="user" v-for="(user,index) in userDataSet" :key="index"></user-data>
            </div>
            </div>
            
            
        </div>
    </kendo-tabstrip>
    <skillProgress></skillProgress>
    <userProgress></userProgress>
    </div>
</template>
<script>
// import axios from 'axios';
import skillSet from './Skill-Set';
import userData from './User-Data';
//import user from '../.././user';
import skillProgress from './Skill-Progress';
import userProgress from './User-progress';

export default {
    data(){
        return{
            users:[],
            userDataSet:[],
            userChartColor:["#9de219","#90cc38","#068c35","#006634","#004d38"]//#033939
        }
    },
    mounted(){
        this.getUsers();
    },
    components:{
        skillSet,
        skillProgress,
        userData,
        userProgress
    },
    methods:{
        getUsers(){
           this.$ApiService.getUserList().then(
                response =>{
                    this.users = response;
                    this.createUserDataSet(response);
                } 
            )
        },
        createUserDataSet(users){
            let vm = this;
            users.map(user=>{
                let values = [];
                user.skills.map((d,index) =>{
                    let chartData = {};
                    chartData['category'] = d.skillName;
                    chartData['value'] = d.value;
                    chartData['color'] = vm.userChartColor[index];
                    values.push(chartData);
                })
                let userData = {"name":user.firstName,"values":values}
                vm.userDataSet.push(userData);
            })

        }
    }
};
</script>

<style lang="scss" scoped>
@import "./Chart.scss";
</style>