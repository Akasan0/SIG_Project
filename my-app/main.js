import './style.css';
import * as style from "ol/style";
import * as source from "ol/source";
import {GeoJSON} from "ol/format";
import * as layer from "ol/layer";
import {Map, View} from "ol";
import * as proj from "ol/proj";
import * as loadingstrategy from "ol/loadingstrategy";
import * as extent from "ol/extent";


console.log("TOTO");
function polygonStyleFunction(feature, resolution) {
  return new style.Style({
    stroke: new style.Stroke({
      color: 'black',
      width: 3,
    }),
    text: new style.Text({
      text: feature.get('name'),
      stroke : new style.Stroke({color: 'black', width : 1})
    }),
  });
}

const serviceStyle = new style.Style({
  fill: new style.Fill({
    color: 'rgba(255, 0, 0, 0.5)' // Couleur de remplissage
  }),
  stroke: new style.Stroke({
    color: 'red', // Couleur de la bordure
    width: 2 // Largeur de la bordure
  })
});

// Définir un style pour les bâtiments (polygones)
const batimentStyle = new style.Style({
  fill: new style.Fill({
    color: 'rgba(0, 0, 255, 0.5)' // Couleur de remplissage
  }),
  stroke: new style.Stroke({
    color: 'blue', // Couleur de la bordure
    width: 2 // Largeur de la bordure
  })
});

// Définir un style pour les transports (points et lignes)
const transportStyle = new style.Style({
  image: new style.Circle({
    radius: 5,
    fill: new style.Fill({
      color: 'green' // Couleur de remplissage du cercle
    })
  }),
  stroke: new style.Stroke({
    color: 'green', // Couleur de la bordure
    width: 2 // Largeur de la bordure
  })
});

// Définir un style pour les résidences (polygones et points)
const residenceStyle = new style.Style({
  fill: new style.Fill({
    color: 'rgba(125, 125, 0, 0.5)' // Couleur de remplissage  juste plus le jaune pitié
  }),
  stroke: new style.Stroke({
    color: 'green', // Couleur de la bordure
    width: 2 // Largeur de la bordure
  }),
  image: new style.Circle({
    radius: 5,
    fill: new style.Fill({
      color: 'green' // Couleur de remplissage du cercle
    })
  })
});

// Définir un style pour les cafétérias (points et polygones)
const cafetStyle = new style.Style({
  fill: new style.Fill({
    color: 'rgba(128, 0, 128, 0.5)' // Couleur de remplissage
  }),
  stroke: new style.Stroke({
    color: 'purple', // Couleur de la bordure
    width: 2 // Largeur de la bordure
  })
});

/// --> configuration des sources pour chaque couche.

const batimentSource = new source.Vector({
  format: new GeoJSON(),
  url: function(extent) {
    return (
        'http://localhost:8080/geoserver/toto/' +
        'ows?service=WFS&version=1.0.0' +
        '&request=GetFeature&typeName=toto:map_batiment' +
        '&outputFormat=application/json' +
        '&srsname=EPSG:3857' +
        '&bbox=' +
        extent.join(',') +
        ',EPSG:3857'
    );
  },
  strategy: loadingstrategy.bbox
});

const serviceSource = new source.Vector({
  format: new GeoJSON(),
  url: function(extent) {
    return (
        'http://localhost:8080/geoserver/toto/' +
        'ows?service=WFS&version=1.0.0' +
        '&request=GetFeature&typeName=toto:map_services' +
        '&outputFormat=application/json' +
        '&srsname=EPSG:3857' +
        '&bbox=' +
        extent.join(',') +
        ',EPSG:3857'
    );
  },
  strategy: loadingstrategy.bbox
});

const cafetSource = new source.Vector({
  format: new GeoJSON(),
  url: function(extent) {
    return (
        'http://localhost:8080/geoserver/toto/' +
        'ows?service=WFS&version=1.0.0' +
        '&request=GetFeature&typeName=toto:map_cafet' +
        '&outputFormat=application/json' +
        '&srsname=EPSG:3857' +
        '&bbox=' +
        extent.join(',') +
        ',EPSG:3857'
    );
  },
  strategy: loadingstrategy.bbox
});

const residenceSource = new source.Vector({
  format: new GeoJSON(),
  url: function(extent) {
    return (
        'http://localhost:8080/geoserver/toto/' +
        'ows?service=WFS&version=1.0.0' +
        '&request=GetFeature&typeName=toto:map_residence' +
        '&outputFormat=application/json' +
        '&srsname=EPSG:3857' +
        '&bbox=' +
        extent.join(',') +
        ',EPSG:3857'
    );
  },
  strategy: loadingstrategy.bbox
});

