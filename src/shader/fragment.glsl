export default /* glsl */`
uniform float uTime;
uniform float uScale;
uniform int uSteps;
uniform vec3 uColorBias;
uniform int uAces;
uniform float uFrostStrength;  // 0 = 清透, 1 = 霧玻璃（模糊球面紋理）
uniform float uFrostRadius;    // 模糊半徑（以像素為概念）

varying vec2 vUv;
varying vec3 vBallDir;

const float PI = 3.14159265358979323846;

float fract1(float x) { return x - floor(x); }

vec3 random3(vec3 c) {
  float j = 4096.0 * sin(dot(c, vec3(17.0, 59.4, 15.0)));
  vec3 r;
  r.z = fract1(512.0 * j);
  j *= 0.125;
  r.x = fract1(512.0 * j);
  j *= 0.125;
  r.y = fract1(512.0 * j);
  return r - 0.5;
}

float simplex3d(vec3 p) {
  float F3 = 0.3333333;
  float G3 = 0.1666667;

  vec3 s = floor(p + dot(p, vec3(F3)));
  vec3 x = p - s + dot(s, vec3(G3));
  vec3 e = step(vec3(0.0), x - vec3(x.y, x.z, x.x));
  vec3 i1 = e * (1.0 - vec3(e.z, e.x, e.y));
  vec3 i2 = 1.0 - vec3(e.z, e.x, e.y) * (1.0 - e);

  vec3 x1 = x - i1 + G3;
  vec3 x2 = x - i2 + 2.0 * G3;
  vec3 x3 = x - 1.0 + 3.0 * G3;

  vec4 w, d;
  w.x = dot(x, x);
  w.y = dot(x1, x1);
  w.z = dot(x2, x2);
  w.w = dot(x3, x3);
  w = max(0.6 - w, 0.0);

  d.x = dot(random3(s), x);
  d.y = dot(random3(s + i1), x1);
  d.z = dot(random3(s + i2), x2);
  d.w = dot(random3(s + 1.0), x3);

  w *= w;
  w *= w;
  d *= w;

  return dot(d, vec4(52.0));
}

float simplex3d_fractal(vec3 m, int steps) {
  float sum = 0.0;
  const int MAX_STEPS = 25;
  for (int i = 0; i < MAX_STEPS; ++i) {
    if (i >= steps) break;
    float scale = pow(2.0, float(i));
    sum += simplex3d(scale * m) / scale;
  }
  return sum;
}

vec3 flow_texture(vec3 p, float Time, int steps, vec3 bias) {
  vec3 p1 = 0.1 * p + vec3(1.0 + Time * 0.02, 2.0 - Time * 0.0017, 4.0 + Time * 0.0005);
  vec3 p2 = p + 8.1 * simplex3d_fractal(p1, steps) + 0.5;
  vec3 p3 = p2 + 4.13 * simplex3d_fractal(0.5 * p2 + vec3(5.0, 4.0, 8.0 + Time * 0.07), steps) + 0.5;

  vec3 ret;
  ret.r = simplex3d_fractal(p3 + vec3(0.0, 0.0, 0.0 + Time * 0.3), steps) + bias.r;
  ret.g = simplex3d_fractal(p3 + vec3(0.0, 0.0, 0.2 + Time * 0.3), steps) + bias.g;
  ret.b = simplex3d_fractal(p3 + vec3(0.0, 0.0, 0.3 + Time * 0.3), steps) + bias.b;

  ret = 0.5 + 0.35 * ret;
  ret = smoothstep(vec3(0.15), vec3(0.85), ret);
  return ret;
}

vec3 acesTransform(vec3 c) {
  mat3 aces_tm = mat3(
    0.6131, 0.0701, 0.0206,
    0.3395, 0.9164, 0.1096,
    0.0474, 0.0135, 0.8698
  );
  return aces_tm * c;
}
float grain(vec2 uv) {
  return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
}
vec3 saturateColor(vec3 color, float amount) {
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  return mix(vec3(luma), color, amount);
}

vec2 wrapBallUV(vec2 uv) {
  // Seam-safe wrap in U, clamp V (spherical projection)
  return vec2(fract(uv.x), clamp(uv.y, 0.0, 1.0));
}

vec2 sphereUVFromPosition(vec3 pos) {
  // Use position direction to avoid UV seam lines on the mesh
  vec3 n = normalize(pos);
  float u = atan(n.z, n.x) / (2.0 * PI) + 0.5;
  float v = asin(clamp(n.y, -1.0, 1.0)) / PI + 0.5;
  return vec2(u, v);
}

vec3 shadeBall(vec2 uv) {
  uv = wrapBallUV(uv);
  vec3 p = vec3(uv.x, uv.y, uTime * 0.001);
  vec3 result = flow_texture(p * 3.0, uTime * 0.6, uSteps, uColorBias);

  vec3 Out = result;
  Out = pow(Out, vec3(2.2));

  vec3 purple = vec3(0.7, 0.2, 1.0);
  float detail = smoothstep(0.6, 1.0, result.r);
  Out = mix(Out, purple, detail * 0.6);

  if (uAces != 0) {
    Out = acesTransform(Out);
  }

  // 邊緣暗角（讓邊緣不那麼亮、更像霧面材質）
  vec2 c = uv - vec2(0.5);
  float dist = dot(c, c); // 0 (中心) ~ 0.5 (角落)
  float edge = smoothstep(0.12, 0.52, dist);
  float vignette = mix(1.0, 0.88, edge);

  vec3 baseColor = vec3(0.3, 0.85, 1.0);
  float mixFactor = 0.6;
  vec3 finalColor = mix(baseColor, Out, mixFactor) * vignette;
  finalColor = saturateColor(finalColor, 1.5);
  return finalColor;
}

void main() {
  float iResolution = max(1.0, uScale);
  // 以表面法線方向做等價球座標（避免倚賴網格是否以原點為球心）
  vec2 uv = sphereUVFromPosition(vBallDir);

  vec3 sharp = shadeBall(uv);

  // Frosted glass on the ball = blur the ball's own procedural texture (not the background)
  float frost = clamp(uFrostStrength, 0.0, 1.0);
  float radiusPx = max(0.0, uFrostRadius);
  vec2 texel = vec2(1.0 / iResolution, 1.0 / iResolution);
  vec2 r = texel * radiusPx;

  vec3 blurred = sharp;
  if (frost > 0.001 && radiusPx > 0.0) {
    // 5-tap（十字 + 中心）取代 9-tap：霧化近似、每像素少算 4 次 shadeBall
    blurred =
      shadeBall(uv + vec2(-r.x,  0.0)) +
      shadeBall(uv + vec2( r.x,  0.0)) +
      shadeBall(uv + vec2( 0.0, -r.y)) +
      shadeBall(uv + vec2( 0.0,  r.y)) +
      shadeBall(uv);
    blurred *= 0.2;
  }

  vec3 finalColor = mix(sharp, blurred, frost);

  // Add a little extra "milkiness" as frost increases (keeps fluid colors but feels frosted)
  vec3 milk = vec3(0.92, 0.96, 1.0);
  finalColor = mix(finalColor, milk, frost * 0.12);

  // Grain (keep it after blur so it doesn't disappear)
  float g = grain(vUv * uScale + uTime * 0.1);
  finalColor += (g - 0.5) * mix(0.05, 0.03, frost);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;
