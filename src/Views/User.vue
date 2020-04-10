<template>
    <div id="vueapp" class="vue-app main">
    <button @click="exportExcel" class="k-button">Export Excel</button>   
    <button @click="exportPDFWithComp" class="k-button">Export pdf</button>
    <div class="clearfix"></div> 
    <grid-pdf-export ref="gridPdfExport" :margin="'1cm'">
    <Grid ref="grid"
          :style="{height: '300px'}"
          :data-items="result"
          :pageable="true"
          :skip = "skip"
          :reorderable="true"
          :take="take"
          :total="total"
          :columns="columns"
          :sortable="true"
          :sort= "sort"
          :resizable="true"
          @columnreorder = "columnReorder"
          @sortchange= "sortChangeHandler"
          @pagechange= "pageChangeHandler" >
    </Grid>
    </grid-pdf-export>
</div>
</template>
<script>
import "@progress/kendo-theme-default/dist/all.css";
import { Grid } from "@progress/kendo-vue-grid";
import { saveExcel } from "@progress/kendo-vue-excel-export";
import { orderBy } from "@progress/kendo-data-query";
import { GridPdfExport } from "@progress/kendo-vue-pdf";
//import axios from "axios";
export default {
  data: function() {
    return {
      sort: [{ field: "id", dir: "asc" }],
      editID: null,
      skip: 0,
      take: 5,
      columns: [
        { field: "id", editable: false, title: "ID" },
        { field: "first_name", title: "First Name" },
        {
          field: "last_name",
          editor: "string",
          title: "Last Name",
          format: "{0:d}"
        },
        {
          title: "Skills",
          children: [
            { field: "html", title: "html" },
            { field: "vue", title: "vue" },
            { field: "react", title: "react" },
            { field: "js", title: "js" },
            { field: "jquery", title: "jquery" }
          ]
        }
      ],
      gridData: [],
      dataItems: [],
      excelData: []
    };
  },
  components: { Grid, GridPdfExport },
  mounted() {
    this.dataItems = [
      {
        id: "5e8c2900f8c528a0902c2d32",
        first_name: "Bhoodev",
        last_name: "Dubey",
        skills: "html: 5, vue: 5, js: 8,angular:5,vue:5,jquery:5,react:5 "
      },
      {
        id: "5e8c2900af159fc87056fe10",
        first_name: "sunakshi",
        last_name: "chagti",
        skills: "html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5 "
      },
      {
        id: "5e8c2900f68e91080f45ced8",
        first_name: "Danish",
        last_name: "Arora",
        skills: "html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5 "
      },
      {
        id: "5e8c2900f20bd592d65c9511",
        first_name: "Rajesh",
        last_name: "Roshan",
        skills: "html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5 "
      },
      {
        id: "5e8c2900a015a3591a357240",
        first_name: "sujit",
        last_name: "kumar",
        skills: "[html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5] "
      },
      {
        id: "5e8c2900f769b5a28004a4b6",
        first_name: "Ayush",
        last_name: "Bafna",
        skills: "[html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5] "
      },
      {
        id: "5e8c2900fc6f0607f5be0684",
        first_name: "shrasti",
        last_name: "gupta",
        skills: "[html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5] "
      },
      {
        id: "5e8c290015cb11fc78c83586",
        first_name: "Arjun",
        last_name: "Rawal",
        skills: "[html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5] "
      }
    ];
    this.gridData = this.dataItems;
    // info.data
    // axios
    //   .get("https://skilldata.free.beeceptor.com/getskills")
    //   .then(response => {
    //     let info = response;
    //     this.gridData = info.data;
    //     console.log("infoinfoinfo", info.data);
    //   });
  },
  computed: {
    result: {
      get: function() {
        let record = orderBy(this.gridData, this.sort);
        record.forEach(function(item, index) {
          item.id = index + 1;
          let skills = item.skills.replace("[", "");
          skills = skills.replace("]", "");
          item.skills = skills;
          let skillContainer = skills.split(",");
          for (let skill of skillContainer) {
            let elememt = skill.split(":");
            item[elememt[0].trim()] = elememt[1];
          }
        });
        console.log('record',record);
        return record;
      }
    },
    total() {
      return this.gridData ? this.gridData.length : 0;
    }
  },
  methods: {
    columnReorder: function(options) {
      this.columns = options.columns;
    },
    exportPDFWithComp: function() {
      this.$refs.gridPdfExport.save(orderBy(this.gridData, this.sort));
    },
    pageChangeHandler: function(event) {
      this.skip = event.page.skip;
      this.take = event.page.take;
    },
    sortChangeHandler: function(e) {
      this.sort = e.sort;
    },
    exportExcel() {
      saveExcel({
        data: orderBy(this.gridData, this.sort),
        fileName: "userData",
        columns: this.columns
      });
    }
  }
};
</script>
<style type="text/scss">
.k-button {
  float: right;
  margin: 10px;
}
.clearfix {
  clear: both;
}
</style>