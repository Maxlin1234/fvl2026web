export default /* glsl */`
varying vec2 vUv;
// 球面著色用「向外的單位方向」：用法線比用 position 更穩（網格原點不一定在球心）
varying vec3 vBallDir;

void main() {
  vUv = uv;
  vBallDir = normalize(normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
