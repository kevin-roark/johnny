(function () {
  var canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  resize();
  //window.onresize = resize;

  var ctx = canvas.getContext('2d');

  var johnnyDadImg = new Image();
  johnnyDadImg.onload = function() {
    drawJohnnyDads();
  };
  johnnyDadImg.src = 'media/johnny_dad.jpg';

  setTimeout(randomInvert, 25666);
  setTimeout(phrases, 4666);
  setTimeout(rainGifs, 15666);
  setTimeout(setupCenteredVideo, 9666);
  setTimeout(setupFatherhoodBorder, 12666);

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

  function rainGifs () {
    var arr = [
      'media/football_1.gif',
      'media/football_2.gif-c200',
      'media/football_3.gif-c200',
      'media/football_4.gif',
      'media/football_5.gif',
      'media/football_6.gif',
      'media/football_7.gif',
      'media/football_8.gif',
      'media/johnny_1.gif',
      'media/johnny_2.gif',
      'media/johnny_3.gif',
      'media/johnny_4.gif'
    ];
    var gifs = [];

    addgif();
    animate();

    function addgif () {
      var gif = new Image();
      gif.className = 'rain-gif';
      gif.src = arr[Math.floor(arr.length * Math.random())];
      gif._y = -100;
      gif._speed = Math.random() * 7 + 1;
      gif.style.top = '-100px';
      gif.style.left = (Math.random() * window.innerWidth - 50) + 'px';

      document.body.appendChild(gif);
      gifs.push(gif);
      setTimeout(addgif, Math.random() * 1450 + 50);
    }

    function animate () {
      var cleanGifs = [];
      for (var i = 0; i < gifs.length; i++) {
        var gif = gifs[i];
        gif._y += gif._speed;

        if (gif._y < window.innerHeight) {
          gif.style.top = gif._y + 'px';
          cleanGifs.push(gif);
        } else {
          document.body.removeChild(gif);
        }
      }

      gifs = cleanGifs;

      setTimeout(animate, 16);
    }
  }

  function setupCenteredVideo () {
    var arr = [
      'media/johnny_1.mp4',
      'media/johnny_2.mp4',
      'media/johnny_3.mp4',
      'media/johnny_4.mp4',
      'media/johnny_5.mp4',
      'media/johnny_6.mp4',
      'media/johnny_7.mp4',
      'media/johnny_8.mp4',
      'media/johnny_9.mp4'
    ];

    var video = document.createElement('video');
    video.className = 'centered-video';
    video.src = arr[0];
    video.play();
    document.body.appendChild(video);

    video.onended = function () {
      resetVideo();
    };

    document.addEventListener('click', resetVideo, false);
    document.addEventListener('keypress', resetVideo, false);

    function resetVideo () {
      video.pause();
      video.src = arr[Math.floor(arr.length * Math.random())];
      video.currentTime = 0;
      video.play();
    }
  }

  function setupFatherhoodBorder () {
    var size = {w: 128, h: 96};
    var arr = [
      'media/fatherhood_1.jpg',
      'media/fatherhood_2.jpg',
      'media/fatherhood_3.jpg',
      'media/fatherhood_4.jpg',
      'media/fatherhood_5.jpg',
      'media/fatherhood_6.jpg',
      'media/fatherhood_7.jpg',
      'media/fatherhood_8.jpg'
    ];

    for (var x = 0; x < window.innerWidth; x += size.w * 0.33 + Math.random() * size.w * 0.67) {
      var yVals = [0, window.innerHeight - size.h];
      for (var y = 0; y < yVals.length; y++) {
        addBorderImage(x, yVals[y], (x / window.innerWidth) * 8666);
      }
    }

    for (var y = 0; y < window.innerHeight; y += size.h * 0.33 + Math.random() * size.h * 0.67) {
      var xVals = [0, window.innerWidth - size.w];
      for (var x = 0; x < xVals.length; x++) {
        addBorderImage(xVals[x], y, (y / window.innerHeight) * 8666);
      }
    }

    function addBorderImage (x, y, delay) {
      setTimeout(function() {
        var img = new Image();
        img.src = arr[Math.floor(Math.random() * arr.length)];
        img.className = 'fatherhood-image';
        img.style.left = x + 'px';
        img.style.top = y + 'px';
        document.body.appendChild(img);

        setTimeout(function() {
          img.style.opacity = 1;
        }, 20);
      }, delay);
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
  }
})();
