/**
  @author David Piegza

  Implements a label for an object.

  It creates an text in canvas and sets the text-canvas as
  texture of a cube geometry.

  Parameters:
  text: <string>, text of the label

  Example:
  var label = new THREE.Label("Text of the label");
  label.position.x = 100;
  label.position.y = 100;
  scene.addObject(label);
 */

THREE.Label = function(text, parameters) {
  var parameters = parameters || {};

  var labelCanvas   = document.createElement( "canvas" );

  function create() {
    var xc = labelCanvas.getContext("2d");
    var fontHeight = 40;

    // set font size to measure the text
    xc.font = fontHeight + "px Arial";
    var len = xc.measureText(text).width;

    labelCanvas.setAttribute('width',  len);
    labelCanvas.setAttribute('height', fontHeight);

    // set font size again cause it will be reset
    // when setting a new width
    xc.font = fontHeight + "px Arial";
    xc.textBaseline = 'top';
    xc.fillText(text, 0, 0);

    var xm = new THREE.SpriteMaterial( { map: new THREE.Texture(labelCanvas), color: 0xffffff } );
    xm.map.needsUpdate = true;

    // set text canvas to sprite geometry
    var labelObject = new THREE.Sprite( xm );
    labelObject.scale.set(len, fontHeight, 1);
    return labelObject;
  }

  return create();
}
