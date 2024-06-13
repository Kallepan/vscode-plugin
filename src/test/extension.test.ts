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
  let mockExtensionContext: vscode.ExtensionContext;

  teardown(() => {
    sandbox.restore();
  });

  test("Fetch request is made", () => {
    const fetchStub = sandbox.stub(global, "fetch").resolves();
    activate(mockExtensionContext);
    assert.ok(fetchStub.calledOnce);
  });

  test("Error message is shown when fetch request fails", () => {
    const fetchStub = sandbox.stub(global, "fetch").rejects();
    const showErrorMessageSpy = sandbox.spy(vscode.window, "showErrorMessage");
    activate(mockExtensionContext);
    assert.ok(showErrorMessageSpy.calledOnce);
  });

  test("Webview is created on command execution", async () => {
    const showWebviewPanelSpy = sandbox.spy(
      vscode.window,
      "createWebviewPanel"
    );
    await vscode.commands.executeCommand("kite-usermon.openUserMon");
    assert.ok(showWebviewPanelSpy.calledOnce);
  });
});
