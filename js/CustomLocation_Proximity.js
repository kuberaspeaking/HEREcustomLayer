/**
 * Boilerplate map initialization code starts below:
 */
var radius = 4000; // in meters
var circleCenter = {lat:52.49994 , lng:13.35339};
// set up containers for the map  + panel
var mapContainer = document.getElementById('map1');
  // routeInstructionsContainer = document.getElementById('panel');

//Step 1: initialize communication with the platform
let M1 = {
  'Init': { // developer.here.com for app_id and app_code
      "app_id":   window.app_id,
      "app_code": window.app_code,
      "useHTTPS": true
  }
};

var platform = new H.service.Platform(M1.Init);

var defaultLayers = platform.createDefaultLayers();

// Set center of the map
var mapcenter= {lat:52.51607, lng:13.37698};

//Step 2: initialize a map - this map is centered over Berlin
var map1 = new H.Map(mapContainer,
  defaultLayers.normal.map,{
  center: mapcenter,
  zoom: 13
});
//Step 3: make the map interactive

// map.setBaseLayer(defaultLayers.normal.terrain);
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map1));

// Create the default UI components
var ui = H.ui.UI.createDefault(map1, defaultLayers);

 // Create a style object:
var customStyle = {
  strokeColor: 'blue',
  fillColor: 'rgba(255, 255, 255, 0.5)'
  };


var circle = new H.map.Circle(circleCenter, radius,{style: customStyle});
map1.addObject(circle);

map1.setViewBounds(circle.getBounds());  
  
getnearestCustomLocation();

function getnearestCustomLocation(){
  var str = ""; 
  var url = "https://cle.api.here.com/2/search/proximity.json";

  url= addURLParam(url, "app_id", window.app_id);
  url= addURLParam(url, "app_code", window.app_code);
  url= addURLParam(url, "proximity", (str.concat(circleCenter.lat,',',circleCenter.lng,',',radius)));
  url= addURLParam(url, "layer_ids", "	REST_TO_TRY");
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() 
  {
   if (this.readyState == 4 && this.status == 200) 
    {
      var myArr = JSON.parse(this.responseText);
      // console.log(this.responseText.length);
      for (i=0; i < this.responseText.length; i++)
      {
        newpos= {lat: myArr.geometries[i].nearestLat, lng: myArr.geometries[i].nearestLon};
        var wh_icon = new H.map.Icon("img/warehouse.png");
        wh_marker = new H.map.Marker(newpos,{icon:wh_icon});
        map1.addObject(wh_marker);
      }    
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function addURLParam(url, name, value){
  url += (url.indexOf("?") == -1 ? "?" : "&");
  url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
  return url; 
}


