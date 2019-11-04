/*
  model.js

  This file is required. It must export a class with at least one public function called `getData`

  Documentation: https://koopjs.github.io/docs/usage/provider
*/

function Model (koop) {}

// Public function to return data from the
// Return: GeoJSON FeatureCollection
//
// Config parameters (config/default.json)
// req.
//
// URL path parameters:
// req.params.host (if index.js:hosts true)
// req.params.id  (if index.js:disableIdParam false)
// req.params.layer
// req.params.method

const request = require('request').defaults({gzip: true, json: true});
const atob = require('atob');
const b64 = "SGVsbG8sIFdvcmxkIQ==";
const bin = atob(b64);

String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

Model.prototype.getData = function (req, callback) {
    let url = atob(req.params.host);
    url = url.replaceAll('_', '/');

    request(`${atob(req.params.host)}`, (err, res, body) => {
        if (err) return callback(err)

        const geojson = body

        callback(null, geojson)
    });
}

module.exports = Model
