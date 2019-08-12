/**
 * Boilerplate map initialization code starts below:
 */

// set up containers for the map  + panel
var mapContainer = document.getElementById('map');
  // routeInstructionsContainer = document.getElementById('panel');

//Step 1: initialize communication with the platform
let M = {
  'Init': { // developer.here.com for app_id and app_code
      "app_id":   window.app_id,
      "app_code": window.app_code,
      // "api_key" : window.api_key,
      "useHTTPS": true
  }
};

var platform = new H.service.Platform(M.Init);

var defaultLayers = platform.createDefaultLayers();
// Set center of the map
var mapcenter= {lat:52.51607, lng:13.37698};

//Step 2: initialize a map - this map is centered over Berlin
var map = new H.Map(mapContainer,
  defaultLayers.normal.map,{
  center: mapcenter,
  zoom: 13
});
//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

var getCustomLocationService = platform.getCustomLocationService();
  //Display layer as a Tile 
 // create tile provider and layer that displays CLE layer

var R_icon = new H.map.Icon('img/warehouse.png');
var layer_provider = new mapsjs.service.extension.customLocation.TileProvider(getCustomLocationService, 
  {
  layerId: 'REST_TO_TRY'
  }, 
  {
  resultType: mapsjs.service.extension.TileProvider.ResultType.MARKER 
  });
var rest_LAYER = new mapsjs.map.layer.MarkerTileLayer(layer_provider);
map.addLayer(rest_LAYER);


