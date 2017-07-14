define ([ 
        "dojo/_base/declare",
        "mxui/widget/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "mxui/dom", 
       // "dojo/dom", 
        "dojo/dom-style",  
        "dojo/_base/lang",
        "dojo/text", 
        "dojo/html", 
        "dojo/_base/event", 
        "dojo/text!MyWidget/widget/template/MyWidget.html"],
         function (  declare, _WidgetBase, _TemplatedMixin, 
                     dom, //dojoDom,  
                      dojoStyle,
                     lang, dojoText,
                     dojoHtml, dojoEvent,  widgetTemplate) {
                       "use strict";
                        return declare("MyWidget.widget.MyWidget", [ _WidgetBase, _TemplatedMixin ], {
                            templateString: widgetTemplate,
                            reverseText: null,
                            reversingFunction: function(){
                            this.reverseText.innerHTML = ":"+reversedString(this.myPointedString.value);
                        },
        
        //mfToExecute: "",

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