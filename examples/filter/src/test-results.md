# Potential issues

- [] onDragEnd vs. onDragStart/onDrag behavior is unexpected
- [] secondary Events "onDblClick" could be added as an info to the docs
- [] the fact that onMouseMove does not fire on Mobile (at least not in simmulator) could be added as in info to the docs
- [] onTouchMove does respect `interactiveLayerIds` but onMouseMove does not; does that inconsistency make sense

# Test

| event               | query features                                              | notes                                                                |
| ------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------- |
| `onBoxZoomStart`    | -                                                           | not tested; how?                                                     |
| `onBoxZoom`         | -                                                           | not tested; how?                                                     |
| `onBoxZoomEnd`      | -                                                           | not tested; how?                                                     |
| `onContextMenu`     | ignores `interactiveLayerIds`                               |                                                                      |
| `onMouseEnter`      | respects `interactiveLayerIds`                              |                                                                      |
| `onMouseLeave`      | respects `interactiveLayerIds`                              |                                                                      |
| `onMouseMove`       | ignores `interactiveLayerIds`                               | Issue? Does not fire in Chrome Simmulator, you need onTouchMove here |
| `onMouseOut` (Map)  | ignores `interactiveLayerIds`                               |                                                                      |
| `onMouseOver` (Map) | ignores `interactiveLayerIds`                               |                                                                      |
| `onClick`           | ignores `interactiveLayerIds`                               |                                                                      |
| `onDblClick`        | ignores `interactiveLayerIds`                               | Note: Also tends to fire onMoveStart and/or onMove and/or onZoomEnd  |
| `onMouseDown`       | ignores `interactiveLayerIds`                               |                                                                      |
| `onMouseUp`         | ignores `interactiveLayerIds`                               |                                                                      |
| `onMoveStart`       | does not query Features (AKA ignores `interactiveLayerIds`) | `onMoveStart` has precedence over `onDragStart`                      |
| `onMove`            | does not query Features (AKA ignores `interactiveLayerIds`) | `onMove` has precedence over `onDrag`                                |
| `onMoveEnd`         | does not query Features (AKA ignores `interactiveLayerIds`) | `onMoveEnd` only fires when no `onDragEnd` is registred!!            |
| `onDragStart`       | does not query Features (AKA ignores `interactiveLayerIds`) | `onDragStart` only fires when no `onMoveStart` is registred          |
| `onDrag`            | does not query Features (AKA ignores `interactiveLayerIds`) | `onDrag` only fires when no `onMove` is registred                    |
| `onDragEnd`         | does not query Features (AKA ignores `interactiveLayerIds`) | `onDragEnd` has precedence over `onMoveEnd`!!                        |
| `onPitchStart`      | does not query Features (AKA ignores `interactiveLayerIds`) |                                                                      |
| `onPitch`           | does not query Features (AKA ignores `interactiveLayerIds`) |                                                                      |
| `onPitchEnd`        | does not query Features (AKA ignores `interactiveLayerIds`) |                                                                      |
| `onRotateStart`     | does not query Features (AKA ignores `interactiveLayerIds`) |                                                                      |
| `onRotate`          | does not query Features (AKA ignores `interactiveLayerIds`) |                                                                      |
| `onRotateEnd`       | does not query Features (AKA ignores `interactiveLayerIds`) |                                                                      |
| `onTouchStart`      | respects `interactiveLayerIds`                              |                                                                      |
| `onTouchMove`       | respects `interactiveLayerIds`                              | Issue? Expected to behave like `onMouseMove`                         |
| `onTouchEnd`        | respects `interactiveLayerIds`                              |                                                                      |
| `onTouchCancel`     | -                                                           | not tested; how?                                                     |
| `onWheel`           | does not query Features (AKA ignores `interactiveLayerIds`) |                                                                      |
| `onZoomStart`       | does not query Features (AKA ignores `interactiveLayerIds`) |                                                                      |
| `onZoom`            | does not query Features (AKA ignores `interactiveLayerIds`) |                                                                      |
| `onZoomEnd`         | does not query Features (AKA ignores `interactiveLayerIds`) |                                                                      |
