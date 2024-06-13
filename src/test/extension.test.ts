import * as assert from "assert";
import * as sinon from "sinon";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import { activate } from "../extension";
// import * as myExtension from '../../extension';

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  let sandbox: sinon.SinonSandbox;

  setup(() => {
    sandbox = sinon.createSandbox();
  });

  teardown(() => {
    sandbox.restore();
  });

  test("Webview is created on command execution", async () => {
    const showWebviewPanelSpy = sandbox.spy(
      vscode.window,
      "createWebviewPanel"
    );
    await vscode.commands.executeCommand("kite-usermon.openUserMon");
    assert.ok(showWebviewPanelSpy.calledOnce);
  });

  test("Webview is created with correct title", async () => {
    const showWebviewPanelSpy = sandbox.spy(
      vscode.window,
      "createWebviewPanel"
    );
    await vscode.commands.executeCommand("kite-usermon.openUserMon");
    assert.ok(
      showWebviewPanelSpy.calledWith("kiteUserMon", "Kite User Monitoring")
    );
  });
});
