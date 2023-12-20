import './style.css';
import * as style from "ol/style";
import * as source from "ol/source";
import {GeoJSON} from "ol/format";
import * as layer from "ol/layer";
import {Map, View} from "ol";
import * as proj from "ol/proj";
import * as loadingstrategy from "ol/loadingstrategy";
import * as extent from "ol/extent";
import {coordinates} from "ol/geom/flat/reverse";
function onMouseMove(browserEvent) {
    var coordinate = browserEvent.coordinate;
    var pixel = map.getPixelFromCoordinate(coordinate);
    var el = document.getElementById('description');

    // Ajoutez une correction pour positionner l'infobulle au-dessus du point
    var offsetX = 0; // Ajustez la valeur selon votre préférence
    var offsetY = 0; // Ajustez la valeur selon votre préférence

    el.innerHTML = '';
    map.forEachFeatureAtPixel(pixel, function(feature) {
        var description = feature.get('description');
        var nom = feature.get('name');
        if (description === null) {
            el.innerHTML += nom + ' = Aucune description' + '<br>';
        }
        else {
            el.innerHTML +=  nom +' = '+ feature.get('description')+'<br>';
        }
    });

    if (el.innerHTML !== ''){
        // Ajustez la position de l'infobulle
        el.style.left = pixel[0] + offsetX + 'px';
        el.style.top = pixel[1] + offsetY + 'px';
    }
    else {
        el.style.left = '0px';
        el.style.top = '0px';
    }
}
map.on('pointermove', onMouseMove);