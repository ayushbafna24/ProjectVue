<template>
    <div>
        <div class="drop-down right-align">
            <dropdownlist
                :data-items="userList"
                :text-field="'name'"
                :data-item-key="'id'"
                :default-item="defaultItem"
                @change="onDropDownChange">
        </dropdownlist>
        </div>
        <div class="grid">
            <Grid ref="grid"
                :style="{height: '300px'}"
                :data-items="skillGridList"
                :columns="columns">
                 <!-- <GridToolbar>
                    <button title="Add new" class="k-button k-primary" @click="insert">
                    Add new
                    </button>
                </GridToolbar> -->
            </Grid>
        </div>

    </div>
</template>

<script>
import user from '../.././user'
import "@progress/kendo-theme-default/dist/all.css";
import { Grid } from "@progress/kendo-vue-grid";

export default {
    data(){
        return {
            columns:[
                { field: "id", editable: false, title: "ID", },
                { field: "skill_name", title: "Skills", },
                { field: "skill_value", title: "Skill Level", },
                { command: [{ name: "edit",
                       iconClass:"k-icon k-i-copy",
                       text: { edit: "Custom edit", cancel: "Custom cancel", update: "Custom update" } }] 
                },
            ],
            defaultItem: { 
                name: 'Select User'
            },
            userList:user,
            skillGridList:[]
        }
    },
    mounted(){},
    components:{
        Grid,
        //GridToolbar
    },
    methods: {
        onDropDownChange(event) {
            let value = event.target.value.name;
            this.skillGridList = [];
            if(value != 'Select User')
                this.filterUserSkills(value);
        },
        filterUserSkills(selectedName){
           let userSkill = this.userList.filter(user => {
                return selectedName == user.name;
            })[0].skills;
            
            userSkill.map((skill,index) =>{
                let gridItem = {};
                gridItem['id'] = index+1;
                gridItem['skill_name'] = Object.keys(skill)[0];
                gridItem['skill_value'] = Object.values(skill)[0];
               // gridItem['action'] = 'action';

                this.skillGridList.push(gridItem);
            })
        }
    }
};
</script>

<style scoped>
    .right-align {
        margin-top: 15px;
        text-align: right;
    }
    .grid{
        margin: 40px;
    }
    
</style>
