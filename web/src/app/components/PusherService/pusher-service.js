/* global Pusher */

angular.module('Pikado')
	.service('PusherService', [function () {
    'use strict';

    // Init Pusher
	var pusher = new Pusher('6d519dd40253cd6ef8cb');
    var channel = pusher.subscribe('score');

    return channel;
}]);
