/**
 * AIRMEIZ - Meteor Shower Shader Background
 * Slow diagonal light streaks (blue, green, purple) on black. Looping, minimal streaks.
 */
(function() {
  'use strict';

  var LOOP_DURATION = 25.0;

  function initShaderBackground() {
    var container = document.getElementById('shader-bg-container');
    if (!container) return;

    if (typeof THREE === 'undefined') {
      console.warn('[AIRMEIZ] Three.js not loaded - shader background skipped');
      return;
    }

    var scene = new THREE.Scene();
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch (e) {
      console.warn('[AIRMEIZ] WebGL not available:', e);
      return;
    }
    var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.className = 'shader-canvas';
    container.insertBefore(renderer.domElement, container.firstChild);

    var material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: [
        'void main() { gl_Position = vec4(position, 1.0); }'
      ].join('\n'),
      fragmentShader: [
        'uniform float iTime;',
        'uniform vec2 iResolution;',
        '#define NUM_STREAKS 6.0',
        '#define PI 3.14159265',
        'void main() {',
        '  vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;',
        '  vec4 col = vec4(0.0, 0.0, 0.0, 1.0);',
        '  float t = mod(iTime, ' + LOOP_DURATION.toFixed(1) + ');',
        '  for (float i = 0.0; i < NUM_STREAKS; i++) {',
        '    float phase = (i / NUM_STREAKS + t * 0.04) * 2.0 * PI;',
        '    float xOff = sin(phase * 1.3) * 0.8 + cos(phase * 0.7) * 0.4;',
        '    float yOff = cos(phase * 1.1) * 0.6 + sin(phase * 0.9) * 0.3;',
        '    vec2 streakDir = normalize(vec2(1.2, -1.0));',
        '    vec2 toP = uv - vec2(xOff, yOff);',
        '    float along = dot(toP, streakDir);',
        '    float perp = abs(dot(toP, vec2(-streakDir.y, streakDir.x)));',
        '    float trail = 0.15 + 0.08 * sin(i * 2.1 + phase);',
        '    float falloff = exp(-perp * 35.0) * exp(-along * 2.0) * smoothstep(-trail, 0.0, along);',
        '    float hue = mod(i * 0.33 + t * 0.04, 1.0);',
        '    vec3 rgb;',
        '    if (hue < 0.33) rgb = mix(vec3(0.3,0.6,1.0), vec3(0.5,0.9,1.0), hue * 3.0);',
        '    else if (hue < 0.66) rgb = mix(vec3(0.5,0.9,1.0), vec3(0.4,1.0,0.7), (hue - 0.33) * 3.0);',
        '    else rgb = mix(vec3(0.4,1.0,0.7), vec3(0.7,0.4,1.0), (hue - 0.66) * 3.0);',
        '    float bright = 0.7 + 0.5 * sin(phase + i * 1.5);',
        '    col.rgb += rgb * falloff * bright;',
        '  }',
        '  col = clamp(col, 0.0, 1.0);',
        '  gl_FragColor = col;',
        '}'
      ].join('\n')
    });

    var geometry = new THREE.PlaneGeometry(2, 2);
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    var frameId;
    function animate() {
      material.uniforms.iTime.value += 0.012;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();
    console.log('[AIRMEIZ] Shader background initialized');

    function handleResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', handleResize);

    window._shaderBgCleanup = function() {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShaderBackground);
  } else {
    initShaderBackground();
  }
})();
