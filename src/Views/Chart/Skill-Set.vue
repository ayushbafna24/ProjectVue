<template>
    <div>
         <!-- <kendo-menu>
        <kendo-menu-item text="Skills">
            <kendo-menu-item :text="skill" v-for="skill in skillData" :key="skill"></kendo-menu-item>
        </kendo-menu-item>
    </kendo-menu> -->
    <dropdownlist
                :data-items="skillData"
                :text-field="'text'"
                :data-item-key="'id'"
                :value="value"
                @change="handleChange"
            >
            </dropdownlist>
 
    </div>
</template>

<script>
export default {
<<<<<<< HEAD
    props:{
        data:{
            type:Array,
            required:true,
        }
=======
  data() {
    return {
      value: {}
    };
  },
  props: {
    skillData: {
      type: Array,
      required: true
>>>>>>> de5555a5beec73494b999771748cf6a11463e7a2
    }
  },
  methods: {
    handleChange(event) {
      this.value = event.value;
    }
  },
  mounted() {
    this.value = { text: "HTML", id: 1 };
  }
};
</script>