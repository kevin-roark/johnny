(function () {
  var canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  resize();
  window.onresize = resize;

  var ctx = canvas.getContext('2d');

  var johnnyDadImg = new Image();
  johnnyDadImg.onload = function() {
    drawJohnnyDads();
  };
  johnnyDadImg.src = 'media/johnny_dad.jpg';

  function drawJohnnyDads () {
    var size = [160, 286];
    var topLeft = [0, 0];
    var bottomRight = [window.innerWidth - size[0], window.innerHeight - size[1]];
    var center = [window.innerWidth / 2 - size[0]/2, window.innerHeight / 2 - size[1]/2];

    ctx.drawImage(johnnyDadImg, 0, 0);

    setTimeout(function() {
      line({ dx: function() { return Math.random() * 1; }, dy: function() { return Math.random() * 4; } });

      setTimeout(function() {
        line({ dx: function() { return Math.random() * 6; }, dy: function() { return Math.random() * 0.25; } });
      }, 1000);
      setTimeout(function() {
        line({ dx: function() { return Math.random() * 3; }, dy: function() { return Math.random() * 1.5; } });
      }, 2000);
      setTimeout(function() {
        line({ dx: function() { return Math.random() * 5; }, dy: function() { return Math.random() * 0.75; } });
      }, 3000);
      setTimeout(function() {
        line({ dx: function() { return Math.random() * 4; }, dy: function() { return Math.random() * 4; } });
      }, 4000);
    }, 500);

    setTimeout(function() {
      seed({ pos: topLeft, d: function() { return 50 * (Math.random() - 0.01); } });

      setTimeout(function() {
        seed({ pos: bottomRight, d: function() { return -50 * (Math.random() - 0.01); } });
      }, 500);

      setTimeout(function() {
        seed({ pos: center, d: function() { return 100 * (Math.random() - 0.5); }, freq: 300 });
      }, 5000);

      setTimeout(function() {
        seed({ pos: [center[0] - 400, center[1] + 250], d: function() { return 100 * (Math.random() - 0.5); }, freq: 300 });
      }, 7500);

      setTimeout(function() {
        seed({ pos: [center[0] + 400, center[1] - 250], d: function() { return 100 * (Math.random() - 0.5); }, freq: 300 });
      }, 10000);
    }, 14000);

    setTimeout(function() {
      line({ size: [size[0] * 2, size[1]], dx: function() { return 25; }, dy: function() { return 0; }, freq: 50, freqDecay: function(f) { return f; } });

      setTimeout(function() {
        line({ pos: [0, 250], size: [size[0] * 2.5, size[1] * 2.5], dx: function() { return 15; }, dy: function() { return 0; }, freq: 50, freqDecay: function(f) { return f; } });
      }, 500);
    }, 25000);

    function line (options) {
      var dx = options.dx || function() { return Math.random() * 1; }
      var dy = options.dy || function() { return Math.random() * 1; }
      var freq = options.freq || 150;
      var pos = options.pos || [0, 0];
      var jSize = options.size || size;
      var freqDecay = options.freqDecay || function (f) { return f *= 0.666; }

      var newPos = [pos[0] + dx(), pos[1] + dy()];
      if (outOfBounds(newPos)) {
        return;
      }

      ctx.drawImage(johnnyDadImg, newPos[0], newPos[1], jSize[0], jSize[1]);

      setTimeout(function() {
        options.freq = Math.max(8, freqDecay(freq));
        options.pos = newPos;
        line(options);
      }, freq);
    }

    function seed (options) {
      var pos = options.pos || [0, 0];
      var d = options.d || function() { return Math.random() * 25; }
      var freq = options.freq || 400;
      var iterations = options.iterations === undefined ? 10 : options.iterations;

      var newPos = [pos[0] + d(), pos[1] + d()];
      ctx.drawImage(johnnyDadImg, newPos[0], newPos[1]);

      if (iterations > 0) {
        var newOpts = { pos: newPos, d: d, freq: freq, iterations: iterations - 1};
        var newFreq = freq * 0.9;
        function seedNew () { seed(newOpts); }
        setTimeout(seedNew, newFreq);
        setTimeout(seedNew, newFreq * 0.99);
      }
    }

    function outOfBounds (pos) {
      return (pos[0] < 0 || pos[0] > canvas.width) || (pos[1] < 0 || pos[1] > canvas.height);
    }
  }

  function resize () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
  }
})();
