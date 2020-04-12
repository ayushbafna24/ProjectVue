<template>
    <div id="vueapp" class="vue-app main">
    <button @click="exportExcel" class="k-button">Export Excel</button>   
    <button @click= "exportPDFWithComp" class="k-button">Export pdf</button>
    <div class="clearfix"></div> 
    <grid-pdf-export ref="gridPdfExport" :margin="'1cm'">
    <Grid ref="grid"
          :data-items= "result"
          :pageable=  "pageable"
          :skip = "skip"
          :reorderable="true"
          :take= "take"
          :total= "total"
          :columns= "columns"
          :sortable= "true"
          :sort= "sort"
          :resizable="true"
          :page-size="pageSize"
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
//import userList from "../user.json";
import axios from "axios";
export default {
  data: function() {
    return {
      sort: [{ field: "id", dir: "asc" }], // By default sorting id
      editID: null,
      skip: 0,
      take: 5,
      pageSize: 5,
      pageable: {
        buttonCount: 5,
        info: true,
        type: "numeric",
        pageSizes: true,
        previousNext: true
      },
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
            { field: "HTML", title: "HTML" },
            { field: "VUE", title: "VUE" },
            { field: "REACT", title: "REACT" },
            { field: "JS", title: "JS" },
            { field: "JQUERY", title: "JQUERY" },
            { field: "NODEJS", title: "NODEJS" },
            { field: "ANGULAR", title: "ANGULAR" }
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
    // info.data
    axios
      .get("https://skilldata.free.beeceptor.com/getskills")
      .then(response => {
        let info = response;
        this.gridData = info.data;
      });
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
        return record.slice(this.skip, this.take + this.skip);
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
th a {
  text-align: center;
}
</style>