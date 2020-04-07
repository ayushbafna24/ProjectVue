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
  data() {
    return {
      value: {}
    };
  },
  props: {
    skillData: {
      type: Array,
      required: false
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