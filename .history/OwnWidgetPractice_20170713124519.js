constructor: function(params, srcNodeRef){
    console.log("creating widget with params " + dojo.toJson(params) + " on node " + srcNodeRef);
}
require([
    "dojo/_base/declare", "dojo/parser", "dojo/ready",
    "dijit/_WidgetBase",
], function(declare, parser, ready, _WidgetBase){

    declare("MyFirstBehavioralWidget", [_WidgetBase], {
        // put methods, attributes, etc. here
    });
    ready(function(){
        // Call the parser manually so it runs after our widget is defined, and page has finished loading
        parser.parse();
    });
});
<span data-dojo-type="MyFirstBehavioralWidget">hi</span>
new MyWidget({})
// the parser is only needed, if you want
// to instantiate the widget declaratively (in markup)
require([
    "dojo/_base/declare", "dojo/dom-construct", "dojo/ready", "dojo/_base/window",
    "dijit/_WidgetBase",
], function(declare, domConstruct, ready, win, _WidgetBase){

    declare("MyFirstWidget", [_WidgetBase], {
        buildRendering: function(){
            // create the DOM for this widget
            this.domNode = domConstruct.create("button", {innerHTML: "push me"});
        }
    });

    ready(function(){
        // Create the widget programmatically and place in DOM
        (new MyFirstWidget()).placeAt(win.body());
    });
 });
require([
    "dojo/_base/declare", "dojo/dom-construct", "dojo/parser", "dojo/ready",
    "dijit/_WidgetBase",
], function(declare, domConstruct, parser, ready,_WidgetBase){
    declare("Counter", [_WidgetBase], {
        // counter
        _i: 0,

        buildRendering: function(){
            // create the DOM for this widget
            this.domNode = domConstruct.create("button", {innerHTML: this._i});
        },

        postCreate: function(){
            // every time the user clicks the button, increment the counter
            this.connect(this.domNode, "onclick", "increment");
        },

        increment: function(){
            this.domNode.innerHTML = ++this._i;
        }
    });

    ready(function(){
        // Call the parser manually so it runs after our widget is defined, and page has finished loading
        parser.parse();
    });
});
<span data-dojo-type="Counter"></span>
<div data-dojo-type="FancyCounter" data-dojo-props="label:'counter label'">button label</div>
