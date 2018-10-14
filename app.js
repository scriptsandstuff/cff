/**
 * var L = require('leaflet');
 * var L = require('leaflet'); wasn't working for uglifyjs 
 *    ..because it is es6 
 *    so we use teaser for es6
 *    ... and we use all external libs anyway
 *    ... so, here we are ...
 *    really there was no use for webpack or even node here 
 *    save 5KB on the js file
 *    maybe if I make a package later on.
 */

// import('leaflet');
// import('jquery');
// import('popper.js');
// import('bootstrap');
// // USING BOOTSTRAP FOR THE COLLAPSE ASWELL
// // import {dropdown} from 'bootstrap';
// import('bootstrap-select');
// // import('bootstrap-select-dropdown');

// const css = require('./style.css');


var map; // instance of leafvar map 
var markers = [];
var markerGroup;

/**
 *	declare the array of venues
 */
var venues = [
	{
        name: "An Spailpín Fánach",
        id: "0",
        lat: "51.896514",
        lng: "-8.4765845",
        events :[{"day":"Wed 3rd","time":"6pm","act":"‘Barry Britton Posters’ Book launch & poster exhibition","price":"FREE"},{"day":"Wed 3rd","time":"9.30pm","act":"Sara Corkery, Brendan Butler & Siona Knepper","price":"€10.00"},{"day":"Thur 4th","time":"9.30pm","act":"The Whileaways + Eileen Healy & Dan Linehan","price":"€15.00"},{"day":"Fri 5th","time":"9.30pm","act":"Desi Wilkinson & Patrick Molard (Brittany), Rowan Piggott + Pete Coe (UK)","price":"€15.00"},{"day":"Sat 6th","time":"1pm","act":"Stíleanna (Styles) Flute Concert: Conal Ó Gráda, Aoife Granville, Joanne Quirke, Brendan Ring","price":"€10.00"},{"day":"Sat 6th","time":"3.30pm","act":"Stíleanna (Styles) Concertina Concert: Niall Vallely, Eimhear Flannery, Meadhbh O’ Leary Fitzpatrick, Ann Kirrane Droney, Paul Clesham & Cliona Halley","price":"€10.00"},{"day":"Sat 6th","time":"7pm","act":"‘Gals at Play’: Mary Green, Liz Kane, Lynda Cullen, Ellie Shine & Emma Langford","price":"€15.00"},{"day":"Sat 6th","time":"10.00pm","act":"Manus McGuire & Emily Flack, Matt Cranitch & Jackie Daly, Ann Kirrane Droney & Catherine McHugh","price":"€15.00"},{"day":"Sun 7th","time":"12.30pm","act":"Lee Valley String Band with Mick Daly, Brendan Butler, Mick ‘Tana’ O Brien, Hal O’Neill & Siona Knepper","price":"€10.00"},{"day":"Sun 7th","time":"1.30pm","act":"Song Session","price":"FREE"},{"day":"Sun 7th","time":"3.30pm","act":"Box Concert: Dave Hennessy, Jackie Daly, Jack Talty and Derek Hickey","price":"€10.00"},{"day":"Sun 7th","time":"9.00pm","act":"Cork Singers Club with Special Guest Seán Ó Sé, remembering Lena Bean Uí Shea and John O Shea (the singing fireman)","price":"FREE"}]
    }, {
        name: "CIT Cork School of Music",
        id: "1",
        lat: "51.8961241",
        lng: "-8.4683832",
        events :
        [{"day":"Fri 5th","time":"8pm","act":"Abegondo Pipe and Dance Band with Douglas Comhaltas","price":"€10.00"},{"day":"Sat 6th","time":"11am","act":"Master classes: Kevin Burke (fiddle) and Sliabh Luachra Tunes Workshop with Matt Cranitch & Jackie Daly","price":"€15 (Students €10)"},{"day":"Sat 6th","time":"8pm","act":"Dave Flynn’s Irish Memory Orchestra, Special Guest Mairtín O Connor","price":"€20 (Students €15)"}]
    }, {
        name: "Cork City Children’s Library",
        id: "2",
        lat: "51.8969057",
        lng: "-8.4752595",
        events :
        [{"day":"Sat 6th","time":"11.30am-12.30pm","act":"Tall Tales for Children with Pete Coe","price":"FREE"}]
    }, {
        name: "Cork Opera House",
        id: "3",
        lat: "51.9002811",
        lng: "-8.47307413911774",
        events :
        [{"day":"Sun 7th","time":"8pm","act":"Kate Rusby & Band + Séamus Begley & Jim Murray","price":"€32.00"}]
    }, {
        name: "Counihan's Bar",
        id: "4",
        lat: "51.8977881",
        lng: "-8.469947",
        events :
        [{"day":"Sat 6th","time":"2pm","act":"Bodhran\/Percussion Workshop with Johnny Bongos","price":"FREE"}]
    }, {
        name: "Crane Lane",
        id: "5",
        lat: "51.8977489",
        lng: "-8.4696355",
        events :
        [{"day":"Thur 4th","time":"7pm","act":"Noel Brazil Song Competition €450 in prizes, to Enter email admin@mutantspace.com","price":"FREE"},{"day":"Thur 4th","time":"12pm","act":"Late Concert","price":"FREE"},{"day":"Sun 7th","time":"11pm","act":"Late gig","price":"FREE"}]
    }, {
        name: "Deerpark CBS",
        id: "6",
        lat: "51.8899344",
        lng: "-8.4734561",
        events :
        [{"day":"Sun 7th","time":"2pm","act":"Céilí Mór – ARUNDO, CLUB CEOIL, Abegondo Pipe and Dance Band Family Event","price":"FREE"}]
    }, {
        name: "Emmett Place",
        id: "7",
        lat: "51.8999859",
        lng: "-8.4727718",
        events :
        [{"day":"Sat 6th","time":"11-5pm","act":"Food & Folk Open-air Food market with Abegondo Pipe and Dance Band, Douglas Comhaltas Adult Group, Rowan Piggott","price":"FREE"}]
    }, {
        name: "Rory Gallagher Music Library",
        id: "8",
        lat: "51.89671",
        lng: "-8.475234",
        events :
        [{"day":"Sat 6th","time":"3.00pm","act":"Carmen Cullen will present ‘Hello Delia Murphy’, a tribute in story and song to singer Delia Murphy","price":"FREE"}]
    }, {
        name: "St Finbarr’s GAA",
        id: "9",
        lat: "51.8774565",
        lng: "-8.4972063",
        events :
        [{"day":"Sat 6th","time":"9.30pm","act":"Céilí Mór: Striolán Céilí Band","price":"€10.00"}]
    }, {
        name: "St Finnbarre's Cathedral",
        id: "10",
        lat: "51.8943591",
        lng: "-8.4811048",
        events :
        [{"day":"Wed 3rd","time":"8pm","act":"”Corcach: A Journey” The Casey Sisters; Máire Ní Chathasaigh, Nollaig Casey and Mairéad Ní Chathasaigh- Premiere of a new commission from the Casey Sisters for the 40th year of the Cork Folk Festival, Featuring Nollaig Casey (fiddle and vocals), Máire Ní Chathasaigh (harp), Mairéad Ní Chathasaigh (fiddle and vocals) and some of Cork’s finest musicians: Eoin Ó Riabhaigh (uilleann pipes); Johnny McCarthy (flutes); Eithne Willis (violin and viola); and Joan Scannell (cello)","price":"€15.00"}]
    }, {
        name: "St Peter's Church",
        id: "11",
        lat: "51.8996408",
        lng: "-8.4786399",
        events :
        [{"day":"Thur 4th","time":"1pm","act":"Concert","price":"FREE"},{"day":"Fri 5th","time":"1pm","act":"Concert Rowan Piggott, Garry Cronin & Desi McCabe & more","price":"FREE"},{"day":"Sat 6th","time":"12pm","act":"Karen Casey speaks about FairPlé and its aims to achieve gender balance in Irish traditional and folk music.","price":"FREE"}]
    }, {
        name: "The Corner House",
        id: "12",
        lat: "51.901651",
        lng: "-8.470919",
        events :
        [{"day":"Wed 3rd","time":"9.30pm","act":"The Four Star Trio","price":"FREE"},{"day":"Thur 4th","time":"9.30pm","act":"Lee Delta Blues Club","price":"FREE"},{"day":"Fri 5th","time":"5.50pm","act":"1st Friday Session","price":"FREE"},{"day":"Sat 6th","time":"6pm","act":"Songwriters @6: Leif, Pat Horgan, Martina Stafford, Leah, Sara & Brendan","price":"FREE"},{"day":"Sun 7th","time":"4pm","act":"Album Launch Paddy Tutty and Caoimhín O Fearghail","price":"FREE"},{"day":"Sun 7th","time":"6pm","act":"The Prairie Jaywalkers","price":"FREE"},{"day":"Sun 7th","time":"8pm","act":"The Lee Valley & Rough Deal String Bands","price":"FREE"}]
    }, {
        name: "The Long Valley",
        id: "13",
        lat: "51.8981887",
        lng: "-8.4705669",
        events :
        [{"day":"Sat 6th","time":"2pm","act":"Song Session (approx 60 mins) BALLADS,BROADSIDES & BAWLING HAWKERS session\/informal concert with Pete Coe & Jimmy Crowley and songs from audience","price":"€10.00"}]
    },
    {name: "The Oliver Plunkett",
        id: "14",
        lat: "51.8982162",
        lng: "-8.4695729",
        events :
        [{"day":"Fri 5th","time":"5.30pm","act":"Greenshine + Céilí Allstars","price":"€15.00"},{"day":"Fri 5th","time":"11pm","act":"Late gig","price":"FREE"},{"day":"Sat 6th","time":"4.30pm","act":"Ye Vagabonds & Blind Poets","price":"€15.00"},{"day":"Sat 6th","time":"10pm,","act":"Two Time Polka","price":"FREE"},{"day":"Sun 7th","time":"12.30pm","act":"Stíleanna (Styles) Fiddle Concert: Matt Cranitch, Caoimhe Flannery, Niamh Varian-Barry, Leah Murphy, Manus McGuire, Seamus Sands, Liz Kane, Garry Cronin","price":"€10.00"},{"day":"Sun 7th","time":"4pm","act":"John Spillane + Hanora George+ Ger Wolfe","price":"€15.00"}]
    }, {
        name: "The Roundy",
        id: "15",
        lat: "51.8987518",
        lng: "-8.4761584",
        events :
        [{"day":"Fri 5th","time":"9.30pm","act":"John Blek with Laura ní Carthaigh","price":"€15.00"},{"day":"Sun 7th","time":"2.30pm","act":"Cork Pipers Club Concert with Brendan Ring,Rosaleen O’Leary and Mary Mitchell-Ingoldsby , Shane Keating, Robert Fell,  Pipers from Abegondo","price":"€10.00"}]
    }, {
        name: "Triskel Christchurch",
        id: "16",
        lat: "51.8974504",
        lng: "-8.4766479",
        events :
        [{"day":"Thur 4th","time":"8pm","act":"Portuguese Fadó meets Irish Sean Nós; Claudia Aurora, Máire Ni Chéileachair & Nell Ní Chróinín","price":"€25.00"},{"day":"Fri 5th","time":"8pm","act":"KGB: Paddy Keenan, Frankie Gavin & Dermot Byrne plus Kevin Burke","price":"€25.00"}]
    }	
];

