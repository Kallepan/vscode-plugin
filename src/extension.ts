// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const url = "https://www.example.com/";

  // Do a fetch request to see if the user is online
  fetch(url)
    .then(() => {
      console.log("User is online");
    })
    .catch(() => {
      vscode.window.showErrorMessage(
        "You are offline. Please check your internet connection."
      );
    });

  const openUrlDisposable = vscode.commands.registerCommand(
    "kite-usermon.openUserMon",
    function () {
      const panel = vscode.window.createWebviewPanel(
        "kiteUserMon",
        "Kite User Monitoring",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
        }
      );

      panel.webview.html = `
	  <!DOCTYPE html>
	  <html lang="de">
	  <head>
	  	<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Kite User Monitoring</title>
		<style>
			html, body {
				height: 100%;
				margin: 0;
				padding: 0;
			}
		</style>
	  </head>
	  <body>
	  	<iframe src="${url}" style="width: 100%; height: 100%; border: none;"></iframe>
	  </body>
	  </html>
	  `;
    }
  );

  context.subscriptions.push(openUrlDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
