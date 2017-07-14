define ([ 
        "dojo/_base/declare",
        "mxui/widget/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "mxui/dom", 
        "dojo/_base/lang",
        "dojo/text", 
        "dojo/html",  
        "dojo/text!MyWidget/widget/template/MyWidget.html"],
         function ( declare, _WidgetBase, _TemplatedMixin, 
                    dom, lang, dojoText,
                    dojoHtml, widgetTemplate ) {
                        "use strict";
                        return declare("MyWidget.widget.MyWidget", [ _WidgetBase, _TemplatedMixin ], {
                            templateString: widgetTemplate,
                            reverseText: null,
                            reversingFunction: function(){
                                this.reverseText.innerHTML = ":"+reversedString(this.myPointedString.value);
                            },
                            _contextObj: null,
                            update: function (obj, callback) {
                                logger.debug(this.id + ".update");
                                this._contextObj = obj;
                                this._resetSubscriptions();
                                this._updateRendering(callback); 
                            }, 
                            reversedString: function () {
                                this.reverseText.innerHTML= this.myPointedString.value.split("").reverse().join("");             
                            },
                            _updateRendering: function (callback) {
                                logger.debug(this.id + "._updateRendering");
                                this._executeCallback(callback, "_updateRendering");
                            },
                            /*_resetSubscriptions: function () {
                            this.unsubscribeAll();
                            if (this._contextObj) {
                                this.subscribe( {
                                    guid: this._contextObj.getGuid(),
                                    callback: lang.hitch(this, function (guid) {
                                        this._updateRendering();
                                    })
                                });
                            }
                            },*/
                    _executeCallback: function (cb, from) {
                        logger.debug(this.id + "._executeCallback" + (from ? " from " + from : ""));
                        if (cb && typeof cb === "function") {
                            cb();
                        }
                    }
                });
});

require(["MyWidget/widget/MyWidget"]);