const transportSource = new source.Vector({
  format: new GeoJSON(),
  url: function(extent) {
    return (
        'http://localhost:8080/geoserver/toto/' +
        'ows?service=WFS&version=1.0.0' +
        '&request=GetFeature&typeName=toto:map_transports' +
        '&outputFormat=application/json' +
        '&srsname=EPSG:3857' +
        '&bbox=' +
        extent.join(',') +
        ',EPSG:3857'
    );
  },
  strategy: loadingstrategy.bbox
});

const batLayer = new layer.Vector({
  source: batimentSource,
  style: batimentStyle
});

const residenceLayer = new layer.Vector({
  source: residenceSource,
  style: residenceStyle
});

const cafetLayer = new layer.Vector({
  source: cafetSource,
  style: cafetStyle
});

const serviceLayer = new layer.Vector({
  source: serviceSource,
  style: serviceStyle
});

const transportsLayer = new layer.Vector({
  source: transportSource,
  style: transportStyle
});

const map = new Map({
  target: 'map',
  layers: [
    new layer.Tile({
      source: new source.OSM()
    }),
    batLayer,
    transportsLayer,
    residenceLayer,
    serviceLayer,
    cafetLayer
  ],
  view: new View({
    center: proj.fromLonLat([1.934479273569592, 47.8437736162175]),
    zoom: 16
  })
});

const layers = {batLayer, cafetLayer, residenceLayer, transportsLayer, serviceLayer};
const sources = {batimentSource, cafetSource, residenceSource, transportSource, serviceSource};
const styles = {batimentStyle, cafetStyle, residenceStyle, transportStyle, serviceStyle}

window.styles = styles;
window.layers = layers;
window.sources = sources;
window.map = map; //pas nécessaire pour le moment

//-- Affichage des couches selon les checkboxs selectionnées dans la première colonne de choix -->
function afficherItems() {
  var nomCouches = Array.from(document.querySelectorAll('.layer-checkbox:checked')).map(checkbox => checkbox.value);
  console.log("EZPRFJPZERJPFZJEPF");
  for (var nomCouche in window.layers) {
    var couche = window.layers[nomCouche];
    couche.setVisible(nomCouches.includes(nomCouche));
  }
}

//-- Selection de toutes les checkboxs de la colonne de gauche -->
function selectAll() {
  Object.values(window.layers).forEach(function (couche) {
    couche.setVisible(true);
  });
  document.querySelectorAll('.layer-checkbox').forEach(checkbox => {
    checkbox.checked = true;
  });
}

//-- Décoche toutes les checkboxs et enlève toutes les couches -->
function resetCouches() {
  Object.values(window.layers).forEach(function (couche) {
    couche.setVisible(false);
  });
  document.querySelectorAll('.layer-checkbox').forEach(checkbox => {
    checkbox.checked = false;
  });
}

//-- Changer l'affichage selon si prof ou étudiant -->
function changePublic(option) {
  var checkboxes = document.querySelectorAll('.public-checkbox');
  checkboxes.forEach(function (checkbox) {
    if (checkbox.value !== option) {
      checkbox.checked = false;
    }
  });

  /*for (var nomCouche in window.layers) {
      var couche = window.layers[nomCouche];
      couche.setVisible(false);
  }*/

  var checked = Array.from(document.querySelectorAll('.public-checkbox:checked')).map(checkbox => checkbox.value);
  console.log(checked);

  var cafets = window.layers['cafetLayer'];
  var transports = window.layers['transportsLayer'];
  var residences = window.layers['residenceLayer'];

  if (checked.includes('etudiant')) {
    cafets.setVisible(true);
    transports.setVisible(true);
    residences.setVisible(true);
  }

  if (checked.includes('professeur')) {
    cafets.setVisible(true);
    transports.setVisible(true);
  }
}

function changeFiliere() {
  var serviceSelected = document.getElementById('select-filiere').value;

  var batsource = window.sources['batimentSource'];
  var featuresToFilter = (batsource.getFeatures());

  featuresToFilter.forEach(function (f){
    if (serviceSelected !== f.get('service_id')){
      f.setStyle(new style.Style({}));
    }
    else{
      f.setStyle(window.styles['batimentStyle'])
    }
  });
}

function changeCampus() {
  var campusSelected = document.getElementById('select-campus').value;

  var batsource = window.sources['batimentSource'];
  var cafetsource = window.sources['cafetSource'];
  var transportsource = window.sources['transportSource'];
  var residencesource = window.sources['residenceSource'];
  var servsource = window.sources['serviceSource'];

  var allsources = [batsource, cafetsource, transportsource, residencesource, servsource];

  allsources.forEach(function (source) {
    source.getFeatures().forEach(function (feature) {
      if (campusSelected !== feature.get('campus')) {
        console.log("ouais ici");
        feature.setStyle(new style.Style({}));
      }
      else {
        feature.setStyle(window.styles['batimentStyle'])
        //Style à changer en fonction du type de feature
      }
    });
  });
  deplaceCam(campusSelected);
  miseAjourSelect(campusSelected);
}

