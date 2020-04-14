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
import user from '../.././user'
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
            userList:user,
            skillGridList:[]
        }
    },
    mounted(){},
    components:{
        Grid,
        GridToolbar,
        GridNoRecords
    },
    methods: {
        onDropDownChange(event) {
            let value = event.target.value.name;
            this.skillGridList = [];
            if(value != 'Select User')
                this.filterUserSkills(value);
        },
         insert() {
            const dataItem = { inEdit: true };
           // const newproducts = this.gridData.slice();
            this.userList.splice(0, 0, dataItem)
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
