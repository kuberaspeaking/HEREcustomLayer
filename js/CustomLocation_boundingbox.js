/**
 * Boilerplate map initialization code starts below:
 */


//  bounding box co-ordinates
var rect_upper_left =  {lat:52.51828, lng:13.33282};
var rect_lower_right =  {lat:52.4982, lng:13.39201};

// set up containers for the map  + panel
var mapContainer = document.getElementById('map2');
  // routeInstructionsContainer = document.getElementById('panel');

//Step 1: initialize communication with the platform
let M2 = {
  'Init': { // developer.here.com for app_id and app_code
      "app_id":   window.app_id,
      "app_code": window.app_code,
      "useHTTPS": true
}
};

var platform = new H.service.Platform(M2.Init);

var defaultLayers = platform.createDefaultLayers();

// Set center of the map
var mapcenter= {lat:52.51607, lng:13.37698};

//Step 2: initialize a map - this map is centered over Berlin
var map2 = new H.Map(mapContainer,
  defaultLayers.normal.map,{
  center: mapcenter,
  zoom: 13
});

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map2));

// Create the default UI components
var ui = H.ui.UI.createDefault(map2, defaultLayers);

 // Create custom map layers:
 var service = platform.getCustomLocationService();


 // Create a style object:
var customStyle = {
  strokeColor: 'orange',
  fillColor: 'rgba(255, 255, 255, 0.5)'
  };



var rect = new H.map.Rect(new H.geo.Rect(rect_upper_left.lat,rect_upper_left.lng,rect_lower_right.lat,rect_lower_right.lng),
 { style: customStyle });
  // Add the rectangle to the map:
map2.addObject(rect);
  // Zoom the map to fit the rectangle:
map2.setViewBounds(rect.getBounds());

getnearestCustomLocation();
//  style = new mapsjs.map.SpatialStyle();


function getnearestCustomLocation()
{
  var str = "";
  var url = "https://cle.api.here.com/2/search/bbox.json";
  url= addURLParam(url, "app_id", window.app_id);
  url= addURLParam(url, "app_code", window.app_code);
  url= addURLParam(url, "bbox",(str.concat(rect_upper_left.lat,',',rect_upper_left.lng,';',rect_lower_right.lat,',',rect_lower_right.lng))); // upper left lower right
  url= addURLParam(url, "layer_id", "REST_TO_TRY");
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() 
  {
    if (this.readyState == 4 && this.status == 200) 
    {
      var myArr = JSON.parse(this.responseText);
  
      for (i=0; i < this.responseText.length; i++)
      {
        var string = myArr.geometries[i].geometry;
        var newstr = string.split('((').join(' ').split(' ').join(' ').split('))');
        var position = newstr[0].split(" ");
        newpos= {lat: position[2], lng: position[1]};
        var wh_icon = new H.map.Icon("img/warehouse.png");
        wh_marker = new H.map.Marker(newpos,{icon:wh_icon});
        map2.addObject(wh_marker);
        i+=1;
      }
   }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

map2.setViewBounds(rect.getBounds());

function addURLParam(url, name, value){
  url += (url.indexOf("?") == -1 ? "?" : "&");
  url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
  return url; 
}


  