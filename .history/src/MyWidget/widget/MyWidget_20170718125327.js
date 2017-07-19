define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",
    "mxui/dom",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/text!MyWidget/widget/template/MyWidget.html"],
    function (declare, _WidgetBase, _TemplatedMixin,
        dom, lang, dojoText,
        dojoHtml, widgetTemplate) {
    "use strict" // this is using strict
        return declare("MyWidget.widget.MyWidget", [_WidgetBase, _TemplatedMixin], {
            templateString: widgetTemplate,
            reverseText: " ",
            dropDown: " ",
            insertText: " ",
            _contextObject: null,

           /* update: function (obj, callback) {
            logger.debug(this.id + ".update");
            this._contextObject = insertText;
           },
           var myData = _contextObject.get(insertText),*/
           postCreate: function () {
            logger.debug(this.id + ".postCreate");

            if (this.readOnly || this.get("disabled") || this.readonly) {
              this._readOnly = true;
            }

            this._updateRendering();
            this._setupEvents();
        },
        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;
            this._resetSubscriptions();
            this._updateRendering(callback); // We're passing the callback to updateRendering to be called after DOM-manipulation
        },
        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");
            this.colorSelectNode.disabled = this._readOnly;
            this.colorInputNode.disabled = this._readOnly;

            if (this._contextObj !== null) {
                dojoStyle.set(this.domNode, "display", "block");

                var colorValue = this._contextObj.get(this.backgroundColor);

                this.colorInputNode.value = colorValue;
                this.colorSelectNode.value = colorValue;

                dojoHtml.set(this.infoTextNode, this.messageString);
                dojoStyle.set(this.infoTextNode, "background-color", colorValue);
            } else {
                dojoStyle.set(this.domNode, "display", "none");
            }

            // Important to clear all validations!
            this._clearValidations();

            // The callback, coming from update, needs to be executed, to let the page know it finished rendering
            this._executeCallback(callback, "_updateRendering");
        },
            reversingFunction: function () {
                this.reverseText.innerHTML = ":" + reversedString(this.myPointedString.value);
            },
            reversedString: function () {
                this.reverseText.innerHTML = this.myPointedString.value.split("").reverse().join("");
            },                        
        });
    });
require(["MyWidget/widget/MyWidget"]);
