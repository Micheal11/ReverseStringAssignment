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
            messageAttribute: " ",
            _contextObject: null,

           postCreate: function () {
            logger.debug(this.id + ".postCreate");

            if (this.readOnly || this.get("disabled") || this.readonly) {
              this._readOnly = true;
            }

            this._updateRendering();
          //  this._setupEvents();
        },
        update: function (object, callback) {
            logger.debug(this.id + ".update");

            this._contextObject = object;
            this._resetSubscriptions();
            this._updateRendering(callback); // We're passing the callback to updateRendering to be called after DOM-manipulation
        },
        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");
            if (this._contextObject !== null) {
                dojoStyle.set(this.domNode, "display", "block");

                var myStrings = this._contextObject.get(this.messageAttribute);

               
                dojoHtml.set(this.reverseText, this.reversedString(myStrings));
                  } else {
                dojoStyle.set(this.domNode, "display", "none");
            }

            // Important to clear all validations!
            this._clearValidations();

            // The callback, coming from update, needs to be executed, to let the page know it finished rendering
            this._executeCallback(callback, "_updateRendering");
        },
            reversingFunction: function () {
                //this.reverseText.innerHTML = ":" + reversedString(this.myPointedString.value);
            },
            reversedString: function (string) {
                this.reverseText.innerHTML = this.string.value.split("").reverse().join("");
            },                        
        });
    });
require(["MyWidget/widget/MyWidget"]);