/**
 * init()
 */
function initmap() {
	/**
	 * override the default close method
     * NO extensions necessary :)
	 */
    map = new L.Map('map');
//     scrollWheelZoom
//     map.scrollWheelZoom.disable();
//     
//     this solves the dropdown scroll problem 
//     but maybe be better to have the zooming
//     
//     can disable scroll-zoom on dropdown open and reenable on close
//     
    createControls(map);
    createLayers(map, venues);
    
    // start the map in Cork
    map.setView(new L.LatLng(51.898, -8.477), 15);
}

/**
 * 
 */
function createControls(map) {
    // tile layer
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 13, maxZoom: 18, attribution: osmAttrib});    
    map.addLayer(osm);
    
    // scale layer
    L.control.scale().addTo(map);
    
    //search layer
    var searchControl = L.control('topright'); 	
    searchControl.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'searchDiv'); 
        this.update();
        return this._div;
    };
    searchControl.update = function (props) {
        this._div.innerHTML = '<select class="selectpicker" data-mobile="false" data-live-search="true" name="" id="venue_select"></select>';
    }
    
    searchControl.addTo(map);     
}

/**
 * 
 */
function createLayers(map, venues) {
    markerGroup = L.layerGroup();
    markers = createMarkers(venues);
    for(marker of markers) {
//         marker.addTo( markerGroup );
        markerGroup.addLayer(marker);
    }
//     markerGroup.addTo(map);
    map.addLayer(markerGroup);
}

