<template>
    <div>
        <div class="drop-down">
            <p class="dropdown-heading">Select Skill : </p>
            <dropdownlist
                :data-items="skillDropDownMenu"
                :text-field="'text'"
                :data-item-key="'id'"
                :value="value"
                @change="handleChange">
        </dropdownlist>
        </div>
        
        <div>
             <kendo-chart :title-text="'Skill Set Representation'"
                 :legend-visible="false"
                 :series-defaults-type="'column'"
                 :series="series"
                 :category-axis="categoryAxis"
                 :value-axis="valueAxis"
                 :tooltip="tooltip"
                 :pannable-lock="'x'"
                 :zoomable-mousewheel-lock="'x'"
                 :zoomable-selection-lock="'x'"
                 :theme="'sass'">
            </kendo-chart>
        </div>
 
    </div>
</template>

<script>
export default {
  data() {
    return {
      value: {},
      skillDropDownMenu:[],
      series:[],
      chartValues:[],
      valueAxis: [{
                max: 10,
                line: {
                    visible: false
                },
                minorGridLines: {
                    visible: true
                },
                labels: {
                    rotation: "auto"
                }
        }],
        categoryAxis: {
            categories: [],
            majorGridLines: {
                 visible: false
            }
        },
        tooltip: {
            visible: true,
            template: "#= series.name #: #= value #"
        }
    };
  },
  props: {
    users:{
        type:Array,
        required:true
    }
  },
  methods: {
    handleChange(event) {
      this.value = event.value;
     this.getSkillChartValues();
    },
    getSkillChartValues(){ // filtering chart data
        var vm = this;
        var chartValues = [];
        this.series = [];
       this.users.map(user=>{
          let currentSkill = user.skills.filter(skill=> {
              return this.value.text == skill.skillName
              })
              chartValues.push(currentSkill[0].value);
       })
       this.series.push({name:vm.value.text,data:chartValues});
    },
    skillDropDowns(){
            this.users[0].skills.map((lang,index) =>{
                this.skillDropDownMenu.push({text:lang.skillName,id:index+1});
            })
    }
  },
  mounted() {
    this.skillDropDowns();
    this.value = this.skillDropDownMenu[0]; // default selection.
    this.getSkillChartValues();
     this.users.map(user=>{
           this.categoryAxis.categories.push(user.firstName);
    })
  }
};
</script>

<style scoped lang="scss">
    .drop-down{
        display: flex;
        justify-content: flex-end;
        .dropdown-heading{
            margin: 4px;
        }
    }
</style>