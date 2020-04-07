<template>
    <div>
         <kendo-menu>
        <kendo-menu-item text="Baseball">
            <kendo-menu-item :text="skill" v-for="skill in data" :key="skill"></kendo-menu-item>
        </kendo-menu-item>
    </kendo-menu>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            required:true,
        }
    }
}
</script>