/**
 * 
 */
function createMarkers(venues) {
    var mkrs = [];
    var contents = '';
//     var popup = L.popup();
    
    for (var i = 0; i , i < venues.length; i++) {
		var marker = L.marker( [venues[i].lat, venues[i].lng] );
        marker.venue = venues[i].name;
        contents = createPopContents(venues[i], marker)[0];
        marker.bindPopup(contents, {closeOnClick:false});     
        marker.on('click', function() { selectVenue(this); });
        marker.on('popupclose', function() {  map.addLayer(markerGroup); });
        marker.bindTooltip(venues[i].name);        
        marker.on('hover', function() { this.openTooltip(); });        
        mkrs[i] = marker;
    }
    return mkrs;
}

/**
 * 
 */
function createPopContents(venue, marker) {
// 	class:'leaflet-popup-content-wrapper leaflet-popup-content'
    var container = $('<div />', {class:'popContainer'});	//text:venue.name, 
	var title = $('<h5 />', {text:venue.name, class:''});
	container.append(title);		
    
    var n = venue.events.length;   
    
//     var evts;
    var venue_body;
    if (n > 1) {
//         venue_body = createAccordion(venue);        
        venue_body = $('<div />', {id:"accordion"+venue.id, class:"accordion"}); 
        for (var i = 0; i < n; i++) {
		t = '<div class="card">' +
                '<div class="card-header">' +                    
//                 '<h5 class="mb-0">'+        
                    '<div class=" list-group-item btn btn-link collapsed" type="button" data-toggle="collapse" ' +
                        'data-target="#collapse' + venue.id + i + '" aria-expanded="false" aria-controls="collapse' + venue.id + i + '">' +                
                            venue.events[i].day + " " + venue.events[i].time+          
                    '</dvi>' +
//                     '</h5>' +
                '</div>' +                
                '<div id="collapse' + venue.id + i + '" class="collapse" aria-labelledby="heading' + i + 
                '" data-parent="#accordion' + venue.id + '">'+
                '<div class="card-body">' +
                        '<p class="text-left evt-body">' + venue.events[i].act + '</p>' + '<p class="text-right evt-price">' + venue.events[i].price + '</p>'+
                    '</div>' +
                '</div>' +
            '</div>';
        venue_body.append(t);
        }
    } else {
        venue_body =    '<div class="list-group-item evt-date-time">' +
                            venue.events[0].day + " " + venue.events[0].time+
                        '</dvi>' +
                        '<p class="text-left evt-body">' + venue.events[0].act + '</p>' + 
                        '<p class="text-right evt-price">' + venue.events[0].price + '</p>';
    }
    
    container.append(venue_body);
    return container;
}

