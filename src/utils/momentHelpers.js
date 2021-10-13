// imports
import moment from 'moment';

// momentHelpers object
export const momentHelpers = {
  // accepts timestamp
  // returns timestamp formatted "March 20th 2017, 1:38:48 pm"
  momentReadable (timestamp) {
    return this.moment(timestamp).format('MMMM Do YYYY, h:mm:ss a');
  },
  // accepts timestamp and amount of seconds
  // returns moment object of timestamp with additional seconds
  momentAddSeconds: function (timestamp, seconds) {
    return this.moment(timestamp).add(seconds, 'seconds')
  },
  // compares if firstTimestamp is less than second
  momentLessThan: function (firstTimestamp, secondTimestamp) {
    return this.moment(firstTimestamp) < this.moment(secondTimestamp)
  },
  // compares if targetTime is between startTime and interval in seconds
  momentIntervalRange: function (targetTime, startTime, intervalSeconds) {
    const endTime = this.momentUnix(this.momentAddSeconds(startTime, intervalSeconds - 1))
    return targetTime >= startTime && targetTime <= endTime
  },
  // accepts timestamp
  // returns timestamp formatted unix
  momentUnix: function (timestamp) {
    return this.moment(timestamp).valueOf()
  },
  // accepts timestamp
  // returns moment object of timestamp
  moment: function (timestamp) {
    return moment(timestamp);
  },
}
