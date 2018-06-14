"use strict";
import React, { Component } from "react";
import { WebView } from "react-native";

export default class WebViewExample extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var renderCanvas = this.props.renderCanvas && this.props.renderCanvas.toString();
        var dimensions = this.props.dimensions;

        return (
            <WebView
                ref={webview =>
                    this.props.getWebViewInstance &&
                    this.props.getWebViewInstance(webview)}
                source={{
                    html:
                        "<html><style>  *{margin:0;padding:0;} canvas{position:absolute;transform:translateZ(0);}</style></style></style><body><canvas></canvas></body></html><script>" +
                        "var canvas = document.querySelector('canvas');" +
                        "if(" + dimensions.height + "){canvas.height=" + dimensions.height + "}" +
                        "if(" + dimensions.width + "){canvas.width=" + dimensions.width + "}" +
                        "(" + renderCanvas + ")(canvas);" +
                        "</script>"
                }}
                javaScriptEnabled={true}
                style={this.props.style}
            />
        );
    }
}
