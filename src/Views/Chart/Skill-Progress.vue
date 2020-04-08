<template>
    <div>
        <div class="divPadding" id="dropDownDataDiv">
            <span>Select a user to schedule an event: </span>
            <div>
                <dropdownlist :data-items='userList' :default-value="'Rajesh'" @change="onUserChange"></dropdownlist>
                <dropdownlist :data-items='skillList' :default-value="'Angular'" @change="onSkillChange" ></dropdownlist>
            </div>
        </div>
        <div v-if="showChart" id="vueapp" class="vue-app">
            <div><br><br><br><br></div>
            <kendo-chart ref="chart"
                        :title-text="'Skill Progress'"
                        :legend-position="'bottom'"
                        :chart-area-background="''"
                        :series-defaults-type="'line'"
                        :series-defaults-style="'smooth'"
                        :value-axis-labels-format="'{0}'"
                        :value-axis-line-visible="false"
                        :value-axis-axis-crossing-value="'-10'"
                        :category-axis-categories="categories"
                        :category-axis-major-grid-lines-visible="false"
                        :category-axis-labels-rotation="'auto'"
                        :tooltip-visible="true"
                        :tooltip-format="'{0}%'"
                        :tooltip-template="tooltiptemplate"
                        :theme="'sass'">
                <kendo-chart-series-item :name="'India'" :data="indiaData" :k-style="'step'"></kendo-chart-series-item>
                <!--<kendo-chart-series-item :name="'World'" :data="worldData"></kendo-chart-series-item>-->
            </kendo-chart>
            <div><br><br><br><br></div>
        </div>
    </div>
</template>

