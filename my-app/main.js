import './style.css';
import * as style from "ol/style";
import * as source from "ol/source";
import {GeoJSON} from "ol/format";
import * as layer from "ol/layer";
import {Map, View} from "ol";
import * as proj from "ol/proj";
import * as loadingstrategy from "ol/loadingstrategy";
import * as extent from "ol/extent";
import Draw from 'ol/interaction/Draw.js';
import {isNull} from "ol/format/filter";

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
    color: 'rgba(200, 150, 150, 0.5)' // Couleur de remplissage
  }),
  stroke: new style.Stroke({
    color: 'rgba(200, 150, 150, 1)', // Couleur de la bordure
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
  }),
  image: new style.Circle({
    radius: 5,
    fill: new style.Fill({
      color: 'blue' // Couleur de remplissage du cercle
    })
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
  }),
  image: new style.Circle({
    radius: 5,
    fill: new style.Fill({
      color: 'purple' // Couleur de remplissage du cercle
    })
  })
});

const selectStyle = new style.Style({
  fill: new style.Fill({
    color: 'rgba(255, 0, 0, 0.5)' // Couleur de remplissage
  }),
  stroke: new style.Stroke({
    color: 'red', // Couleur de la bordure
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

batimentSource.on("change", function (event){
  // récupérer le select
  // parcourir la source (les features)
  // ajouter chaquze feature au select
  // prendre exemple sur les truc
})

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
    zoom: 9
  })
});

const layers = {batLayer, cafetLayer, residenceLayer, transportsLayer, serviceLayer};
const sources = {batimentSource, cafetSource, residenceSource, transportSource, serviceSource};
const styles = {batimentStyle, cafetStyle, residenceStyle, transportStyle, serviceStyle, selectStyle}
var active_sources = [];
window.active_features = [];
window.active_layers = [];

var boule = false;

window.styles = styles;
window.layers = layers;
window.sources = sources;
window.map = map; //pas nécessaire pour le moment

//-- Affichage des couches selon les checkboxs selectionnées dans la première colonne de choix -->
function afficherItems() {
  var nomCouches = Array.from(document.querySelectorAll('.layer-checkbox:checked')).map(checkbox => checkbox.value);

  for (var nomCouche in window.layers) {
    var couche = window.layers[nomCouche];
    couche.setVisible(nomCouches.includes(nomCouche));
    if (nomCouches.includes(nomCouche)) {
      window.active_layers.push(couche);
      var source = couche.getSource()
      active_sources.push(source);

      //Test pour afficher seulement la selection de filière, pas bien expliqué mais tkt
      if (nomCouche !== 'batLayer') {
        source.getFeatures().forEach(function (feature) {
          active_features.push(feature);
        })
      }
      else {
        if (!boule) {
          source.getFeatures().forEach(function (feature) {
            active_features.push(feature);
          })
        }
      }
    }
  }
}

//-- Décoche toutes les checkboxs et enlève toutes les couches -->
function resetChoix() {
  document.querySelectorAll('.layer-checkbox').forEach(checkbox => {
    checkbox.checked = false;
  });
  toutUpdate();
}

//-- Changer l'affichage selon si prof ou étudiant -->
function changePublic() {
  // on aurait pu utiliser les radio depuis le début pour ce selector comme ça pas de soucis :')
  var selected = document.querySelector('input[name="radiocheck"]:checked');

  /*var cafets = window.layers["cafetLayer"];
  var transports = window.layers["transportsLayer"];
  var residences = window.layers["residenceLayer"];*/

  if (selected) {
    if (selected.value === 'etudiant') {
      document.querySelectorAll('.layer-checkbox').forEach(checkbox => {
        if (['cafetLayer', 'transportsLayer', 'residenceLayer'].includes(checkbox.value)) {
          checkbox.checked = true;
        }
      });
    }
    else {
      if (selected.value === 'professeur') {
        document.querySelectorAll('.layer-checkbox').forEach(checkbox => {
          if (['cafetLayer', 'transportsLayer'].includes(checkbox.value)) {
            checkbox.checked = true;
          }
        });
      }
    }
  }
  afficherItems();
}

function changeFiliere() {

  var trouv = false;
  var feats = [];

  var serviceSelected = document.getElementById('select-filiere').value;

  var batsource = window.sources['batimentSource'];
  var featuresToFilter = (batsource.getFeatures());

  featuresToFilter.forEach(function (f){
    if (serviceSelected !== f.get('service_id')){
      f.setStyle(new style.Style({}));
    }
    else{
      trouv = true;
      couleurStyle(f);
      feats.push(f);
    }
  });

  if (trouv) {
    // OUAH C'EST MOOOOOOOOOOOOOOOOCHE
    window.active_features = feats;
    boule = true;
    afficherItems();
    boule = false;
  }

}

