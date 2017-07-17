<div class="combinedDateTime">
   <div data-dojo-type="dijit/form/DateTextBox"></div>
   <div data-dojo-type="dijit/form/TimeTextBox"></div>
</div>
// data-dojo-attach-point
//the data-dojo-attach-point becomes a pointer to the sub-widget, not to a DOM node
<div class="combinedDateTime">
   <div data-dojo-type="dijit/form/DateTextBox" data-dojo-attach-point="start"></div>
   <div data-dojo-type="dijit/form/TimeTextBox" data-dojo-attach-point="end"></div>
</div>
this.start.set('value', new Date());
//data-dojo-attach-event
// functions to attach a widget event (not a DOM event) on the sub widget
// to the main widget. For example, consider InlineEditBox which embeds dijit buttons into it’s own template:
<fieldset data-dojo-attach-point="editNode" role="presentation" style="position: absolute; visibility:hidden" class="dijitReset dijitInline"
  data-dojo-attach-event="onkeypress: _onKeyPress"
  ><div data-dojo-attach-point="editorPlaceholder"></div
  ><span data-dojo-attach-point="buttonContainer"
      ><button class='saveButton' data-dojo-attach-point="saveButton"
              data-dojo-type="dijit/form/Button" data-dojo-attach-event="onClick:save" disabled="true">
          ${buttonSave}
      </button
      ><button class='cancelButton' data-dojo-attach-point="cancelButton"
              data-dojo-type="dijit/form/Button" data-dojo-attach-event="onClick:cancel">
          ${buttonCancel}
      </button
  ></span
></fieldset>
//NB: Don’t try to make the root node itself a widget. That’s not supported 
//(that would make the top node the root of two separate widgets and we can’t support that).

