"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const ProjectNode_1 = require("./model/nodes/ProjectNode");
const ProjectErrorNode_1 = require("./model/nodes/ProjectErrorNode");
class TaskProvider {
    constructor(context, twp) {
        this.context = context;
        this.twp = twp;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    getChildren(element) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!element) {
                    const items = [];
                    var config = yield this.twp.GetProjectForRepository();
                    if (config) {
                        config.Projects.forEach(element => {
                            items.push(new ProjectNode_1.ProjectNode("Project: " + element.Name, element.Id, this.twp));
                        });
                        return items;
                    }
                    if (!config) {
                        items.push(new ProjectErrorNode_1.ProjectErrorNode("-> Select Project for Repository", "", "", 0));
                        return items;
                    }
                }
                return element.getChildren(this.context);
            }
            catch (_a) {
                const items = [];
                items.push(new ProjectErrorNode_1.ProjectErrorNode("-> Select Project for Repository", "", "", 0));
                return items;
            }
        });
    }
    getTreeItem(element) {
        return element.getTreeItem();
    }
}
exports.TaskProvider = TaskProvider;
//# sourceMappingURL=taskProvider.js.map