function changeBat() {
  var searchedBat = document.getElementById('select-bat').value;

  var tousBats = [window.sources['batimentSource'], window.sources['cafetSource'], window.sources['residenceSource']];

  tousBats.forEach(function (source) {
    source.getFeatures().forEach(function (feature) {
      if (feature.get('name') === searchedBat) {

        tousStyles()

        feature.setStyle(window.styles['selectStyle']);
        window.active_features.push(feature);
        window.map.getView().setCenter(extent.getCenter(feature.getGeometry().getExtent()));
      }
    })
  })
}

function tousStyles() {
  active_sources.forEach(function(source){
    source.getFeatures().forEach(function (feature){
      couleurStyle(feature);
    })
  })
}

// Ajouter un style à une feature en particulier. C'est dégueulasse mais ça marche :)
function couleurStyle(item) {
  for (var name in window.sources) {
    window.sources[name].getFeatures().forEach(function (feature) {
      if (feature === item) {
        if (name === 'batimentSource') {
          item.setStyle(window.styles['batimentStyle']);
        }
        if (name === 'cafetSource') {
          item.setStyle(window.styles['cafetStyle']);
        }
        if (name === 'transportSource') {
          item.setStyle(window.styles['transportStyle']);
        }
        if (name === 'residenceSource') {
          item.setStyle(window.styles['residenceStyle']);
        }
        if (name === 'serviceSource') {
          item.setStyle(window.styles['serviceStyle']);
        }
      }
    })
  }
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
        feature.setStyle(new style.Style({}));
      }
      else {
        couleurStyle(feature);
        //Style à changer en fonction du type de feature
        //ajout de feature dans active_features
      }
    });
  });
  deplaceCam(campusSelected);
  miseAjourSelect(campusSelected);
}

function toutUpdate() {
  active_sources = []
  window.active_layers = [];
  window.active_features = [];
  afficherItems();
  //changeFiliere();
  changeCampus();
  majBatiments();
}

function majBatiments() {
  console.log("wesh");
  var trouverBat = document.getElementById('select-bat');
  while (trouverBat.firstChild) {
    trouverBat.removeChild(trouverBat.firstChild);
  }
  var tousBats = [window.sources['batimentSource'], window.sources['cafetSource'], window.sources['residenceSource']];
  tousBats.forEach(function (source) {
    source.getFeatures().forEach(function (feature) {
      var name = feature.get('name');
      var option = document.createElement("option");
      option.textContent = name;
      option.value = name;
      trouverBat.add(option);
    })
  })
}

