import { AppRegistry, View } from "react-native";
import React, { Component } from "react";
import Canvas from "react-native-web-canvas";

export default class Index extends Component {
    renderCanvas(canvas) {
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0, 0, 300, 300);
    }

    getWebViewInstance(instance) {
        console.log("webview instance------>", instance);
    }

    render() {
        return (
            <View style={{ height: 100, width: 100 ,backgroundColor :'gray' }}>
                <Canvas
                    renderCanvas={this.renderCanvas}
                    getWebViewInstance={instance => this.getWebViewInstance(instance)}
                    dimensions={{ height: 300, width: 300 }}
                    style={{ backgroundColor: "yellow" , width :100, height :300 }}
                />
            </View>
        );
    }
}