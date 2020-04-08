<template>
  <div id="mainDataDiv">
    <h3>Welcome To Scheduler2 Component</h3>

    <div v-if="showSchedular" class="divPadding" id="schedulerDataDiv">
        <kendo-scheduler :data-source="localDataSource"
                        :date="date"
                        :height="500"
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

export default {
  name: 'Scheduler2',
  data () {
      return {
        showSchedular: false,
        date: new Date(),

        // Dummy data for Scheduler.
        localDataSource: null,
        resources: [],
        // resources: [
        //         {
        //             field: "attendees", // The field of the Scheduler event which contains the resource identifier.
        //             title: "Attendees", // The label displayed in the Scheduler edit form for this resource.
        //             dataSource: [
        //                 {
        //                     text: "Alex", // Text of the resource instance.
        //                     value: 1, // The identifier of the resource instance. Use that value to assign an event to this instance.
        //                     color: "#ef701d" // Used as the background of events assigned to this resource.
        //                 },
        //                 { text: "Bob", value: 2, color: "#5fb1f7" },
        //                 { text: "Charlie", value: 3, color: "#35a964" }
        //             ],
        //             multiple: true // Indicate that this is a multiple instance resource.
        //         }
        //     ]
        }
    },
    methods: {

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
            var startDate = this.createDate(new Date(ev.event.start));
            var endDate = this.createDate(new Date(ev.event.end));
            var attendees = [];
            for(var users = 0; users<ev.event.attendees.length; users++){
                attendees.push(ev.event.attendees[users])
            }
            var meeting = 
            {
                "id": new Date().getUTCMilliseconds(),
                "start": startDate,
                "end": endDate,
                "title": ev.event.title,
                attendees: attendees
            }
            if(!localStorage.getItem("schedularData")){
                localStorage.setItem("schedularData", []);
            }
            var schedularData = localStorage.getItem("schedularData");
            var array
            if(schedularData.length === 0){
                array = [];
                array.push(meeting);
                array = JSON.stringify(array);
                localStorage.setItem("schedularData", array);
            }else{
                array = JSON.parse(localStorage.getItem("schedularData"));
                var index = array.findIndex(function(meeting){
                    return meeting.id === ev.event.id
                })
                if(index > -1){
                    array.splice(index,1);
                    array.push(meeting);
                    array = JSON.stringify(array);
                    localStorage.setItem("schedularData", array);
                    return;
                }
                array.push(meeting);
                array = JSON.stringify(array);
                localStorage.setItem("schedularData", array);
            }
            // console.log("Title: " + ev.event.title);
            // console.log("Description: " + ev.event.description);
            // console.log("Start Time: " + ev.event.start);
            // console.log("End Time: " + ev.event.end);
        },
        remove: function(ev) {
            var array = JSON.parse(localStorage.getItem("schedularData"));
            var index = array.findIndex(function(meeting){
                return meeting.id === ev.event.id
            })
            if(index > -1){
                array.splice(index,1);
                array = JSON.stringify(array);
                localStorage.setItem("schedularData", array);
            }
        },
        createDate: function(date){
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var year = date.getFullYear();
            var month = date.getMonth()+1;
            var currentDate = date.getDate();
            // var ampm = hours >= 12 ? 'PM' : 'AM';
            // hours = hours % 12;
            // hours = hours ? hours : 12; // the hour '0' should be '12'
            // minutes = minutes < 10 ? '0'+minutes : minutes;
            var strDate = year+'/'+month+'/'+currentDate+' '+hours + ':' + minutes;
            return strDate;
        }
    },
    mounted () {
        if(localStorage.getItem("schedularData") && JSON.parse(localStorage.getItem("schedularData")).length > 0){
            this.localDataSource = JSON.parse(localStorage.getItem("schedularData"))
        }

        var userList = JSON.parse(localStorage.getItem("userList"));
        // var userList = [
        //                 {
        //                     text: "Ayush", // Text of the resource instance.
        //                     value: 1, // The identifier of the resource instance. Use that value to assign an event to this instance.
        //                     color: "#ef701d" // Used as the background of events assigned to this resource.
        //                 },
        //                 { text: "Bhoodeo", value: 2, color: "#5fb1f7" },
        //                 { text: "Sujit", value: 3, color: "#35a964" },
        //                 { text: "Danish", value: 4, color: "#35a964" },
        //                 { text: "Sunakshi", value: 5, color: "#35a964" },
        //                 { text: "Srashti", value: 6, color: "#35a964" },
        //                 { text: "Rajesh", value: 7, color: "#35a964" },
        //                 { text: "Arjun", value: 8, color: "#35a964" },
        //             ]

        this.resources = [
                {
                    field: "attendees", // The field of the Scheduler event which contains the resource identifier.
                    title: "Attendees", // The label displayed in the Scheduler edit form for this resource.
                    dataSource: userList,
                    multiple: true // Indicate that this is a multiple instance resource.
                }
            ]

        this.showSchedular = true;
        // this.localDataSource = [
        //     {
        //         "id": 1,
        //         "start": "2020/4/9 06:00",
        //         "end": "2020/4/9 09:00",
        //         "title": "POC Event"
        //     },
        //     {
        //         "id": 2,
        //         "start": "2020/4/7 13:00",
        //         "end": "2020/4/7 15:00",
        //         "title": "Internal Meeting"
        //     }
        // ]
        // axios
        // .get(this.baseURL + 'getskills')
        // .then(response => (this.userList = response["data"]));
    }
}
</script>