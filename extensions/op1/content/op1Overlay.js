Components.utils.import("resource://app/modules/prompterHelper.jsm");
Components.utils.import("resource://app/modules/editorHelper.jsm");
Components.utils.import("resource://app/modules/l10nHelper.jsm");
Components.utils.import("resource://gre/modules/Services.jsm");

if (typeof com == "undefined") com = {};
if (typeof com.bluegriffon == "undefined") com.bluegriffon = {};

var cmdOp1Command =
{
  isCommandEnabled: function(aCommand, dummy)
  {
    return (EditorUtils.getCurrentEditorElement() &&
            EditorUtils.isDocumentEditable() &&
            EditorUtils.isEditingRenderedHTML() &&
            GetCurrentViewMode() == "wysiwyg");
  },

  getCommandStateParams: function(aCommand, aParams, aRefCon) {},
  doCommandParams: function(aCommand, aParams, aRefCon) {},

  doCommand: function(aCommand)
  {
    var op1Window = Services.wm.getMostRecentWindow("Opquast:a11yFirstStep");
    if (op1Window) {
      op1Window.focus()
    }
    else
      window.openDialog("chrome://op1/content/op1.xul","_blank",
                        "chrome,dialog=no,modal=no,titlebar=yes,resizable=yes");
  }
};

var Op1Helper = {

  startup: function()
  {
    window.removeEventListener('load', Op1Helper.startup, false);

    var commandTable = ComposerCommands.getComposerCommandTable();
    commandTable.registerCommand("cmd_op1", cmdOp1Command);
  }

};
window.addEventListener('load', Op1Helper.startup, false);
