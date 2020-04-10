<template>
  <div class="main">
    <h3>Welcome To Scheduler Component</h3>
    <div class="divPadding" id="dropDownDataDiv">
        <span>Select a user to schedule an event: </span>
        <dropdownlist
            :data-items="userList"
            :text-field="'name'"
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
                        :resources="resources"
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

import user from '../user'
import attendees from '../attendees'
import scheduleData from '../schedule'

export default {
  name: 'Scheduler',
  data () {
      return {
            //baseURL: 'https://demoapis.free.beeceptor.com/',
            scheduleFlag: false,

            // Getting data from "user.json" file for user drop-down.
            userList:user,

            // Getting data from "schedule.json" file for Scheduler.
            localDataSource: scheduleData,

            resources: [],

            defaultItem: { 
                name: 'Select User'
            },
            firstName: "",
            eventTemplate: '<div class="movie-template"><p>#: kendo.toString(start, "hh:mm") # - #: kendo.toString(end, "hh:mm") #</p> <h3>#: title #</h3></div>' ,
            allDayEvenTemplate: "allDayEvenTemplate",
            dateHeaderTemplate: "dateHeaderTemplate",
            groupHeaderTemplate: "groupHeaderTemplate",
            majorTimeHeaderTemplate: "majorTimeHeaderTemplate",
            minorTimeHeaderTemplate: "minorTimeHeaderTemplate",
            date: new Date()
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

            /*let payload = [{title: ev.event.title,
                description: ev.event.description,
                start: ev.event.start,
                end: ev.event.end}]

            axios.post('https://demoapiss.free.beeceptor.com/addschedule', payload)
            .then(response => (this.localDataSource = response["data"]))*/

        },
        remove: function(ev) {
            console.log("Removing", ev.event.title);
        }
    }

    // Open this commented code to fetch the user drop-down data from API.
    ,
    mounted () {
        /*axios
        .get(this.baseURL + 'getskills')
        .then(response => (this.userList = response["data"]));*/
        console.log(attendees);
        this.resources = [
            {
                field: "attendees", // The field of the Scheduler event which contains the resource identifier.
                title: "Attendees", // The label displayed in the Scheduler edit form for this resource.
                dataSource: attendees,
                multiple: true // Indicate that this is a multiple instance resource.
            }
        ]
    }
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