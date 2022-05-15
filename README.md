# REACT-NATIVE DEMO ON SHARED ELEMENTS
### Using Advanced React Native FlatList stack carousel animations at 60fps




## `Project Specifications`
To get an impression of how you are working with react-native we want you to spend some time to implement a simple app to show an overview and detail view of the assets currently hosted on timeless.investments.

`The endpoints to retrieve the data are:`

- https://api.timeless.investments/assets - returns all assets
- https://api.timeless.investments/assets/{ID} - the full dataset for the asset with the given ID
 - https://api.timeless.investments/assets/{ID}/details - a list of details specific to the asset with the given ID
<br/><br/><br/><br/>

## `Solution Detail`

 [Solution UI Inspiration](https://dribbble.com/shots/8257559-Movie-2-0)

In this Solution I created a stack carousel animation in React Native using FlatList, Animated API and FlingGestureHandler from react-native-gesture-handler package.

I'm also practiced what I call interconnected animations or reactive animations, where 2 different animations react to each other.

### In a summary, I did the following
- create a stack style carousel
- create a reactive animated value 
- scrolling animation and fetch new data
- create a flicker type animation when changing the active slide

<br/><br/><br/>
## `Screen Demo`
Product screen demo
![Demo](/src/assets/timelessDemo.jpg)
