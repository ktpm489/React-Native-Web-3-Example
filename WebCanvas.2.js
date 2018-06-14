/**
 * Created by Zyf on 2017/8/2.
 * 基于webview的Canvas画布
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    WebView,
    TouchableOpacity
} from 'react-native';
var html =
    `<html>
  <head></head>
  <body>
    <h1 id='toto'>TATA</h1>

    <br />

    <div id="sketch">
      <canvas id="paint" style='border: 1px solid black'></canvas>
    </div>

    <script>
      (function() {
        var canvas = document.querySelector('#paint');
        var ctx = canvas.getContext('2d');

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        var mouse = {x: 0, y: 0};

        var start_events = ["mousedown", "touchstart"];
        var move_events = ["mousemove", "touchmove"];
        var end_events = ["mouseup", "touchend"];

        /* Mouse Capturing Work */
        move_events.forEach(function(event) {
          canvas.addEventListener(event, function(e) {
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
          }, false);
        });

        /* Drawing on Paint App */
        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'back';

        start_events.forEach(function(event) {
          canvas.addEventListener(event, function(e) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);

            move_events.forEach(function(me){ canvas.addEventListener(me, onPaint, false); });
          }, false);
        });


        end_events.forEach(function(event) {
          canvas.addEventListener(event, function(e) {
            move_events.forEach(function(me){ canvas.removeEventListener(me, onPaint, false); });
          }, false);
        });


        var onPaint = function() {
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        };

      }());
    </script>
  </body>
</html>`;

var _width, _height;
export default class WebCanvas extends Component {
    render() {
        return (
            <WebView
                source={html}
                style={styles.container}
                javaScriptEnabledAndroid={true}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
       // alignItems: 'flex-start',
         width :300,
         height :800,
         overflow: 'hidden',
       // paddingVertical:  30,
        backgroundColor: 'green',

    }
});  