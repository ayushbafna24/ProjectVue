<template>
    <div>
        <div  class="progressHeader divPadding" id="dropDownDataDiv">
            <div>
                <dropdownlist  :data-items='userList' :default-value='currentUser' @change="onUserChange"></dropdownlist>
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
                <kendo-chart-series-item :name="'HTML'" :data="htmlData"></kendo-chart-series-item>
                <kendo-chart-series-item :name="'CSS'" :data="cssData"></kendo-chart-series-item>
                <kendo-chart-series-item :name="'JS'" :data="jsData"></kendo-chart-series-item>
                <kendo-chart-series-item :name="'Angular'" :data="angularData"></kendo-chart-series-item>
                <kendo-chart-series-item :name="'React'" :data="reactData"></kendo-chart-series-item>
                <kendo-chart-series-item :name="'Vue'" :data="vueData"></kendo-chart-series-item>
            </kendo-chart>
        </div>
    </div>
</template>

<script>
// import user from '../.././user';
export default {
  name: "skillProgress",
  data() {
    return {
      // users:user,
      fetchUser: false,
      skillData: [],
      showChart: true,
      currentUser: "",
      currentSkill: "",
      defaultUser: "",
      userData: [],
      userList: [],
      skillList: [],
      htmlData: [],
      cssData: [],
      jsData: [],
      angularData: [],
      reactData: [],
      vueData: [],
      categories: [
        "08/04",
        "09/04",
        "10/04",
        "11/04",
        "12/04",
        "13/04",
        "14/04",
        "15/04",
        "16/04",
        "17/04"
      ]
    };
  },
  watch: {
    defaultUser: function(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.currentUser = newValue;
      }
    }
  },
  mounted() {
    this.$ApiService.getUserList().then(response => {
      this.userData = response;
      this.userList.length = 0;
      this.skillList.length = 0;
      this.defaultUser = this.userData[0].firstName;
      this.currentSkill = this.userData[0].skills.skillName;
      if (this.userData.length > 0) {
        this.userData[0].skills.map(skill => {
          this.skillList.push(skill.skillName);
        });
      }
      this.userData.map(user => {
        this.userList.push(user.firstName);
        const skills = this.getSkills(user);
        this.skillData.push({
          name: user.firstName,
          skill: skills[0]
        });
        // console.log("this.skillDatathis.skillData", this.skillData);
      });
      this.createChartData();
      this.fetchUser = true;
    });
  },

  methods: {
    getSkills(userData) {
      const skills = {};
      if (userData.skills.length > 0) {
        return userData.skills.map(skill => {
          skills[[skill.skillName]] = [skill.value];
          return skills;
        });
      }
      return skills;
    },
    onUserChange(event) {
      this.currentUser = event.value;
      this.createChartData();
    },
    createChartData() {
      var nameArray = [];
      var datas = JSON.parse(JSON.stringify(this.skillData));
      datas.find(function(data) {
        nameArray.push(data.name);
      });
      var index = nameArray.indexOf(this.currentUser);
      // this.angularData = datas[index].skill[this.currentSkill];
      this.htmlData = datas[index].skill["HTML"];
      this.cssData = datas[index].skill["CSS"];
      this.jsData = datas[index].skill["JS"];
      this.angularData = datas[index].skill["Angular"];
      this.reactData = datas[index].skill["React"];
      this.vueData = datas[index].skill["Vue"];
    },
    getSkillData() {
      return [
        {
          name: "Ayush",
          skill: {
            HTML: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5],
            CSS: [4, 4.5, 5, 5.5, 6, 6.5, 7, 8.5, 9, 9.5],
            JS: [2, 8, 3, 7.4, 8, 3, 6, 3, 5, 7],
            Angular: [3, 9, 5, 4, 8, 3, 9, 4, 9, 9.5],
            React: [8, 4, 3, 8, 4, 9, 4, 8, 3, 9.5],
            Vue: [6, 6.5, 7, 7.5, 7, 8, 8, 8.5, 9, 9.5]
          }
        },
        {
          name: "Sujit",
          skill: {
            HTML: [4, 5, 6, 7, 3, 7, 8, 3, 9, 4],
            CSS: [2, 9, 9, 5, 3, 8, 7, 4, 5, 9.5],
            JS: [4, 7, 8, 9, 8, 5, 3, 5, 3, 6],
            Angular: [2, 5, 5, 3, 7, 4, 7, 5, 3, 5],
            React: [4, 5, 7, 8, 3, 6, 9, 3, 5, 7],
            Vue: [8, 9, 4, 9, 3, 4, 9, 8, 5, 2]
          }
        },
        {
          name: "Rajesh",
          skill: {
            HTML: [5, 3, 7, 3, 8, 2, 4, 8, 3, 5],
            CSS: [3, 8, 7, 3, 7, 4, 5, 7, 3, 7],
            JS: [6, 5, 8, 5, 7, 3, 5, 4, 7, 8],
            Angular: [7, 5, 5, 9, 4, 5, 6, 8, 5, 4],
            React: [5, 4, 8, 4, 6, 5, 8, 7, 5, 7],
            Vue: [5, 5, 4, 7, 4, 7, 8, 4, 3, 5]
          }
        },
        {
          name: "Danish",
          skill: {
            HTML: [5, 3, 7, 5, 4, 7, 5, 8, 5, 9],
            CSS: [7, 4, 6, 7, 5, 8, 5, 7, 5, 4],
            JS: [5, 6, 7, 8, 5, 4, 8, 4, 8, 6],
            Angular: [6, 7, 4, 8, 5, 4, 8, 4, 6, 4],
            React: [7, 5, 4, 6, 4, 8, 3, 8, 3, 7],
            Vue: [9, 5, 4, 8, 5, 8, 6, 3, 4, 8]
          }
        },
        {
          name: "Sunakshi",
          skill: {
            HTML: [5, 7, 8, 4, 5, 8, 3, 5, 8, 4],
            CSS: [6, 7, 4, 7, 4, 7, 4, 7, 3, 5],
            JS: [5, 6, 3, 3, 7, 8, 6, 8, 7, 9],
            Angular: [6, 4, 8, 4, 6, 7, 5, 6, 9, 9],
            React: [1, 2, 7, 4, 5, 8, 6, 4, 3, 9],
            Vue: [1, 5, 5, 7, 8, 4, 3, 5, 9, 9]
          }
        },
        {
          name: "Srashti",
          skill: {
            HTML: [4, 6, 4, 3, 6, 5, 5, 8, 4, 8],
            CSS: [3, 6, 8, 9, 4, 5, 8, 8, 4, 6],
            JS: [5, 4, 3, 7, 5, 6, 4, 7, 8, 4],
            Angular: [8, 5, 7, 5, 4, 8, 4, 6, 4, 9],
            React: [5, 7, 4, 5, 8, 4, 7, 5, 4, 8],
            Vue: [5, 7, 5, 6, 8, 6, 5, 6, 6, 5]
          }
        },
        {
          name: "Bhoodeo",
          skill: {
            HTML: [4, 5, 7, 3, 8, 3, 9, 6, 7, 8],
            CSS: [5, 3, 8, 6, 9, 3, 4, 7, 5, 9],
            JS: [6, 8, 4, 7, 9, 5, 7, 5, 4, 8],
            Angular: [5, 4, 7, 8, 6, 5, 4, 3, 7, 8],
            React: [5, 4, 3, 7, 4, 8, 6, 5, 8, 7],
            Vue: [5, 7, 6, 5, 4, 8, 6, 8, 6, 9]
          }
        }
      ];
    }
  }
};
</script>
<style lang="scss" scoped>
.progressHeader {
  text-align: center;
}
</style>