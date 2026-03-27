export default /* glsl */`
uniform float uTime;
uniform float adepth;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vDisplacement;




void main() {

	vec3 color1 = vec3(1.0,0.0,0.0);
	vec3 color2 = vec3(1.0, 1.0, 1.0);
	vec3 color3 = vec3(0.0,0.0,1.2);
	vec3 baseColor = mix(color2,color3,vDisplacement);
	// vec3 secondbaseColor = mix(baseColor,color3,secondPattern);
	// vec3 coords = vNormal;
	//  coords.y += uTime;
	// vec3 noisePattern =vec3(noise(coords));
	//  float pattern = wave(noisePattern);
	 gl_FragColor = vec4(vec3(baseColor),1.0 );
}
`;
