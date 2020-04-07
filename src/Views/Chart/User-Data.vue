<template>
    <div class="user-data-wrapper">
        <h5>{{data.name}}</h5>
        <div>
             <kendo-chart ref="chart" class="chart"
                 :legend-visible="false"
                 :series-defaults-labels-background="'transparent'"
                 :series="series"
                 :tooltip-visible="true">
            </kendo-chart>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            required:false,
        }
    },
    data(){
        return{
            series: [{
                type: 'pie',
                data: this.data.values
            }]
        }
    },
    mounted(){
        console.log(this.data.values);
        this.$forceUpdate();
    }
}
</script>
<style scoped>
    .user-data-wrapper{
        width: 150px;
        border: 1px solid gray;
        margin: 6px;
        /* border-radius: 80% ; */
        
    }
    .chart{
        height: 150px;
    }
   
</style>