function miseAjourSelect(campusSelected) {
  var formSelectServices = document.getElementById('select-filiere');
  while (formSelectServices.firstChild) {
    formSelectServices.removeChild(formSelectServices.firstChild);
  }
  var serviceSource = window.sources['serviceSource'];
  serviceSource.getFeatures().forEach(function(f) {
    if (f.get('campus') === campusSelected) {
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
  /*for (var sourceName in window.sources) {
    var source = window.sources[sourceName];
    features = features.concat(source.getFeatures());
  }*/
/*
  active_sources.forEach(function (source) {
    features = features.concat(source.getFeatures());
  })
*/
  var campusSelected = document.getElementById('select-campus').value;
  active_features.forEach(function (f){
    if (f.get('campus') === campusSelected) {
      features.push(f);
    }
  })

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

  /*allsources.forEach(function (source) {
    source.getFeatures().forEach(function (f) {
      features.push(f);
    });
  });*/

  var campusSelected = document.getElementById('select-campus').value;
  active_features.forEach(function (f){
    if (f.get('campus') === campusSelected) {
      features.push(f);
    }
  })

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


// TEST POUR ADD DES TRUCS

const typeSelect = document.getElementById('type');

let draw; // global so we can remove it later
function addInteraction() {
  const value = typeSelect.value;

  if (value !== 'None') {
    draw = new Draw({
      source: batimentSource,
      type: typeSelect.value,
      style: residenceStyle,
    });

    map.addInteraction(draw);
  }
}

/**
 * Handle change event.
 */
typeSelect.onchange = function () {
  if(typeSelect.value !== 'None') {
    map.removeInteraction(draw);
    addInteraction();
  }
  else {
    map.removeInteraction(draw);
  }
};

///INTERACTION AJOUT DE FEATURES

function addFeature(){
  var f = window.actualdraw;
  if(f !== null) {
    var f_name = document.getElementById("featurename").value;
    var f_description = document.getElementById("featuredescription").value;

    f.set('name', f_name);
    f.set('description', f_description);

    window.actualdraw = null;
  }
  else{
    alert("vous n'avez dessiné aucune feature !");
  }
  // a la fin

}
function openPopup() {
  document.getElementById("popupAddFeature").style.display = "block";
  document.getElementById("fermerFeatureBtn").style.display ="block";
  document.getElementById("select-ajout").style.display = "block";
  document.getElementById("ajouterFeatureBtn").style.display = "none";
}
function closePopup(){
    document.getElementById("popupAddFeature").style.display = "none";
    document.getElementById("select-ajout").style.display = "none";
  document.getElementById("fermerFeatureBtn").style.display ="none";
  document.getElementById("ajouterFeatureBtn").style.display = "block";
}

batimentSource.on("addfeature", function (event){
  console.log("actualisation de la feature dessinée")
  window.actualdraw = event.feature;
  // feature.set('name', 'batimentajouter');
  //openPopup();
});

document.getElementById("ajouterFeatureBtn").addEventListener("click", openPopup);
document.getElementById("fermerFeatureBtn").addEventListener("click", closePopup);
document.getElementById("popupAddButton").addEventListener("click", addFeature);

//FIN INTERACTION ADD FEATURES



const download = function (data, fileName) {
  const blob = new Blob([data], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', fileName);
  a.click();
}

function deplaceCam(location) {
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
  document.querySelector('input[name="radiocheck"][value="tout"]').checked = true;
  document.getElementById('select-filiere').value = "";
  document.getElementById('select-campus').value = "";
  document.getElementById('select-bat').value = "";
  document.querySelectorAll('.public-checkbox').forEach(checkbox => {
    checkbox.checked = false;
  });
  majBatiments();
  closePopup();
}

document.getElementById("batcheck").addEventListener("change", toutUpdate);
document.getElementById("cafetcheck").addEventListener("change", toutUpdate);
document.getElementById("residencecheck").addEventListener("change", toutUpdate);
document.getElementById("servicecheck").addEventListener("change", toutUpdate);
document.getElementById("transportcheck").addEventListener("change", toutUpdate);

document.getElementById("reset_choix").addEventListener("click", resetChoix);

document.getElementById("check_tout").addEventListener("change", changePublic);
document.getElementById("check_etu").addEventListener("change", changePublic);
document.getElementById("check_prof").addEventListener("change", changePublic);

document.getElementById("select-filiere").addEventListener("change", changeFiliere);
document.getElementById("select-bat").addEventListener("change", changeBat);

document.getElementById("select-campus").addEventListener("change", toutUpdate);
document.getElementById("exportCsv").addEventListener("click", exportCsv);
document.getElementById("exportGeoJson").addEventListener("click", exportGeojson);

////// REQUETE SUR GEOSERVER


function ajouterFeaturesGeoServer(nomCouche, featuresGeoJSON, callback) {
  const urlWFS = 'http://localhost:8080/geoserver/wfs';
  const typeName = `toto:${nomCouche}`;
  const credentials = 'toto:toto';
  const authHeader = 'Basic ' + btoa(credentials);

  // Convertir GeoJSON en XML (GML)
  const options = {
    method: 'POST',
    mode:'no-cors',
    headers: {
      'Content-Type': 'text/xml',
      'Authorization': authHeader,
    },
    body: JSON.stringify({
      features: featuresGeoJSON.features,
      typeName: typeName,
    }),
  };

  fetch(urlWFS, options)
      .then(response => response.text())
      .then(data => {
        callback(null, data);
      })
      .catch(error => {
        callback(error, null);
      });
}

// Exemple d'utilisation de la fonction avec GeoJSON
const nomCoucheExistante = 'couche_existante';
const featuresGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [1.934479273569592, 47.8437736162175]
      },
      "properties": {
        // Ajoutez ici les propriétés de votre feature
      }
    }
    // Ajoutez d'autres features au besoin
  ]
};

ajouterFeaturesGeoServer(nomCoucheExistante, featuresGeoJSON, (erreur, reponse) => {
  if (erreur) {
    console.error('Erreur lors de la requête:', erreur);
  } else {
    console.log('Réponse de GeoServer:', reponse);
    // Traiter la réponse de GeoServer ici
  }
});








