<template>
    <td style="display:flex">
        <button class="k-primary k-button k-grid-edit-command" @click="add()">
            +
        </button>
         <button class="k-primary k-button k-grid-edit-command" @click="sub()">
            -
        </button>
    </td>
</template>
<script>
    export default {
    data(){
        return{
            // defaultValue: this.dataItem.skill_value,
             maxValue:10,
             minValue:0
        }
    },
    props: {
        dataItem: Object,
    },
    methods: {
        
        sub() {
           if(this.dataItem.skill_value != this.minValue){
               this.dataItem.skill_value -=1;// decrement by 1
              // this.isUpdate = this.dataItem.skill_value == this.defaultValue ? false : true;
           }        
        },
        add() {
           if(this.dataItem.skill_value != this.maxValue){
               this.dataItem.skill_value +=1; // increment by 1
               //this.isUpdate = this.dataItem.skill_value == this.defaultValue ? false : true;
           }
        }
    }
}
</script>
