# MetaCog Interview

Michael Finneran

## The Assignment

- Use the DataRequest calls defined in the swagger definition to provide a session list and visualizations that includes a line graph of the number of events in a session at 10-second intervals and a scatter plot of the total number of events in a session vs the session duration in seconds for all sessions in a data request.  Please feel free to include additional visualizations that demonstrate abilities you would like to share with us. 
- Your solution should make use of Vue, promises, async libraries and whatever other technologies you wish to demonstrate to us. 
- Your solution should be made available in a github repo that we can access and that includes a README.md giving us clear instructions on how to run your solution so that we can evaluate it.  Your repo can fork the CandidateSandbox starting point if you like. 

### Resources 

- Publisher_ID: <secret> 
- DataRequest_ID: <secret>
- pplication_ID (access key): <secret>
- Swagger API definition: https://sandbox.testapi.metacog.com/sandbox 
- Github starting point repo: https://github.com/metacog-com/CandidateSandbox 

## The Application

![Screen Shot 2021-10-13 at 5 00 18 AM](https://user-images.githubusercontent.com/67082944/137118527-31c17f8a-4095-49a3-80c5-96eb2a973fde.png)

![Screen Shot 2021-10-13 at 5 00 43 AM](https://user-images.githubusercontent.com/67082944/137118309-bd4b8f9c-9757-481e-b20a-455e632b3135.png)
   
### Dependencies
- [Vue](https://vuejs.org) - javascript framework
- [Tailwind](https://tailwindcss.com/) - css framework
- [Tailwind Headless UI](https://github.com/tailwindlabs/headlessui) - tailwind styled vue componenets
- [Postcss](https://github.com/postcss/postcss) - transform css with javascript, dependency of Tailwind
- [Moment.js](http://momentjs.com/) - javascript data/time library
- [Chart.js](https://www.chartjs.org/) - javascript charting library

### Folder Structure 
```
- src/
   |____assets/
          |_____styles/index.css

   |____components/
          |_____EventChart.vue
          |_____Nav.vue
          |_____Pagination.vue
          |_____SessionChart.vue
          |_____Sessions.vue

   |____lang/
          |_____en/messages.js

   |____services/
          |_____metaCogApi.js

   |____utils/
          |_____chartJsHelpers.js
          |_____momentHelpers.js

```
   
### .env

You will need to add a `.env` file to the root of this repository with the following keys and replace `placeholder` with valid values.
```
VUE_APP_META_COG_API_TOKEN=placeholder
VUE_APP_META_COG_APPLICATION_ID=placeholder
VUE_APP_META_COG_PUBLISHER_ID=placeholder
```

### Project setup
```
yarn install
```

#### Compiles and hot-reloads for development
```
yarn serve
```

#### Compiles and minifies for production
```
yarn build
```

#### Lints and fixes files
```
yarn lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Notes

### Problems to Look Forward To
- `createIntervalListFromEvents` loops through all the events to create the interval groups.  Then `createIntervalObject` loops through the events one more time and each interval group along to tally the events in each interval group. 
- Sessions with only 1 event do not show the event on line graph
- Chart JS helper could be made into a class 
- There are no code tests
- The markers could be more informative on both graphs and titles could be more pronounced
- Navigation dropdown is only so responsive and could highlight selected session

### Features to Look Forward To

- Clicking on a session on the plot graph could remove outliars or display events graph
- User could increase/decrease how many events to include instead of 1,000 max
- User could drag a bar to change duration of interval groups
- User could see a calendar heat map of events

### Highlights
- Really enjoyed digging through the API docs and the data structures.  Documentation was great!
- Vue is going to surpass React as my favorite front end framework within a few months
- Had only done a few basic visualizations with Chart.js.  I found it great to work with.  There are a lot of great features that could really tell a story with data.
- Tailwind CSS took some poking around due to all the class names but I loved the docs and even some of the humor in there.  The componenents were straight forward to leverage and it's easy to see how after just a few projects with Tailwind that you'd be able to move very quickly. 
