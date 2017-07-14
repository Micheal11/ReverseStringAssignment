    define ([
    "dojo/_base/declare" , "mxui/widget/_WidgetBase" , "dijit/_TemplatedMixin",
    "mxui/dom" , "dojo/dom" , "dojo/dom-prop" , "dojo/dom-geometry" , "dojo/dom-class",
    "dojo/dom-style" , "dojo/dom-construct" , "dojo/_base/array" , "dojo/_base/lang",
    "dojo/text" , "dojo/html" , "dojo/_base/event",
    "MyWidget/lib/jquery-1.11.2" , "dojo/text!MyWidget/widget/template/MyWidget.html"

], function (declare, _WidgetBase, _TemplatedMixin, 
                dom, dojoDom, dojoProp, 
                dojoGeometry, dojoClass, dojoStyle,
                 dojoConstruct, dojoArray, lang,
                  dojoText, dojoHtml, dojoEvent, 
                  _jQuery, widgetTemplate) {
    "use strict";
    var $ = _jQuery.noConflict(true);
    return declare("MyWidget.widget.MyWidget", [ _WidgetBase, _TemplatedMixin ], {
        templateString: widgetTemplate,

        reverseText: null,

        reversingFunction: function(){
            this.reverseText.innerHTML = ":"+reversedString(this.myPointedString.value);
             
        },
        
        mfToExecute: "",

        _contextObj: null,
        _readOnly: false,

        update: function (obj, callback) {
            logger.debug(this.id + ".update");

            this._contextObj = obj;
            this._resetSubscriptions();
            this._updateRendering(callback); 
        },

        resize: function (box) {
          logger.debug(this.id + ".resize");
        },

        uninitialize: function () {
          logger.debug(this.id + ".uninitialize");
            
        },
        
        _setupEvents: function () {
            logger.debug(this.id + "._setupEvents");
            
            this.connect(this.reverseText, "click", function (e) {

                if (this.mfToExecute !== "") {
                    this._execMf(this.mfToExecute, this._contextObj.getGuid());
                }
            });
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
                        console.debug(error.description);
                    }
                }, this);
            }
        },
        
        reversedString: function () {
              this.reverseText.innerHTML= this.myPointedString.value.split("").reverse().join("");             
        },

        _updateRendering: function (callback) {
            logger.debug(this.id + "._updateRendering");

            this._executeCallback(callback, "_updateRendering");
        },

        _resetSubscriptions: function () {
            this.unsubscribeAll();

            if (this._contextObj) {
                this.subscribe({
                    guid: this._contextObj.getGuid(),
                    callback: lang.hitch(this, function (guid) {
                        this._updateRendering();
                    })
                });

            }
        },

        _executeCallback: function (cb, from) {
            logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["MyWidget/widget/MyWidget"]);