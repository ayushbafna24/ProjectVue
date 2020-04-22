<template>
  <div class="main">
    <h3>Welcome To Scheduler Component</h3>
    <div class="divPadding" id="dropDownDataDiv">
        <span>Select a user to schedule an event: </span>
        <dropdownlist
            :data-items="userList"
            :text-field="'name'"
            :data-item-key="'name'"
            :default-item="defaultItem"
            @change="onDropDownChange">
        </dropdownlist>
    </div>

    <div v-if="scheduleFlag" class="divPadding" id="schedulerDataDiv">
        <kendo-scheduler :data-source="localDataSource"
                        :date="date"
                        :height="500"
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
import user from '../user'

export default {
  name: 'Scheduler',
  data () {
      return {

            scheduleFlag: false,

            // Getting data from "user.json" file for user drop-down.
            userList:user,

            // Getting data from "schedule.json" file for Scheduler.
            localDataSource: [],

            resources: [],

            attendeesList: null,

            defaultItem: {
                name: 'Select User'
            },
            selectedUser: "",
            eventTemplate: '<div class="movie-template"><p>#: kendo.toString(start, "hh:mm") # - #: kendo.toString(end, "hh:mm") #</p> <h3>#: title #</h3></div>' ,

            date: new Date()
        }
    },
    methods: {

        /**
        *  Drop-Down onChange method
        **/
        onDropDownChange(event) {

            console.log('Received Value: '+ event.target.value.name);
            if(event.target.value.id != undefined) {
                this.selectedUser = event.target.value.name;
                this.$ApiService.findEventScheduleData(event.target.value.name).then (
                     response =>{
                         this.localDataSource = response;
                     }
                 );
                this.scheduleFlag = true;
                console.log("Received Data: ", this.localDataSource);
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
            console.log("Event Values: " + ev.event);

            let payload = {
                eventScheduleId: ev.event.eventScheduleId,
                title: ev.event.title,
                description: ev.event.description,
                start: ev.event.start,
                end: ev.event.end,
                user: this.selectedUser,
                attendees: ev.event.attendees
              }

            this.$ApiService.saveAndUpdateEventScheduleData(payload).then (
                 response => {
                   if(ev.event.eventScheduleId == response.eventScheduleId) {
                     var removeIndex = this.localDataSource.map(function(item) { return item.eventScheduleId; }).indexOf(response.eventScheduleId);
                     this.localDataSource.splice(removeIndex, 1);
                     this.localDataSource.push(response);
                   } else {
                     this.localDataSource.push(response);
                   }
                   console.log("Save/Edit EventScheule Response: ", response);
                   console.log("EventScheule Data: ", this.localDataSource);
                 }
             );

        },

        remove: function(event) {

            console.log(`Removing Event: ${event.event.title} for USER: ${event.event.user} and ID: ${event.event.eventScheduleId}`);

            this.$ApiService.deleteEventScheduleData(event.event.user, event.event.eventScheduleId).then (
                 response => {
                   console.log("Delete Response: ", response);

                   // Getting index of object with _id
                   var removeIndex = this.localDataSource.map(function(item) { return item.eventScheduleId; }).indexOf(response.eventScheduleId);

                   // Removing object based on index.
                   this.localDataSource.splice(removeIndex, 1);
                 }
             );

        },
        getAttendeesList() {
          this.$ApiService.findAttendees().then (
               response => {
                 console.log("Attendees Response: ", response);
                 this.attendeesList = response;
               }
           );
        }
    },
    created() {
      this.getAttendeesList();
    },
    mounted () {},
    beforeUpdate() {
      if(this.attendeesList) {
        console.log('attendeesList: ' + this.attendeesList);
        this.resources = [
            {
                field: "attendees", // The field of the Scheduler event which contains the resource identifier.
                title: "Attendees", // The label displayed in the Scheduler edit form for this resource.
                dataSource: this.attendeesList,
                multiple: true // Indicate that this is a multiple instance resource.
            }
        ]
    }
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
