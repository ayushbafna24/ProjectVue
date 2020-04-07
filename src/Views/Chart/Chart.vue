<template>
    <div>
        <kendo-tabstrip>
        <ul>
            <li class="k-state-active">
                Skill Set Data Representation
            </li>
            <li>
                User Data Representation
            </li>
        </ul>
        <div>

            <skill-set :data="skillSet"></skill-set>
        </div>
        <div>
            <user-data></user-data>
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
            skillSet:["HTML","Vue","Angular","React"],
            users:user,
            userDataSet:[],
            userChartColor:["#9de219","#90cc38","#068c35","#006634","#004d38"]//#033939
        }
    },
    mounted(){
       // this.getUsers();
       this.createUserDataSet();
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
                let chartData = {}
                user.skills.map((subject,index) =>{
                  chartData['category'] = Object.keys(subject)[0];
                  chartData['value'] = Object.values(subject)[0];
                  chartData['color'] = vm.userChartColor[index];
                })
                let userData = {"name":user.name,"data":chartData}
                vm.userDataSet.push(userData);
            })
        }
    }
}
</script>