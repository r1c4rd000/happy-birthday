(function() {
    function showLogin() {
      if (document.getElementById('login-container')) return;
  
      // Crea el overlay del login
      const loginDiv = document.createElement('div');
      loginDiv.id = 'login-container';
      loginDiv.style.position = 'fixed';
      loginDiv.style.top = '0';
      loginDiv.style.left = '0';
      loginDiv.style.width = '100vw';
      loginDiv.style.height = '100vh';
      loginDiv.style.background = 'black';
      loginDiv.style.zIndex = '99999';
      loginDiv.style.display = 'flex';
      loginDiv.style.flexDirection = 'column';
      loginDiv.style.alignItems = 'center';
      loginDiv.style.justifyContent = 'center';
      loginDiv.style.transition = 'opacity 0.3s';
      loginDiv.style.pointerEvents = 'auto';
      loginDiv.style.overflow = 'hidden';
  
      // Fondo animado tipo "matrix"
      const matrixCanvas = document.createElement('canvas');
      matrixCanvas.id = 'matrix-canvas';
      matrixCanvas.style.position = 'absolute';
      matrixCanvas.style.top = '0';
      matrixCanvas.style.left = '0';
      matrixCanvas.style.width = '100vw';
      matrixCanvas.style.height = '100vh';
      matrixCanvas.style.zIndex = '0';
      loginDiv.appendChild(matrixCanvas);
  
      // Contenido del login
      const loginContent = document.createElement('div');
      loginContent.style.position = 'relative';
      loginContent.style.zIndex = '1';
      loginContent.style.display = 'flex';
      loginContent.style.flexDirection = 'column';
      loginContent.style.alignItems = 'center';
      loginContent.style.justifyContent = 'center';
      loginContent.style.background = 'rgba(0,0,0,0.7)';
      loginContent.style.padding = '2em 2.5em';
      loginContent.style.borderRadius = '16px';
      loginContent.style.boxShadow = '0 0 32px #00ff41, 0 0 8px #00ff41 inset';
  
      loginContent.innerHTML = `
        <h1 style="
          font-size: 2.2em;
          color: #00ff41;
          font-family: 'Share Tech Mono', 'Consolas', monospace;
          text-shadow: 0 0 8px #00ff41, 0 0 2px #fff;
          margin-bottom: 0.5em;
          letter-spacing: 2px;
          text-align: center;
        ">
          <span style="color:#ff0040;">[!]</span> ACCESO RESTRINGIDO <span style="color:#ff0040;">[!]</span>
        </h1>
        <h2 style="
          font-size: 1.1em;
          color: #00ff41;
          font-family: 'Share Tech Mono', 'Consolas', monospace;
          margin-bottom: 1.5em;
          text-shadow: 0 0 4px #00ff41;
          text-align: center;
        ">
          Ingresa el código de acceso<br>
          <br>
          <span style="color:#ff0040;">Contraseña 4 dígitos</span>
          <br>
          <span style="color:#ff0040;">Advertencia: Contraseñas incorrectas serán castigadas</span>
        </h2>
        <input type="password" id="login-code" maxlength="4" placeholder="CÓDIGO" style="
          font-size: 1.3em;
          padding: 0.7em 1.2em;
          border-radius: 8px;
          border: 2px solid #00ff41;
          outline: none;
          margin-bottom: 1em;
          text-align: center;
          background: #111;
          color: #00ff41;
          box-shadow: 0 0 8px #00ff41;
          font-family: 'Share Tech Mono', 'Consolas', monospace;
          letter-spacing: 2px;
        ">
        <button id="login-btn" style="
          font-size: 1.1em;
          padding: 0.6em 2em;
          border-radius: 8px;
          border: none;
          background: #00ff41;
          color: #111;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 0 8px #00ff41;
          font-family: 'Share Tech Mono', 'Consolas', monospace;
          margin-bottom: 0.5em;
          transition: background 0.2s, color 0.2s;
        ">
          ACCEDER
        </button>
        <p id="login-error" style="
          color: #ff0040;
          background: #111;
          border-radius: 8px;
          padding: 0.5em 1em;
          display: none;
          margin-top: 1em;
          font-size: 1.1em;
          font-family: 'Share Tech Mono', 'Consolas', monospace;
          box-shadow: 0 0 8px #ff0040;
          text-align: center;
        ">CÓDIGO INCORRECTO - ACCESO DENEGADO</p>
      `;
      loginDiv.appendChild(loginContent);
      document.body.appendChild(loginDiv);
  
      // Lógica del login
      const loginBtn = loginDiv.querySelector('#login-btn');
      const loginCode = loginDiv.querySelector('#login-code');
      const loginError = loginDiv.querySelector('#login-error');
  
      function unlock() {
        loginDiv.style.opacity = '0';
        loginDiv.style.pointerEvents = 'none';
        setTimeout(() => {
          loginDiv.remove();
          // Si tienes una función para iniciar la animación, llámala aquí:
          if (typeof window.startBirthday === 'function') {
            window.startBirthday();
          }
        }, 300);
      }
  
      loginBtn.addEventListener('click', function() {
        if (loginCode.value === '0704') {
          unlock();
        } else {
          loginError.style.display = 'block';
          loginCode.value = '';
          loginCode.focus();
        }
      });
  
      loginCode.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
          loginBtn.click();
        }
      });
  
      // Matrix background animation
      function matrixEffect(canvas) {
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
        const fontSize = 18;
        const columns = Math.floor(width / fontSize);
        const drops = Array(columns).fill(1);
  
        function draw() {
          ctx.fillStyle = 'rgba(0,0,0,0.08)';
          ctx.fillRect(0, 0, width, height);
          ctx.font = fontSize + "px 'Share Tech Mono', monospace";
          ctx.fillStyle = '#00ff41';
          for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }
        }
  
        let interval = setInterval(draw, 33);
  
        // Responsive
        window.addEventListener('resize', () => {
          clearInterval(interval);
          width = window.innerWidth;
          height = window.innerHeight;
          canvas.width = width;
          canvas.height = height;
          interval = setInterval(draw, 33);
        });
      }
  
      // Carga la fuente hacker si no está
      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css?family=Share+Tech+Mono&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
  
      setTimeout(() => {
        matrixEffect(matrixCanvas);
      }, 100);
    }
  
    if (document.readyState === 'loading' || document.readyState === 'interactive') {
      document.addEventListener('DOMContentLoaded', showLogin);
    } else {
      showLogin();
    }
  })();
