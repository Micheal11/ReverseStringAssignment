define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/dom-style",
    "dojo/text",
    "dojo/html",
    "dojo/text!MyWidget/widget/template/MyWidget.html"],
    function (declare, _WidgetBase, _TemplatedMixin, dom, dojoStyle, dojoText, dojoHtml, widgetTemplate) {
        "use strict" // this is using strict
        return declare("MyWidget.widget.MyWidget", [_WidgetBase, _TemplatedMixin], {
            templateString: widgetTemplate,
            reverseText: " ",
            dropDown: " ",
            insertText: " ",
            _contextObject: null,
           postCreate: function () {
                logger.debug(this.id + ".postCreate");
                if (this.readOnly || this.get("disabled") || this.readonly) {
                this._readOnly = true;
                }
                this._updateRendering();
            },
            update: function (object, callback) {
                logger.debug(this.id + ".update");
                this._contextObject = object;
                this._updateRendering(callback);
            },
            _updateRendering: function (callback) {
                logger.debug(this.id + "._updateRendering");
                if (this._contextObject !== null) {
                    dojoStyle.set(this.domNode, "display", "block");
                    var textValue = this._contextObject.get(this.insertText);               
                    dojoHtml.set(this.reverseText, this.reversedString(textValue));
                } else {
                    dojoStyle.set(this.domNode, "display", "none");
                }
                this._executeCallback(callback, "_updateRendering");
            },
                reversingFunction: function () {
                    //this.reverseText.innerHTML = ":" + reversedString(this.myPointedString.value);
                },
                reversedString: function (string) {
                    this.reverseText.innerHTML = this.string.value.split("").reverse().join("");
                },                        
        });
    }
);
require(["MyWidget/widget/MyWidget"]);