function miseAjourSelect(campusSelected){
  var formSelectServices = document.getElementById('select-filiere');
  while (formSelectServices.firstChild){
    formSelectServices.removeChild(formSelectServices.firstChild)
  }
  var serviceSource = window.sources['serviceSource'];
  serviceSource.getFeatures().forEach(function(f){
    console.log('name =' +  f.get('name'));
    if (f.get('campus') === campusSelected){
      var name = f.get('name');
      var option = document.createElement("option");
      option.textContent = name;
      option.value = name;
      formSelectServices.add(option);
    }
  });
}

function exportCsv() {
  var features = [];
  for (var sourceName in window.sources) {
    var source = window.sources[sourceName];
    features = features.concat(source.getFeatures());
  }
  var csvData = "name;campus;description;geometry\n";

  features.forEach(function (feature) {
    var name = feature.get('name') || '';
    var campus = feature.get('campus') || '';
    var description = feature.get('description') || '';
    var f_extent = feature.getGeometry().getExtent();
    var coords = extent.getCenter(f_extent);

    var lonLat = proj.toLonLat(coords)
    var reversedLonLat = [lonLat[1], lonLat[0]];
    var geometry = reversedLonLat;


    csvData += '"' + name + '";"' + campus + '";"' + description + '";"' + JSON.stringify(geometry) + '"\n';
  });

  // Maintenant, vous avez la variable csvData contenant les données CSV
  // Vous pouvez faire quelque chose avec ces données, par exemple l'enregistrer dans un fichier ou l'envoyer à un service distant.
  console.log(csvData);
  // Vous pouvez également utiliser la fonction window.open pour ouvrir les données dans une nouvelle fenêtre.
  // window.open('data:text/csv;charset=utf-8,' + encodeURIComponent(csvData));
  download(csvData, 'export.csv');
}

function exportGeojson() {
  var batsource = window.sources['batimentSource'];
  var cafetsource = window.sources['cafetSource'];
  var transportsource = window.sources['transportSource'];
  var residencesource = window.sources['residenceSource'];
  var servsource = window.sources['serviceSource'];

  var allsources = [batsource, cafetsource, transportsource, residencesource, servsource];

  const format = new GeoJSON({ featureProjection: 'EPSG:3857' });
  var features = [];

  allsources.forEach(function (source) {
    source.getFeatures().forEach(function (f) {
      features.push(f);
    });
  });

  const geojsonStr = format.writeFeatures(features);
  const blob = new Blob([geojsonStr], { type: 'application/json' });
  const downloadLink = document.createElement('a');

  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = 'exported_data.geojson';

  // Append the link to the document
  document.body.appendChild(downloadLink);

  // Programmatically click on the link to trigger the download
  downloadLink.click();

  // Remove the link from the document
  document.body.removeChild(downloadLink);
}


const download = function (data, fileName) {
  const blob = new Blob([data], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', fileName);
  a.click();
}

function deplaceCam(location) {
  console.log("oeoeoeoeoeoeoeoeoe");
  var center = null;
  switch (location) {
    case 'Orleans':
      center = proj.fromLonLat([1.934479273569592, 47.8437736162175]);
      break;
    case 'Tours':
      center = proj.fromLonLat([0.7035078916595157, 47.356139027711336])
  }
  window.map.getView().setCenter(center);
}


//-- Actions effectuées au lancement de l'application. On décoche toutes les checkboxs (pour l'instant y'a juste ça -->
window.onload = function () {

  document.querySelectorAll('.layer-checkbox').forEach(checkbox => {
    checkbox.checked = false;
  });
  document.getElementById('select-filiere').value = "";
  document.getElementById('select-campus').value = "";
  document.querySelectorAll('.public-checkbox').forEach(checkbox => {
    checkbox.checked = false;
  });
}

document.getElementById("batcheck").addEventListener("change", afficherItems);
document.getElementById("cafetcheck").addEventListener("change", afficherItems);
document.getElementById("residencecheck").addEventListener("change", afficherItems);
document.getElementById("servicecheck").addEventListener("change", afficherItems);
document.getElementById("transportcheck").addEventListener("change", afficherItems);

document.getElementById("select_all").addEventListener("click", selectAll);
document.getElementById("reset_all").addEventListener("click", resetCouches);

document.getElementById("check_etu").addEventListener("change", changePublic("etudiant"));
document.getElementById("check_prof").addEventListener("change", changePublic("professeur"));

document.getElementById("select-filiere").addEventListener("change", changeFiliere);

document.getElementById("select-campus").addEventListener("change", changeCampus);
document.getElementById("exportCsv").addEventListener("click", exportCsv);
document.getElementById("exportGeoJson").addEventListener("click", exportGeojson);