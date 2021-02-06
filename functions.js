    function isBase64(str) {
        try {
            return Buffer.from(Buffer.from(str, "base64").toString()).toString('base64') == str;
        } catch (err) {
            return false;
        }
    }


    function binaryToString(str) {

        var newBin = str.split(" ");
        var binCode = [];

        for (var i = 0; i < newBin.length; i++) {
            binCode.push(String.fromCharCode(parseInt(newBin[i], 2)));
        }
        return binCode.join("");
    }

    function textToBinary(string) {
        return string.split('').map(function(char) {
            return char.charCodeAt(0).toString(2);
        }).join(' ');
    }

    function isUtf8(str) {

        return str.replace(/[^\x20-\x7E]+/g, '') == str;

    }

    module.exports = {

        isBase64,
        binaryToString,
        textToBinary,
        isUtf8

    }