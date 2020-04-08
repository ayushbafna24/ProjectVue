<template>
    <div id="vueapp" class="vue-app main">
    <button @click="exportExcel" class="k-button">Export Excel</button>    
    <Grid ref="grid"
          :style="{height: '300px'}"
          :data-items="result"
          :pageable="true"
          :skip = "skip"
          :take="take"
          :total="total"
          :columns="columns"
          :sortable="true"
          :sort= "sort"
          @sortchange="sortChangeHandler"
          @pagechange="pageChangeHandler" >
    </Grid>
</div>
</template>
<script>
import "@progress/kendo-theme-default/dist/all.css";
import { Grid } from "@progress/kendo-vue-grid";
import { saveExcel } from "@progress/kendo-vue-excel-export";
import { orderBy } from "@progress/kendo-data-query";
import axios from "axios";
export default {
  data: function() {
    return {
      sort: [{ field: "first_name", dir: "asc" }],
      editID: null,
      skip: 0,
      take: 5,
      columns: [
        { field: "id", editable: false, title: "ID", width: "50px" },
        { field: "first_name", title: "First Name", width: "250px" },
        {
          field: "last_name",
          editor: "date",
          title: "Last Name",
          format: "{0:d}",
          width: "250px"
        },
        { field: "skills", title: "Skills", editor: "numeric" }
      ],
      gridData: [],
      dataItems: []
    };
  },
  components: { Grid },
  mounted() {
    // this.dataItems = [
    //   {
    //     id: "5e8c2900f8c528a0902c2d32",
    //     first_name: "Bhoodev",
    //     last_name: "Dubey",
    //     skills: "html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5 "
    //   },
    //   {
    //     id: "5e8c2900af159fc87056fe10",
    //     first_name: "sunakshi",
    //     last_name: "chagti",
    //     skills: "html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5 "
    //   },
    //   {
    //     id: "5e8c2900f68e91080f45ced8",
    //     first_name: "Danish",
    //     last_name: "Arora",
    //     skills: "html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5 "
    //   },
    //   {
    //     id: "5e8c2900f20bd592d65c9511",
    //     first_name: "Rajesh",
    //     last_name: "Roshan",
    //     skills: "html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5 "
    //   },
    //   {
    //     id: "5e8c2900a015a3591a357240",
    //     first_name: "sujit",
    //     last_name: "kumar",
    //     skills: "[html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5] "
    //   },
    //   {
    //     id: "5e8c2900f769b5a28004a4b6",
    //     first_name: "Ayush",
    //     last_name: "Bafna",
    //     skills: "[html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5] "
    //   },
    //   {
    //     id: "5e8c2900fc6f0607f5be0684",
    //     first_name: "shrasti",
    //     last_name: "gupta",
    //     skills: "[html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5] "
    //   },
    //   {
    //     id: "5e8c290015cb11fc78c83586",
    //     first_name: "Arjun",
    //     last_name: "Rawal",
    //     skills: "[html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5] "
    //   }
    // ];
    // this.gridData = this.dataItems;
    // info.data
    axios
      .get("https://skilldata.free.beeceptor.com/getskills")
      .then(response => {
        let info = response;
        this.gridData = info.data;
        console.log("infoinfoinfo", info.data);
      });
  },
  computed: {
    result: {
      get: function() {
        let record = orderBy(this.gridData, this.sort).slice(
          this.skip,
          this.take + this.skip
        );
        record.forEach(function(item, index) {
          item.id = index + 1;
          console.log("itemitem", JSON.stringify(item.skills));
          let skills = item.skills.replace("[", "");
          skills = skills.replace("]", "");
          item.skills = skills;
        });
        return record;
      }
    },
    total() {
      return this.gridData ? this.gridData.length : 0;
    }
  },
  methods: {
    pageChangeHandler: function(event) {
      console.log("event.page", event.page);
      this.skip = event.page.skip;
      this.take = event.page.take;
    },
    sortChangeHandler: function(e) {
      console.log("eeee", e);
      this.sort = e.sort;
    },
    exportExcel() {
      saveExcel({
        data: this.gridData,
        fileName: "userData",
        columns: this.columns
      });
    }
  }
};
</script>