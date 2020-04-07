<template>
    <div id="vueapp" class="vue-app">
    <Grid ref="grid"
          :style="{height: '320px'}"
          :data-items="getData"
          :columns="columns">
    </Grid>
</div>
</template>
<script>

import '@progress/kendo-theme-default/dist/all.css'
import { Grid } from '@progress/kendo-vue-grid';
export default {
    data: function() {
      return {
            editID: null,
            columns: [
                { field: 'id', editable: false, title: 'ID', width: '50px' },
                { field: 'first_name', title: 'First Name' },
                { field: 'last_name', editor: 'date', title: 'Last Name', format: '{0:d}' },
                { field: 'skills', title: 'Skills',  width: '150px', editor: 'numeric' }
            ],
            gridData: [{
                "id": 1,
                "first_name": "Bhoodeo",
                "last_name": "Dubey",
                "skills": 'Node: 6, JavaScript:7, CSS: 7'
            },{
                "id": 2,
                "first_name": "Ayush",
                "last_name": "Bafna",
                "skills": 'HTML: 5, JavaScript:7, CSS: 7'
            },{
                "id": 3,
                "first_name": "Danish",
                "last_name": "Arora",
                "skills": 'HTML: 5, JavaScript:7, CSS: 7'
            }]
        };
    },
     components: {Grid},
    computed: {
        getData() {
            let gridData = this.gridData;
                console.log("gridData", gridData);
                return gridData;
        }
    },
    methods: {
        
    } 
}
</script>