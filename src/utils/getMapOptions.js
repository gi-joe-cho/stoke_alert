export const getMapOptions = (maps) => {

  return {
    streetViewControl: true,
    scaleControl: true,
    disableDoubleClickZoom: true,
    mapTypeControl: true,
    mapTypeId: maps.MapTypeId.ROADMAP,
    mapTypeControlOptions: {
      style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
      mapTypeIds: [
        maps.MapTypeId.ROADMAP,
        maps.MapTypeId.SATELLITE,
        maps.MapTypeId.HYBRID
      ]
    },
    zoomControl: true,
    clickableIcons: false,
    styles: [
      {
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#c1b6c4'
          }
        ]
      },
      {
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#523735'
          }
        ]
      },
      {
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'color': '#f5f1e6'
          }
        ]
      },
      {
        'featureType': 'administrative',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#c9b2a6'
          }
        ]
      },
      {
        'featureType': 'administrative.land_parcel',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#dcd2be'
          }
        ]
      },
      {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#ae9e90'
          }
        ]
      },
      {
        'featureType': 'landscape.natural',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#d9d6db'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#dfd2ae'
          }
        ]
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#93817c'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#71bc8f'
          }
        ]
      },
      {
        'featureType': 'poi.park',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#447530'
          }
        ]
      },
      {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#f5f1e6'
          }
        ]
      },
      {
        'featureType': 'road.arterial',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#e8f2ff'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#f8c967'
          }
        ]
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#e850ce'
          }
        ]
      },
      {
        'featureType': 'road.highway.controlled_access',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#c751e8'
          }
        ]
      },
      {
        'featureType': 'road.highway.controlled_access',
        'elementType': 'geometry.stroke',
        'stylers': [
          {
            'color': '#db8555'
          }
        ]
      },
      {
        'featureType': 'road.local',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#806b63'
          }
        ]
      },
      {
        'featureType': 'transit.line',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#dfd2ae'
          }
        ]
      },
      {
        'featureType': 'transit.line',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#8f7d77'
          }
        ]
      },
      {
        'featureType': 'transit.line',
        'elementType': 'labels.text.stroke',
        'stylers': [
          {
            'color': '#ebe3cd'
          }
        ]
      },
      {
        'featureType': 'transit.station',
        'elementType': 'geometry',
        'stylers': [
          {
            'color': '#dfd2ae'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'geometry.fill',
        'stylers': [
          {
            'color': '#81bdc4'
          }
        ]
      },
      {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [
          {
            'color': '#92998d'
          }
        ]
      }
    ]
  };
}