/**
 *
 */
function createDropDown(venues) {
	var sel = $('select'); // should probably use the id...
//     sel.append('<option value="" class="text-hide" selected disabled> <a class="cen">search</a> </option>');
	for (var i = 0; i , i < venues.length; i++) {
// 		console.log(venues[i].name);
		sel.append('<option value="">' + venues[i].name + '</option>');
	}
}

/**
 * 
 */
function selectVenue(m) {
//     console.log("select venue: "+ m.venue);	
    if (map.hasLayer(markerGroup)) {
//         markerGroup.removeLayer(m);
        map.removeLayer(markerGroup);        
    }
    map.addLayer(m);
	m.openPopup();       
}

/**
 * 
 */
function deselectVenue() { 
//     if($('.accordion')[0]) {
//         $('.accordion').collapse('hide');
//     }
    if ($('.collapse')[0]) {
        $('.collapse').collapse('hide');
    }    
    if($(".leaflet-popup-close-button")[0]){ 
//         console.log('closing all popups :)');
        $(".leaflet-popup-close-button")[0].click();
    }
    if (!map.hasLayer(markerGroup)) {
        map.addLayer(markerGroup);
    }
}

initmap();
createDropDown(venues);
    

/**
 * 
 */
$('.selectpicker').on('change', function(e){
    deselectVenue();
    // var selected = $(this).find("option:selected").val(); 
    // why is val empty??
    // https://stackoverflow.com/questions/25720986/bootstrap-select-how-to-fire-event-on-change#28073479
    var selected = $(this).find("option:selected")[0].firstChild.data; 
       
//     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    function isS(ms) { 
        return ms.venue === selected;
    }
    var found = markers.find(isS);
    /*
    var found = markers.find(function(selected) {
        return markers.venue === selected;
    });*/
    if (found) {
        selectVenue(found);
    } else {
        console.log('marker with venue == selected not found');
    }
        /*
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].venue === selected) {
            selectVenue(markers[i]);
            break;
        }
    }
    */
    map.scrollWheelZoom.enable();    
//     e.stopPropagation();
//     e.preventDefault();
});

