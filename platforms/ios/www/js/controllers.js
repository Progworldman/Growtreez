angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  var width = 960,
    height = 500;

var randomX = d3.random.normal(width / 2, 80),
    randomY = d3.random.normal(height / 2, 80);

var data = d3.range(2000).map(function() {
  return [
    randomX(),
    randomY()
  ];
});

var canvas = d3.select("ion-content").append("canvas")
    .attr("width", width)
    .attr("height", height)
    .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
  .node().getContext("2d");

draw();

function zoom() {
  canvas.save();
  canvas.clearRect(0, 0, width, height);
  canvas.translate(d3.event.translate[0], d3.event.translate[1]);
  canvas.scale(d3.event.scale, d3.event.scale);
  draw();
  canvas.restore();
}

function draw() {
  var i = -1, n = data.length, d;
  canvas.beginPath();
  while (++i < n) {
    d = data[i];
    canvas.moveTo(d[0], d[1]);
    canvas.arc(d[0], d[1], 2.5, 0, 2 * Math.PI);
  }
  canvas.fill();
}

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
