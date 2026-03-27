export default /* glsl */`
uniform float uTime;
uniform float adepth;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;
varying float vDisplacement;

// struct ColorStop{
//   vec3 color;
//   float position;
// };

// vec3 colorRamp(ColorStop[3]colors,float factor){
//     int index = 0;
//   for(int i = 0 ;i< colors.length()-1;i++){
//     ColorStop currentColor = colors[i];
//     ColorStop nextColor = colors[i+1];

//     bool isInbetween = currentColor.position <= factor && factor <= nextColor.position
//     index = isInbetween ? i : index;
//   }
//   ColorStop currentColor  = colors[index];
//    ColorStop nextColor  = colors[index + 1];

//    float range = nextColor.position - currentColor.position;
//   float lerpFactor =(factor - currentColor.position)/range;
//   return mix(currentColor.color,nextColor.color,lerpFactor);
// }
float lines(vec2 uv,float offset){
  return smoothstep(
    0.,0.5+offset * 0.5,
    abs(0.5*(sin(uv.x*10.0)+ offset*2.0))

  );
}

mat2 rotate2D(float angle){
   return mat2 (
    cos(angle),-sin(angle),
    sin(angle),cos(angle)
   );
}




void main() {

vec3 baseFirst = vec3(0./255.,0./255.,0./255.);
vec3 accent = vec3(253./255.,33./255.,92./255.);
vec3 baseSecond = vec3(0./255.,0./255.,255./255.);


	// vec3 color1 = vec3(1.0, 0., 0.0);
	// vec3 color2 = vec3(1.0, 0.8824, 0.0);
	// vec3 color3 = vec3(0.0, 0, 1.0);

  vec2 baseUV = rotate2D(vDisplacement)*vPosition.xy*0.08;
  float basePattern = lines(baseUV,0.1);
  float secondPattern =lines(baseUV,0.4);

	vec3 baseColor = mix(baseSecond,baseFirst,basePattern);
  vec3 secondBaseColor =mix(baseColor,accent,secondPattern);
	// vec3 secondbaseColor = mix(baseColor,color3,secondPattern);
	// vec3 coords = vNormal;
	//  coords.y += uTime;
	// vec3 noisePattern =vec3(noise(coords));
	//  float pattern = wave(noisePattern);
	 gl_FragColor = vec4(vec3(secondBaseColor),1.0 );
}
`;
