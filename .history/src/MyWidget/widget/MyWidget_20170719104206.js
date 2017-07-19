define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/dom-style",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/text!MyWidget/widget/template/MyWidget.html"],
    function (declare, _WidgetBase, _TemplatedMixin, dom, dojoStyle, lang, dojoText, dojoHtml, widgetTemplate) {
        "use strict" // this is using strict
        return declare("MyWidget.widget.MyWidget", [_WidgetBase, _TemplatedMixin], {
            templateString: widgetTemplate,

            // dojo attachment point in templatehtml
            reverseText: "",
            textToReverse: "",
            mfToExecute: "",

            // from modeler
            insertText: "",

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
            callMicroflow: function () {
                this._execMf(this.mfToExecute, this._contextObject.getGuid());
            },
            _setupEvents: function () {
                logger.debug(this.id + "._setupEvents");
                this.connect(this.reverseText, "change", function (e) {
                    // Function from mendix object to set an attribute.
                    this._contextObject.set(this.backgroundColor, this.colorSelectNode.value);
                });

               /* this.connect(this.infoTextNode, "click", function (e) {
                    // Only on mobile stop event bubbling!
                    this._stopBubblingEventOnMobile(e);

                    // If a microflow has been set execute the microflow on a click.
                    if (this.mfToExecute !== "") {
                        this._execMf(this.mfToExecute, this._contextObj.getGuid());
                    }
                });*/
            },
            _execMf: function (mf, guid, cb) {
                logger.debug(this.id + "._execMf");
                if (mf && guid) {
                    mx.ui.action(mf, {
                        params: {
                            applyto: "selection",
                            guids: [guid]
                        },
                        callback: lang.hitch(this, function (objs) {
                            if (cb && typeof cb === "function") {
                                cb(objs);
                            }
                        }),
                        error: function (error) {
                            mx.ui.error("Error executing microflow " + mf + " : " + error.message);
                            console.error(this.id + "._execMf", error);
                        }
                    }, this);
                }
            },
            _updateRendering: function (callback) {
                logger.debug(this.id + "._updateRendering");
                if (this._contextObject !== null) {
                    dojoStyle.set(this.domNode, "display", "block");
                    var textValue = this._contextObject.get(this.insertText);
                    // dojoHtml.set(this.reverseText, this.reversedString(textValue));
                    this.reversedString(textValue);
                    this.saveFunction(_contextObject);
                    // or

                } else {
                    dojoStyle.set(this.domNode, "display", "none");
                }
                this._executeCallback(callback, "_updateRendering");
            },
            reversedString: function (reverseString) {
                this.reverseText.innerHTML = reverseString.split("").reverse().join("");
            },
            _executeCallback: function (cb, from) {
                if (cb && typeof cb === "function") {
                    cb();
                }
            },
            /*saveFunction: function () {
                mx.data.save({
                    mxobj: _contextObject,
                    callback: function () {
                        console.log("ok");
                    }
                });
            },*/
        });
    }
);
require(["MyWidget/widget/MyWidget"]);
