import axios from "axios";
const baseURL = 'http://localhost:3000';

export const ApiService = {

    getUserList() {
        return axios.
        get(baseURL + '/api/users')
        .then(response => {
            return response.data; // return list of users.
        })
        .catch(error => console.log(error));
    },
    updateUser(user) {
      return axios.
      put(baseURL + '/api/users/'+user._id,user)
      .then(response => {
          return response.data; // return list of users.
      })
      .catch(error => console.log(error));
  },

    findEventScheduleData(selectedUser) {
      console.log("findEventScheduleData");
      return axios.get(baseURL + '/api/eventschedule?user=' + selectedUser)
      .then(response => {
        return response.data;
      })
      .catch(error => console.log(error));
    },

    saveAndUpdateEventScheduleData(payload) {
      console.log("saveAndUpdateEventScheduleData");
      return axios.post(baseURL + '/api/eventschedule', payload)
      .then(response => {
        return response.data;
      })
      .catch(error => console.log(error));
    },

    deleteEventScheduleData(user, eventScheduleId) {
      console.log("deleteEventScheduleData");
      return axios.delete(baseURL + '/api/eventschedule?user=' + user + '&eventScheduleId=' + eventScheduleId)
      .then(response => {
        return response.data;
      })
      .catch(error => console.log(error));
    },

    findAttendees() {
        console.log("findAttendees")
        return axios.get(baseURL + '/api/attendees')
        .then(response => {
            return response.data;
        })
        .catch(error => console.log(error));
    }
}
console.log(ApiService);