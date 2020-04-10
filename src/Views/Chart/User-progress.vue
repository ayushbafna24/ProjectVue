<template>
    <div>
        <div class="progressHeader divPadding" id="dropDownDataDiv">
            <div>
                <dropdownlist :data-items='dateList' :default-value="'06/04/2020'" @change="onUserChange"></dropdownlist>
            </div>
        </div>
        <div v-if="showChart" id="vueapp" class="vue-app">
            <kendo-chart ref="chart"
                        :title-text="'Skill Progress'"
                        :legend-position="'bottom'"
                        :series-defaults-type="'line'"
                        :series-defaults-style="'smooth'"
                        :value-axis-labels-format="'{0}'"
                        :value-axis-axis-crossing-value="'-10'"
                        :category-axis-categories="categories"
                        :tooltip-visible="true"
                        :tooltip-format="'{0}'"
                        :theme="'sass'">
                <kendo-chart-series-item :name="'Ayush'" :data="ayushDate"></kendo-chart-series-item>
                <kendo-chart-series-item :name="'Sujit'" :data="sujitDate"></kendo-chart-series-item>
                <kendo-chart-series-item :name="'Rajesh'" :data="rajeshDate"></kendo-chart-series-item>
                <kendo-chart-series-item :name="'Danish'" :data="danishDate"></kendo-chart-series-item>
                <kendo-chart-series-item :name="'Sunakshi'" :data="SunakshiDate"></kendo-chart-series-item>
                <kendo-chart-series-item :name="'Srashti'" :data="srashtiDate"></kendo-chart-series-item>
                <kendo-chart-series-item :name="'Bhoodeo'" :data="bhoodeoDate"></kendo-chart-series-item>
            </kendo-chart>
        </div>
    </div>
</template>

<script>
// import user from '../.././user';
    export default {
        name: 'userProgress',
        data(){
            return {
                // users:user,
                skillData:[],
                showChart:true,
                currentDate:'06/04/2020',
                currentSkill:'Angular',
                dateList:['06/04/2020','07/04/2020','08/04/2020','09/04/2020'],
                //skillList:['HTML','CSS','JS','Angular','React','Vue'],
                ayushDate: [],
                sujitDate: [],
                rajeshDate: [],
                danishDate: [],
                SunakshiDate: [],
                srashtiDate: [],
                bhoodeoDate: [],
                // categories: ['08/04', '09/04', '10/04', '11/04', '12/04', '13/04', '14/04', '15/04', '16/04', '17/04']
                categories: ['HTML','CSS','JS','Angular','React','Vue']
            }
        },
        mounted(){
            // this.skillData = JSON.parse(JSON.stringify(this.users));
            this.skillData = this.getSkillData();
            this.createChartData();
            console.log("Data", this.users);
            // this.danishDate = [6, 6.5, 7, 7.5, 7, 8, 8, 8.5, 9, 9.5],
            // this.worldData = [6, 6.5, 7, 7.5, 7, 8, 8, 8.5, 9, 9.5]
        },
        methods:{
            onUserChange(event) {
                console.log('onUserChange',event);
                this.currentDate = event.value;
                this.createChartData();
            },
            createChartData(){
                var dateArray = [];
                var datas = JSON.parse(JSON.stringify(this.skillData))
                datas.find(function(data){
                    dateArray.push(data.date);
                })
                var index = dateArray.indexOf(this.currentDate);
                // this.danishDate = datas[index].skill[this.currentSkill];
                this.ayushDate = datas[index].user['Ayush'];
                this.sujitDate = datas[index].user['Sujit'];
                this.rajeshDate = datas[index].user['Rajesh'];
                this.danishDate = datas[index].user['Danish'];
                this.SunakshiDate = datas[index].user['Sunakshi'];
                this.srashtiDate = datas[index].user['Srashti'];
                this.bhoodeoDate = datas[index].user['Bhoodeo'];
                // console.log(this.currentSkill);
                // console.log(this.currentDate);
                // console.log(this.skillData);
            },
            getSkillData(){
                return [
                    {
                        'date':'06/04/2020',
                        'user':{
                            'Ayush':[1, 1, 2, 2, 3, 3],
                            'Sujit':[4, 4, 5, 5, 6, 6],
                            'Rajesh':[2, 8, 3, 7, 8, 3],
                            'Danish':[3, 9, 5, 4, 8, 3],
                            'Sunakshi':[8, 4, 3, 8, 4, 9],
                            'Srashti':[6, 6, 7, 7, 7, 8],
                            'Bhoodeo':[4, 7, 3, 2, 9, 6]
                        }
                    },
                    {
                        'date':'07/04/2020',
                        'user':{
                            'Ayush':[4, 5, 6, 7, 3, 7],
                            'Sujit':[2, 9, 9, 5, 3, 8],
                            'Rajesh':[4, 7, 8, 9, 8, 5],
                            'Danish':[2, 5, 5, 3, 7, 4],
                            'Sunakshi':[4, 5, 7, 8, 3, 6],
                            'Srashti':[8,9,4, 9, 3, 4],
                            'Bhoodeo':[5,6,7,3,8,9]
                        }
                    },
                    {
                        'date':'08/04/2020',
                        'user':{
                            'Ayush':[6, 4, 6, 8, 3, 9],
                            'Sujit':[9, 3, 9, 8, 7, 5],
                            'Rajesh':[4, 5, 7, 3, 2, 9],
                            'Danish':[9, 3, 4, 5, 8, 6],
                            'Sunakshi':[9, 4, 3, 2, 5, 9],
                            'Srashti':[9, 3, 4, 5, 6, 9],
                            'Bhoodeo':[6, 7, 8, 3, 9, 5]
                        }
                    },
                    {
                        'date':'09/04/2020',
                        'user':{
                            'Ayush':[9, 4, 5, 6, 8, 9],
                            'Sujit':[3, 4, 6, 7, 3, 6],
                            'Rajesh':[9, 3, 4, 6, 4, 2],
                            'Danish':[5, 6, 3, 5, 9, 3],
                            'Sunakshi':[2, 4, 5, 6, 7, 8],
                            'Srashti':[8, 3, 3, 4, 5, 5],
                            'Bhoodeo':[7, 3, 9, 7, 3, 4]
                        }
                    }
                ]
            }
        }
    }
</script>
<style lang="scss" scoped>
    .progressHeader{
        text-align: center;
    }
</style>