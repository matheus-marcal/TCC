export default class computePiService{
    static compute(iterations:Number ){
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
}