/**
 * 
 */
$('.selectpicker').on('shown.bs.select', function(e){    
    map.scrollWheelZoom.disable();
});

/**
 * 
 * click must close popup
 * 
 */
map.on('click', function(e) {
    var evt = e.originalEvent;
    var t = evt.target;
//     var n = t.nodeName;    
    
//     we could just check the immediate parent to see if it is a span ...
//     should also be able to use the bubble count ...
//     could also be that this doesn't work and it should be map. ...
    
//     left it as is it is the bs- event that did the trick
    
//     the data-mobile=true allowing native select just turns off the bs-select
    
    if ( $(t).parents().is('[class*="leaflet-control-container"]') ) {           
        this.scrollWheelZoom.disable();        
//         but when selection from picker ... click is still called afterwards...
    } else {
        deselectVenue();
        this.scrollWheelZoom.enable();
    }
    
    // if a popup is open? cause we still not preventing bubbling for some reason
    if ( map.getPane('popupPane').childElementCount > 0 ) {
        this.scrollWheelZoom.enable();
    }
});

/**
 * 
 */
// $(document).ready(function() {
// do not need this cause we put the css class on the element already
//    $('.selectpicker').selectpicker();
// });


/**
 * 
 */
/*$('.selectpicker').on('hide', function(e){
    map.scrollWheelZoom.enable();
});  */  

/**
 * well this does nothing amd I'd say the one above doesn't either
 */
// $(document).on('mousewheel', function(e) {
//     var evt = e.originalEvent;
//     var t = evt.target;
// //     var n = t.nodeName;    
//     if ( !$(t).parents().is('[class*="leaflet-control-container"]') ) {   
// //         deselectVenue();
//         preventDefault();
//     } 
// });
