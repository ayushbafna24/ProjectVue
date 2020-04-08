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
    </div>
</template>
<script>
import axios from 'axios';
import skillSet from './Skill-Set';
import userData from './User-Data';
import user from '../.././user'

export default {
    data(){
        return{
            users:user,
            userDataSet:[],
            userChartColor:["#9de219","#90cc38","#068c35","#006634","#004d38"]//#033939
        }
    },
    mounted(){
       // this.getUsers();
       this.createUserDataSet();
       console.log(this.userDataSet);
    },
    components:{
        skillSet,
        userData
    },
    methods:{
        getUsers(){
            let vm = this;
            axios.get('https://skilldata.free.beeceptor.com/getskills').then(
                response =>{
                    this.users = response.data;
                    // filter skill sets.
                    let skill = response.data[0].skills.replace("[","");
                    skill = skill.replace("]","").trim().split(",");
                    skill.forEach(element => {
                        element = element.trim().split(":")[0];
                        if(!vm.skillSet.includes(element))
                            vm.skillSet.push(element);
                    });
                } 
            )
        },
        createUserDataSet(){
            let vm = this;
            this.users.map(user=>{
                let values = [];
                user.skills.map((subject,index) =>{
                    let chartData = {};
                  chartData['category'] = Object.keys(subject)[0];
                  chartData['value'] = Object.values(subject)[0];
                  chartData['color'] = vm.userChartColor[index];
                  values.push(chartData);
                })
                let userData = {"name":user.name,"values":values}
                vm.userDataSet.push(userData);
            })

        }
    }
};
</script>

<style lang="scss" scoped>
@import "./Chart.scss";
</style>
