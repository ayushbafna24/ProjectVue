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
            <p>Ut orci ligula, varius ac consequat in, rhoncus in dolor. Mauris pulvinar molestie accumsan. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aenean velit ligula, pharetra quis aliquam sed, scelerisque sed sapien. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam dui mi, vulputate vitae pulvinar ac, condimentum sed eros.</p>
        </div>
    </kendo-tabstrip>
    </div>
</template>
<script>
import axios from 'axios';
import skillSet from './Skill-Set';
export default {
    data(){
        return{
            skillSet:["HTML","Vue","Angular","React"],
            users:[],
        }
    },
    mounted(){
       // this.getUsers();
    },
    components:{
        skillSet
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
    }
}
</script>