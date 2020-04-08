<template>
  <div class="main">
    <h3>Welcome To Scheduler Component</h3>
    <div class="divPadding" id="dropDownDataDiv">
        <span>Select a user to schedule an event: </span>
        <dropdownlist
            :data-items="userList"
            :text-field="'first_name'"
            :data-item-key="'id'"
            :default-item="defaultItem"
            @change="onDropDownChange">
        </dropdownlist>
    </div>

    <div v-if="scheduleFlag" class="divPadding" id="schedulerDataDiv">
        <kendo-scheduler :data-source="localDataSource"
                        :date="date"
                        :height="500"
                        :timezone="'Etc/UTC'"
                        :event-template="eventTemplate"
                        @edit="onEdit"
                        @add="onAdd"
                        @cancel="onCancel"
                        @save="onSave"
                        @remove="remove">
        <kendo-scheduler-view :type="'day'"></kendo-scheduler-view>
        <kendo-scheduler-view :type="'workWeek'" :selected="true"></kendo-scheduler-view>
        <kendo-scheduler-view :type="'week'"></kendo-scheduler-view>
        <kendo-scheduler-view :type="'month'"></kendo-scheduler-view>
        <kendo-scheduler-view :type="'agenda'"></kendo-scheduler-view>
        </kendo-scheduler>
    </div>
  </div>
</template>

<script>

// Open this import statement to consume any API.
//import axios from "axios";

export default {
  name: 'Scheduler',
  data () {
      return {
        //baseURL: 'https://demoapis.free.beeceptor.com/',
        scheduleFlag: false,

        // Dummy data for user drop-down.
        userList: [
        {
            "id": "5e8c2900f8c528a0902c2d32",
            "first_name": "Bhoodev",
            "last_name": "Dubey",
            "skills": "[html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5] "
        },
        {
            "id": "5e8c2900af159fc87056fe10",
            "first_name": "sunakshi",
            "last_name": "chagti",
            "skills": "[html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5] "
        },
        {
            "id": "5e8c2900f68e91080f45ced8",
            "first_name": "Danish",
            "last_name": "Arora",
            "skills": "[html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5] "
        },
        {
            "id": "5e8c2900f20bd592d65c9511",
            "first_name": "Rajesh",
            "last_name": "Roshan",
            "skills": "[html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5] "
        },
        {
            "id": "5e8c2900a015a3591a357240",
            "first_name": "sujit",
            "last_name": "kumar",
            "skills": "[html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5] "
        },
        {
            "id": "5e8c2900f769b5a28004a4b6",
            "first_name": "Ayush",
            "last_name": "Bafna",
            "skills": "[html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5] "
        },
        {
            "id": "5e8c2900fc6f0607f5be0684",
            "first_name": "shrasti",
            "last_name": "gupta",
            "skills": "[html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5] "
        },
        {
            "id": "5e8c290015cb11fc78c83586",
            "first_name": "Arjun",
            "last_name": "Rawal",
            "skills": "[html: 5, vue: 5, js: 5,angular:5,vue:5,jquery:5,react:5] "
        }
        ],
        defaultItem: { 
            first_name: 'Select User'
        },
        firstName: "",
        eventTemplate: '<div class="movie-template"><p>#: kendo.toString(start, "hh:mm") # - #: kendo.toString(end, "hh:mm") #</p> <h3>#: title #</h3></div>' ,
        allDayEvenTemplate: "allDayEvenTemplate",
        dateHeaderTemplate: "dateHeaderTemplate",
        groupHeaderTemplate: "groupHeaderTemplate",
        majorTimeHeaderTemplate: "majorTimeHeaderTemplate",
        minorTimeHeaderTemplate: "minorTimeHeaderTemplate",
        date: new Date(),

        // Dummy data for Scheduler.
        localDataSource: [
        {
            "id": 1,
            "start": "2020/4/9 06:00 AM",
            "end": "2020/4/9 09:00 AM",
            "title": "POC Event"
        },
        {
            "id": 2,
            "start": "2020/4/7 08:00 AM",
            "end": "2020/4/7 09:00 AM",
            "title": "Internal Meeting"
        }
        ]
        }
    },
    methods: {
        
        /**
        *  Drop-Down onChange method
        **/
        onDropDownChange(event) {
            console.log('Received Value: '+ event.target.value.id);
            if(event.target.value.id != undefined) {

                // Open this commented code to fetch the schedule data from API based on user-id.

                // axios.get(this.baseURL + 'getschedule?id=' + event.target.value.id)
                // .then(response => (this.localDataSource = response["data"]));
                this.scheduleFlag = true;
            } else {
                this.scheduleFlag = false;
            }
        },

        onEdit: function (ev) {
            console.log("Event :: edit: " + ev.event.title);
        },
        onAdd: function (ev) {
            console.log("Event :: add: " + ev.event.title);
        },
        onCancel: function (ev) {
            console.log("Event :: cancel: " + ev.event.title);
        },
        onSave: function (ev) {
            console.log("Title: " + ev.event.title);
            console.log("Description: " + ev.event.description);
            console.log("Start Time: " + ev.event.start);
            console.log("End Time: " + ev.event.end);

            // Open this commented code to call the API for persisting the Schedule data.

            // let payload = [{title: ev.event.title,
            //     description: ev.event.description,
            //     start: ev.event.start,
            //     end: ev.event.end}]

            // axios.post('https://demoapiss.free.beeceptor.com/addschedule', payload)
            // .then(response => (this.localDataSource = response["data"]))

        },
        remove: function(ev) {
            console.log("Removing", ev.event.title);
        }
    }

    // Open this commented code to fetch the user drop-down data from API.
    // ,
    // mounted () {
    //     axios
    //     .get(this.baseURL + 'getskills')
    //     .then(response => (this.userList = response["data"]));
    // }
}
</script>
<style scoped>
  .divPadding {
    padding-top: 1em;
  }

    span {
    font-size: 18 px;
  }
</style>