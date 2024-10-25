uniform vec2 iResolution;

out vec4 fragColor;

void main()
{
    vec2 blend_uv = gl_FragCoord.xy / iResolution.xy;
    vec2 uv = vec2(1.0 - blend_uv.x, blend_uv.y);
    vec3 intensity = 1.0 - texture(sTD2DInputs[1], uv).rgb;
    
    float vidSample = dot(vec3(1.0), texture(sTD2DInputs[1], uv).rgb);
    float delta = 0.005;
    float vidSampleDx = dot(vec3(1.0), texture(sTD2DInputs[1], uv + vec2(delta, 0.0)).rgb);
    float vidSampleDy = dot(vec3(1.0), texture(sTD2DInputs[1], uv + vec2(0.0, delta)).rgb);
    
    vec2 flow = delta * vec2 (vidSampleDy - vidSample, vidSample - vidSampleDx);
    
    intensity = 0.005 * intensity + 0.995 * (1.0 - texture(sTD2DInputs[0], blend_uv + vec2(-1.0, 1.0) * flow).rgb);
    fragColor = TDOutputSwizzle(vec4(1.0 - intensity,1.0));
}