<script>
// import user from '../.././user';
    export default {
        name: 'skillProgress',
        data(){
            return {
                // users:user,
                skillData:[],
                showChart:true,
                currentUser:'Rajesh',
                currentSkill:'Angular',
                userList:['Ayush','Sujit','Rajesh','Danish','Sunakshi','Srashti','Bhoodeo'],
                skillList:['HTML','CSS','JS','Angular','React','Vue'],
                tooltiptemplate: '#= series.name #: #= value #',
                indiaData: [],
                worldData: [],
                categories: ['08/04', '09/04', '10/04', '11/04', '12/04', '13/04', '14/04', '15/04', '16/04', '17/04']
            }
        },
        mounted(){
            // this.skillData = JSON.parse(JSON.stringify(this.users));
            this.skillData = this.getSkillData();
            this.createChartData();
            console.log("Data", this.users);
            // this.indiaData = [6, 6.5, 7, 7.5, 7, 8, 8, 8.5, 9, 9.5],
            // this.worldData = [6, 6.5, 7, 7.5, 7, 8, 8, 8.5, 9, 9.5]
        },
        methods:{
            onUserChange(event) {
                console.log('onUserChange',event);
                this.currentUser = event.value;
                this.createChartData();
            },
            onSkillChange(event) {
                console.log('onSkillChange',event);
                this.currentSkill = event.value;
                this.createChartData();
            },
            createChartData(){
                var nameArray = [];
                var datas = JSON.parse(JSON.stringify(this.skillData))
                datas.find(function(data){
                    nameArray.push(data.name);
                })
                var index = nameArray.indexOf(this.currentUser);
                this.indiaData = datas[index].skill[this.currentSkill];
                console.log(this.currentSkill);
                console.log(this.currentUser);
                console.log(this.skillData);
            },
            getSkillData(){
                return [
                    {
                        'name':'Ayush',
                        'skill':{
                            'HTML':[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5],
                            'CSS':[4, 4.5, 5, 5.5, 6, 6.5, 7, 8.5, 9, 9.5],
                            'JS':[2, 8, 3, 7.4, 8, 3, 6, 3, 5, 7],
                            'Angular':[3, 9, 5, 4, 8, 3, 9, 4, 9, 9.5],
                            'React':[8, 4, 3, 8, 4, 9, 4, 8, 3, 9.5],
                            'Vue':[6, 6.5, 7, 7.5, 7, 8, 8, 8.5, 9, 9.5],
                        }
                    },
                    {
                        'name':'Sujit',
                        'skill':{
                            'HTML':[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5],
                            'CSS':[4, 4.5, 5, 5.5, 6, 6.5, 7, 8.5, 9, 9.5],
                            'JS':[2, 8, 3, 7.4, 8, 3, 6, 3, 5, 7],
                            'Angular':[3, 9, 5, 4, 8, 3, 9, 4, 9, 9.5],
                            'React':[8, 4, 3, 8, 4, 9, 4, 8, 3, 9.5],
                            'Vue':[6, 6.5, 7, 7.5, 7, 8, 8, 8.5, 9, 9.5],
                        }
                    },
                    {
                        'name':'Rajesh',
                        'skill':{
                            'HTML':[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5],
                            'CSS':[4, 4.5, 5, 5.5, 6, 6.5, 7, 8.5, 9, 9.5],
                            'JS':[2, 8, 3, 7.4, 8, 3, 6, 3, 5, 7],
                            'Angular':[3, 9, 5, 4, 8, 3, 9, 4, 9, 9.5],
                            'React':[8, 4, 3, 8, 4, 9, 4, 8, 3, 9.5],
                            'Vue':[6, 6.5, 7, 7.5, 7, 8, 8, 8.5, 9, 9.5],
                        }
                    },
                    {
                        'name':'Danish',
                        'skill':{
                            'HTML':[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5],
                            'CSS':[4, 4.5, 5, 5.5, 6, 6.5, 7, 8.5, 9, 9.5],
                            'JS':[2, 8, 3, 7.4, 8, 3, 6, 3, 5, 7],
                            'Angular':[3, 9, 5, 4, 8, 3, 9, 4, 9, 9.5],
                            'React':[8, 4, 3, 8, 4, 9, 4, 8, 3, 9.5],
                            'Vue':[6, 6.5, 7, 7.5, 7, 8, 8, 8.5, 9, 9.5],
                        }
                    },
                    {
                        'name':'Sunakshi',
                        'skill':{
                            'HTML':[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5],
                            'CSS':[4, 4.5, 5, 5.5, 6, 6.5, 7, 8.5, 9, 9.5],
                            'JS':[2, 8, 3, 7.4, 8, 3, 6, 3, 5, 7],
                            'Angular':[3, 9, 5, 4, 8, 3, 9, 4, 9, 9.5],
                            'React':[8, 4, 3, 8, 4, 9, 4, 8, 3, 9.5],
                            'Vue':[6, 6.5, 7, 7.5, 7, 8, 8, 8.5, 9, 9.5],
                        }
                    },
                    {
                        'name':'Srashti',
                        'skill':{
                            'HTML':[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5],
                            'CSS':[4, 4.5, 5, 5.5, 6, 6.5, 7, 8.5, 9, 9.5],
                            'JS':[2, 8, 3, 7.4, 8, 3, 6, 3, 5, 7],
                            'Angular':[3, 9, 5, 4, 8, 3, 9, 4, 9, 9.5],
                            'React':[8, 4, 3, 8, 4, 9, 4, 8, 3, 9.5],
                            'Vue':[6, 6.5, 7, 7.5, 7, 8, 8, 8.5, 9, 9.5],
                        }
                    },
                    {
                        'name':'Bhoodeo',
                        'skill':{
                            'HTML':[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5],
                            'CSS':[4, 4.5, 5, 5.5, 6, 6.5, 7, 8.5, 9, 9.5],
                            'JS':[2, 8, 3, 7.4, 8, 3, 6, 3, 5, 7],
                            'Angular':[3, 9, 5, 4, 8, 3, 9, 4, 9, 9.5],
                            'React':[8, 4, 3, 8, 4, 9, 4, 8, 3, 9.5],
                            'Vue':[6, 6.5, 7, 7.5, 7, 8, 8, 8.5, 9, 9.5],
                        }
                    }
                ]
            }
        }
    }
</script>