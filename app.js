// derived from https://github.com/SignalK/signalk-derived-data/blob/master/calcs/cpa_tcpa.js

"use strict";

const geolib = require('geolib');

var lat1 = 20/60;
var lon1 = 3/60;
var sog1 = 5;
var cog1 = 45;

var lat2 = 0;
var lon2 = 0;
var sog2 = 0;
var cog2 = 0;

var MathFunc = {
    add : function(a, b) {
	return [ a[0] + b[0], a[1] + b[1], a[2] + b[2] ]
    },
    sub : function(a, b) {
	return [ a[0] - b[0], a[1] - b[1], a[2] - b[2] ]
    },
    mulScalar : function(a, s) {
	return [ a[0] * s, a[1] * s, a[2] * s ]
    },
    dot : function(a, b) {
	return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
    },
    lengthSquared : function(a) {
	return a[0] * a[0] + a[1] * a[1] + a[2] * a[2]
    }
};

const motionpredict = require('lethexa-motionpredict').withMathFunc(MathFunc);

// position: lat and lon in degrees
// velocity: in degrees/sec N/S and E/W

var position1 = [ lat1, lon1, 0 ];
var velocity1 = generateSpeedVector(lat1,sog1,cog1);

var position2 = [ lat2, lon2, 0 ];
var velocity2 = generateSpeedVector(lat2,sog2,cog2);

// tcpa in seconds, from now

console.log(position1,velocity1,position2,velocity2);
var tcpa = motionpredict.calcCPATime(position1,velocity1,position2,velocity2);
console.log('tcpa (Secs)',tcpa,tcpa/60,tcpa/3600);

var cpaPosition1 = motionpredict.getPositionByVeloAndTime(position1,velocity1,tcpa);
var cpaPosition2 = motionpredict.getPositionByVeloAndTime(position2,velocity2,tcpa);

// this returns meters
var cpa = geolib.convertUnit('sm',geolib.getDistanceSimple({
    latitude : cpaPosition1[0],
    longitude : cpaPosition1[1]
}, {
    latitude : cpaPosition2[0],
    longitude : cpaPosition2[1]
}));

console.log('cpa (NM)',cpa);

function generateSpeedVector (latitude, speed, course) {
  var northSpeed = speed * Math.cos(course * Math.PI / 180) / 60 / 3600;
  var eastSpeed = speed * Math.sin(course * Math.PI / 180) / 60 / 3600 * Math.abs(Math.sin(latitude * Math.PI / 180));
  return [northSpeed, eastSpeed, 0]
}