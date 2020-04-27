<template>
    <div>
        <div class="drop-down right-align">
            <dropdownlist
                :data-items="userDropdownList"
                :text-field="'name'"
                :data-item-key="'id'"
                :default-item="defaultItem"
                @change="onDropDownChange">
        </dropdownlist>
        </div>
        <div class="grid">
            <Grid ref="grid"
                :style="{height: '440px'}"
                :data-items="skillGridList"
                :columns="columns">
                <grid-no-records>
                    There is no data available custom
                </grid-no-records>
                <grid-toolbar>
                    <button class="k-button k-grid-remove-command" @click="update()">
                        Update
                    </button>
                </grid-toolbar>
            </Grid>
        </div>

    </div>
</template>

<script>
import "@progress/kendo-theme-default/dist/all.css";
import CommandCell from './LogsAction';
import { Grid, GridNoRecords,GridToolbar } from "@progress/kendo-vue-grid";

export default {
    data(){
        return {
            columns:[
                { field: "id", editable: false, title: "ID", },
                { field: "skill_name", title: "Skills", },
                { field: "skill_value", title: "Skill Level",editor: 'numeric' },
                { cell: CommandCell, filterable: false, width: '250px' }
            ],
            defaultItem: { 
                name: 'Select User'
            },
            userDropdownList:[],
            users:[],
            selectedUser:null,
            skillGridList:[]
        }
    },
    mounted(){
        this.getUsers();
    },
    components:{
        Grid,
        GridToolbar,
        GridNoRecords
    },
    methods: {
       async getUsers(){
         const response =  await this.$ApiService.getUserList();
         this.users = response;
         this.createUserList(response);
        },
        createUserList(list){
            list.map((d,index)=>{
                const option = {'name':d.firstName,'id':index+1};
                this.userDropdownList.push(option); 
            })
        },
        onDropDownChange(event) {
            let value = event.target.value.name;
            this.skillGridList = [];
            if(value != 'Select User')
                this.filterUserSkills(value);
            else   
                this.selectedUser = null; 

        },
        filterUserSkills(selectedName){
           this.selectedUser = this.users.filter(user => {
                return selectedName == user.firstName;
            })[0];
            
            this.selectedUser.skills.map((skill,index) =>{
                let gridItem = {};
                gridItem['id'] = index+1;
                gridItem['skill_name'] = skill.skillName;
                gridItem['skill_value'] = skill.value;
               // gridItem['action'] = 'action';

                this.skillGridList.push(gridItem);
            })
        },
         update(){
            if(this.selectedUser != null){
                this.skillGridList.map((skill,index) =>{
                    this.selectedUser.skills[index].value = skill.skill_value;
                })
               this.selectedUser = this.$ApiService.updateUser(this.selectedUser)
                
            }
                
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