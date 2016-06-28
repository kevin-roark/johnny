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

  setTimeout(randomInvert, 18000);
  setTimeout(phrases, 7666);

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
      line({ size: [size[0] * 2, size[1]], dx: function() { return 120; }, dy: function() { return 0; }, freq: 50, freqDecay: function(f) { return f; } });

      for (var i = 0; i < 8; i++) {
        bigLine(i, 500 + i * 1500);
      }
      function bigLine (i, delay) {
        setTimeout(function() {
          line({ pos: [0, 20 + 80 * i], size: [size[0], size[1] * 5], dx: function() { return 75; }, dy: function() { return 0; }, freq: 50, freqDecay: function(f) { return f; } });
        }, delay);
      }
    }, 27500);

    setTimeout(drawJohnnyDads, 40 * 1000);

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

  function randomInvert () {
    var isInverted = false;
    update();

    function update () {
      var t = isInverted ? 0.4 : 0.25;
      if (Math.random() < t) {
        isInverted = !isInverted;
        var amt = isInverted ? Math.random() * 0.35 + 0.65 : 0;
        setInvertFilter(canvas, 100 * amt);
      }

      setTimeout(update, 200);
    }
  }

  function phrases () {
    var arr = [
      'I HOPE JOHNNY GOES TO JAIL',
      'I HOPE MY SON GOES TO JAIL',
      'I HOPE JOHNNY GOES TO JAIL',
      'I HOPE MY SON GOES TO JAIL',
      'I HOPE MY DAD GOES TO JAIL',
      'GO TO JAIL',
      'DADDY GO TO JAIL'
    ];

    addPhrase();

    function addPhrase () {
      var p = arr[Math.floor(arr.length * Math.random())];
      ctx.font = Math.floor(Math.random() * 64 + 16) + "px sans-serif";
      ctx.fillText(p, Math.random() * canvas.width - 200, Math.random() * canvas.height - 80);

      setTimeout(addPhrase, Math.random() * 200);
    }
  }

  function resize () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
  }

  function setInvertFilter(el, amt) {
    var filter = el.style.filter || '';
    filter.replace(/invert\(*\)/, '');
    filter += ' invert(' + amt + '%)';
    el.style.filter = el.style.webkitFilter = el.style.mozFilter = filter;
    console.log(filter);
  }
})();
