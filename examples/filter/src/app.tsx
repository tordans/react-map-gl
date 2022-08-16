import * as React from 'react';
import {useState, useMemo, useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import Map, {Popup, Source, Layer} from 'react-map-gl';
import ControlPanel from './control-panel';

import {countiesLayer, highlightLayer} from './map-style';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoidG9yZGFucyIsImEiOiJjamgzM3pmNGgwYXA5MnFvNDVhMWZ0ZG1nIn0.81lAz7ysD0LZU_eqa_hObg'; // Set your mapbox token here

export default function App() {
  const [hoverInfo, setHoverInfo] = useState(null);

  const onStuff = (eventName, event) => {
    console.log(eventName, {event, f: event.features});
    if (event?.lngLat?.lng) {
      setHoverInfo({
        longitude: event.lngLat.lng,
        latitude: event.lngLat.lat,
        countyName: eventName
      });
    }
  };

  const selectedCounty = (hoverInfo && hoverInfo.countyName) || '';
  const filter = useMemo(() => ['in', 'COUNTY', selectedCounty], [selectedCounty]);

  return (
    <>
      <Map
        initialViewState={{
          latitude: 38.88,
          longitude: -98,
          zoom: 3
        }}
        minZoom={2}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        //
        // BOX
        onBoxZoomStart={event => onStuff('onBoxZoomStart', event)} // not tested; how?
        onBoxZoom={event => onStuff('onBoxZoom', event)} // not tested; how?
        onBoxZoomEnd={event => onStuff('onBoxZoomEnd', event)} // not tested; how?
        //
        // RIGHT MOUSE BUTTON
        // onContextMenu={event => onStuff('onContextMenu', event)} // ignores interactiveLayerIds

        // MOUSE/CLICK
        // onMouseEnter={event => onStuff('onMouseEnter', event)} // respects interactiveLayerIds
        // onMouseLeave={event => onStuff('onMouseLeave', event)} // respects interactiveLayerIds

        // onMouseMove={event => onStuff('onMouseMove', event)} // ignores interactiveLayerIds (does not fire in Chrome Simmulator, you need onTouchMove here)
        // onMouseOut={event => onStuff('onMouseOut', event)} // ignores interactiveLayerIds
        // onMouseOver={event => onStuff('onMouseOver', event)} // ignores interactiveLayerIds

        // onClick={event => onStuff('onClick', event)} // ignores interactiveLayerIds
        // onDblClick={event => onStuff('onDblClick', event)} // ignores interactiveLayerIds AND: also tends to fire onMoveStart and/or onMove and/or onZoomEnd

        // onMouseDown={event => onStuff('onMouseDown', event)} // ignores interactiveLayerIds
        // onMouseUp={event => onStuff('onMouseUp', event)} // ignores interactiveLayerIds

        // MOVE
        // onMoveStart={event => onStuff('onMoveStart', event)} // does not query Features; ignores interactiveLayerIds; has precedence over onDragStart
        // onMove={event => onStuff('onMove', event)} // does not query Features; ignores interactiveLayerIds; has precedence over onDrag
        // onMoveEnd={event => onStuff('onMoveEnd', event)} // does not query Features; ignores interactiveLayerIds; only fires when no onDragEnd is registred!!

        // DRAG
        // onDragStart={event => onStuff('onDragStart', event)} // does not query Features; ignores interactiveLayerIds; only fires when no onMoveStart is registred
        // onDrag={event => onStuff('onDrag', event)} // does not query Features; ignores interactiveLayerIds; only fires when no onMove is registred
        // onDragEnd={event => onStuff('onDragEnd', event)} // does not query Features; ignores interactiveLayerIds; has precedence over onMoveEnd!!

        // PITCH
        onPitchStart={event => onStuff('onPitchStart', event)} // does not query Features; ignores interactiveLayerIds; fires right before onPitch
        onPitch={event => onStuff('onPitch', event)} // does not query Features; ignores interactiveLayerIds
        onPitchEnd={event => onStuff('onPitchEnd', event)} // does not fire at all
        // ROTATE
        onRotateStart={event => onStuff('onRotateStart', event)} // does not query Features; ignores interactiveLayerIds;
        onRotate={event => onStuff('onRotate', event)} // does not query Features; ignores interactiveLayerIds
        onRotateEnd={event => onStuff('onRotateEnd', event)} // does not fire at all
        // TOUCH
        //onTouchStart={event => onStuff('onTouchStart', event)} // respects interactiveLayerIds
        //onTouchMove={event => onStuff('onTouchMove', event)} // respects interactiveLayerIds
        //onTouchEnd={event => onStuff('onTouchEnd', event)} // respects interactiveLayerIds
        onTouchCancel={event => onStuff('onTouchCancel', event)} // not tested; how?
        //
        // WHEEL
        // onWheel={event => onStuff('onWheel', event)} // does not query Features; ignores interactiveLayerIds

        // ZOOM
        // onZoomStart={event => onStuff('onZoomStart', event)} // does not query Features; ignores interactiveLayerIds; fires right before `onZoom`
        // onZoom={event => onStuff('onZoom', event)} // does not query Features; ignores interactiveLayerIds
        // onZoomEnd={event => onStuff('onZoomEnd', event)} // does not query Features; ignores interactiveLayerIds
        interactiveLayerIds={['counties']}
      >
        <Source type="vector" url="mapbox://mapbox.82pkq93d">
          <Layer beforeId="waterway-label" {...countiesLayer} />
          <Layer beforeId="waterway-label" {...highlightLayer} filter={filter} />
        </Source>
        {selectedCounty && (
          <Popup
            longitude={hoverInfo.longitude}
            latitude={hoverInfo.latitude}
            offset={[0, -10]}
            closeButton={false}
            className="county-info"
          >
            {selectedCounty}
          </Popup>
        )}
      </Map>
      <ControlPanel />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
