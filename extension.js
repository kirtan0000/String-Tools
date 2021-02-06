const vscode = require('vscode');
const functions = require('./functions');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


    context.subscriptions.push(vscode.commands.registerCommand('string-tools.reverseString', function() {

        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            editor.edit(editBuilder => {
                editor.selections.forEach(sel => {
                    const range = sel.isEmpty ? document.getWordRangeAtPosition(sel.start) || sel : sel;
                    let word = document.getText(range);
                    let reversed = word.split('').reverse().join('');
                    editBuilder.replace(range, reversed);
                })
            })
        };
    }));

    context.subscriptions.push(vscode.commands.registerCommand('string-tools.StrToBase64', function() {

        const editor = vscode.window.activeTextEditor;

        const document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(sel => {
                const range = sel.isEmpty ? document.getWordRangeAtPosition(sel.start) || sel : sel;
                let word = document.getText(range);
                let toBase64 = Buffer.from(word).toString('base64');
                editBuilder.replace(range, toBase64);
            })
        });

    }));




    context.subscriptions.push(vscode.commands.registerCommand('string-tools.Base64ToStr', function() {

        const editor = vscode.window.activeTextEditor;

        const document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(sel => {
                const range = sel.isEmpty ? document.getWordRangeAtPosition(sel.start) || sel : sel;
                let word = document.getText(range);
                let toStr = Buffer.from(word, "base64").toString();
                try {
                    if (!(functions.isBase64(word))) {

                        vscode.showInformationMessage('String is not in Base64!');

                    } else {
                        editBuilder.replace(range, toStr);
                    }
                } catch (err) {

                    vscode.window.showInformationMessage('String is not valid Base64!');


                }
            })
        });

    }));



    context.subscriptions.push(vscode.commands.registerCommand('string-tools.StrToAscii', function() {

        const editor = vscode.window.activeTextEditor;

        const document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(sel => {
                const range = sel.isEmpty ? document.getWordRangeAtPosition(sel.start) || sel : sel;
                let word = document.getText(range);
                let toAscii = word.charCodeAt(0).toString();
                editBuilder.replace(range, toAscii);
            })
        });

    }));


    context.subscriptions.push(vscode.commands.registerCommand('string-tools.StrToBinary', function() {

        const editor = vscode.window.activeTextEditor;

        const document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(sel => {
                const range = sel.isEmpty ? document.getWordRangeAtPosition(sel.start) || sel : sel;
                let word = document.getText(range);
                let toBinary = functions.textToBinary(word);
                editBuilder.replace(range, toBinary);
            })
        });

    }));

    context.subscriptions.push(vscode.commands.registerCommand('string-tools.BinaryToStr', function() {

        const editor = vscode.window.activeTextEditor;

        const document = editor.document;
        editor.edit(editBuilder => {
            editor.selections.forEach(sel => {
                const range = sel.isEmpty ? document.getWordRangeAtPosition(sel.start) || sel : sel;
                let word = document.getText(range);
                let binToStr = functions.binaryToString(word);
                // Check if there is valid utf-8
                editBuilder.replace(range, functions.isUtf8(binToStr) ? binToStr : word);
            })
        });

    }));



}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}