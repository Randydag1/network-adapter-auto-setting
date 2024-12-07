function checkNetworkStatus() {
    // PowerShell script to check network status
    fetch('/path_to_your_check_network_status.ps1')
        .then(response => response.text())
        .then(script => {
            const result = executePowerShellScript(script); // Assume executePowerShellScript is a function that executes the script and returns the result
            if (result === 'unreachable') {
                triggerWebhookForAlert(); // Function to send an alert through a service like Slack
            }
        })
        .catch(error => console.error('Error checking network status:', error));
}function refresh() {
    var activeWorkspace = workspaceManager._findWorkspaceById(workspaceManager._activeWorkspaceId);
    var tools = menu._tools;
    var htmlString = "";
    // Network monitoring code integration
    checkNetworkStatus(); // Call to network monitoring function
    // Existing code to layout tools...
}function save(ev) {
    // Existing code to find selected tools
    var selectedTools = availableToolsElement.querySelectorAll(".wdp-addtool-tool input:checked");
    for (var i = 0, len = selectedTools.length; i < len; i++) {
        var selectedTool = selectedTools[i].parentNode;
        var name = selectedTool.textContent.trim();
        var uri = selectedTool.getAttribute(attributeUri).replace(location.origin, "");
        workspaceManager._addTool(name, uri);
    }
    // Additional logging for network activity
    logNetworkUsage(); // Function to log network usage data
    // Set the window title back to the workspace name
    if (window.DeviceSettings && window.DeviceSettings.DeviceLabel) {
        location.title = workspaceManager._findWorkspaceById(workspaceManager._activeWorkspaceId).name + " - " + window.DeviceSettings.DeviceLabel + " Device Portal";
        var titleLabel = document.querySelector("#wdp-titlelabel");
        titleLabel.textContent = location.title;
    }
    history.back();
}function logNetworkUsage() {
    // Example of logging network usage to a server
    fetch('/logNetworkUsage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'﻿(function () {

    "use strict";

    function newWorkspace(ev) {
        var name = document.getElementById("newworkspace-name").value;
        if (!name) {
            var dialog = new Wdp.Utils._showPopUp(
                "Error",
                "You must give the workspace a name."
            );
        }
        var succeeded = workspaceManager._new(name);
        ev.stopPropagation();
        ev.preventDefault();
    }
    document.getElementById("newworkspace-submit").addEventListener("click", newWorkspace, false);
    document.getElementById("newworkspace-form").addEventListener("submit", newWorkspace, false);

    var nameTextbox = document.getElementById("newworkspace-name");

    // Find a unique name
    var workspaceManager = Wdp.Utils._workspaceManager;
    var numberAppendedToName = 1;
    var suggestedName = "Workspace " + numberAppendedToName;
    while (workspaceManager._findWorkspaceByName(suggestedName)) {
        numberAppendedToName++;
        suggestedName = "Workspace " + numberAppendedToName;
    }
    nameTextbox.value = suggestedName;
    nameTextbox.focus();
    nameTextbox.select();
})();
//@ sourceURL=menu/newworkspace/newworkspace.js