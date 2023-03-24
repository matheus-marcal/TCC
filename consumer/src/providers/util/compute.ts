export default class computeService{
    static pi(iterations:Number ){
        let soma = 0
    for (var i = 0;i < iterations; i++){
        if (i % 2 == 0) {
            soma = soma + 1.0/(2*i + 1);
          }
          else {
            soma = soma - 1.0/(2*i + 1);
          }
    }
    return soma*4
    }
    static distanciaEuclidiana=(coordenadas)=>{
      const x =Math.pow(coordenadas.origem.x-coordenadas.destino.x,2)
      const y =Math.pow(coordenadas.origem.y-coordenadas.destino.y,2)
      const z =Math.pow(coordenadas.origem.z-coordenadas.destino.z,2)
      return Math.sqrt(x+y+z)
  }
}