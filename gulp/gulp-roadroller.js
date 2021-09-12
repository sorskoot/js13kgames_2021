const path = require('path');
const through = require('through2');
const Packer = require('roadroller');


module.exports = (options = {
    contextBits:12,
    maxMemoryMB:150
}) => {
    return through.obj(async function (file, encoding, callback) {
        if (file.isDirectory() || file.isNull() || file.isStream()) {
            return callback(null, file);
        }
        const inputs = [
            {
                data: String(file.contents),
                type: 'js',
                action: 'eval',
            },
        ];
        
        const packer = new Packer.Packer(inputs, {
            contextBits: options.contextBits || 3,
            maxMemoryMB: options.maxMemoryMB || 150,
            
        });
        await packer.optimize();
        const { firstLine, secondLine } = packer.makeDecoder();
        file.contents = Buffer.from(firstLine + '\n' + secondLine);

        return callback(null, file)
    });
};