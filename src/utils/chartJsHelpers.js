// imports
import { momentHelpers } from './momentHelpers.js';

export const chartJsHelpers = {
  intervalSeconds: 10,
  intervalList: [],
  events: [],
  nextTimeStamp: null,
  lastTimeStamp: null,
  // accepts an array of events
  // returns an array of interval objects with eventCount 0 [ { timestamp_start: 314324324234, eventCount: 0 } ]
  createIntervalListFromEvents: function () {
    this.intervalList = [];
    this.nextTimeStamp = this.events[0].timestamp;
    this.lastTimeStamp = this.events[this.events.length - 1].timestamp
    while (momentHelpers.momentLessThan(this.nextTimeStamp, this.lastTimeStamp)){
      this.createIntervalObject()
      this.nextTimeStamp = momentHelpers.momentAddSeconds(this.nextTimeStamp, this.intervalSeconds)
    }
    return this.formatIntervalDataForLineChart()
  },
  // accepts nextTimeStamp, events, intervalSeconds
  // return intervalObject with { timestamp_start: 314324324234, eventCount: 5 } 
  createIntervalObject: function(){
    const newInterval = {
      timestamp_start: momentHelpers.momentUnix(this.nextTimeStamp),
      eventCount: 0
    }
    // if event timestamp is within interval range then increase interval's event count
    this.events.forEach(event => { 
      if (momentHelpers.momentIntervalRange(event.timestamp, newInterval.timestamp_start, this.intervalSeconds)) {
        newInterval.eventCount += 1
      }
    })
    this.intervalList.push(newInterval)
  },
  // accepts an array of interval objects
  // returns an array of objects formattted for chartjs line chart { labels: [1232131, 213213, 23233], data: [1, 3, 4] }
  formatIntervalDataForLineChart: function(){
    console.log(this)
    return {
        labels: this.intervalList.map(interval=> momentHelpers.momentReadable(interval.timestamp_start)),
        data: this.intervalList.map(interval => interval.eventCount)
    }
  },
  // accepts an array of events 
  // returns an array of objects formatted for chartjs line chart { labels: [1232131, 213213, 23233], data: [1, 3, 4] }
  generateLineChartData: function(events){
    this.events = events
    console.log(this)
    return this.createIntervalListFromEvents();
  },
  // accepts an array of sessions
  // returns an array of objects formatted for chartjs scatter spot [ { x: 2332, y: 42323 } ]
  generatePlotChartData: (sessions) => {
    return sessions.map(session => {
      const xVal = momentHelpers.moment(session.max_ts).diff(momentHelpers.moment(session.min_ts), "seconds", true)
      return {
        y: session.count, 
        x: xVal >= 20000 ? 0 : xVal
      }
    })
  }
}