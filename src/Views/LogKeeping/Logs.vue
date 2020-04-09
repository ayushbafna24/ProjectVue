<template>
    <div>
        <div class="drop-down right-align">
            <dropdownlist
                :data-items="skillDropDownMenu"
                :text-field="'name'"
                :data-item-key="'id'"
                :default-item="defaultItem"
                @change="onDropDownChange">
        </dropdownlist>
        </div>
    </div>
</template>

<script>
import user from '../.././user'

export default {
    data(){
        return {
            defaultItem: { 
                name: 'Select User'
            },
            skillDropDownMenu:user,
        }
    },
    mounted(){},
    components:{},
    methods: {

        /**
        *  Drop-Down onChange method
        **/
        onDropDownChange(event) {
            console.log('Received Value: '+ event.target.value.id);
        }
    }
};
</script>

<style scoped>
    .right-align {
        text-align: right;
    }
</style>
