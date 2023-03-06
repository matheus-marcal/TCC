import axios from 'axios'
import {DateTime} from 'luxon'
import kafkaPublisherService from '../kafkaPublisher/kafkaPublisherService'

const starWarsApi = axios.create({
  baseURL: `https://swapi.dev/api/`,
})

const getAll =async()=>{
  const objTypes = (await axios.get(`https://swapi.dev/api/`)).data
  let result:any={},promises =[]
  for(let key in objTypes){
      result[key]=[]
  }
  for(let key in objTypes){
      const request = (await starWarsApi.get(`${key}`)).data
      let next =request.next
      result[key]=[...result[key],...request.results]
      while(next){
          const requestPages = (await axios.get(next)).data
          result[key]=[...result[key],...requestPages.results]
          next=requestPages.next
      }
      next = null
  }
  let array = []
  for(let key in objTypes){
      for( let data of result[key]){
          data.type = key
          array.push(data)
      }
  }
  return array
  
}

export default class chargerService{

  static async init (folder:string){
      const interacoes= [759006956,350,25743,5969,974,41729,38937,76650,80036,833576858,616614849,961179621,192286675,51558089,837204124,50134,502020259,356186512,4607,54,9019419,666814752,341573935,2060247,9196670,5170834,4146,5601293,3668,9470,646369304,5679,23819,43085,6029967,74455817,5068,7370,5729,4078343,8853,808117619,81332,28148,1385522,996113793,1756,3758226,684,9386859,2668,7288,6143,872086559,4558,6707897,829736,7562210,84086,2579,42842,2345,2519862,8458916,96814051,410307121,670755099,3056266,856121387,9695346,8433,683,5677,1706,559915267,3535102,1861,8867,8630227,6731028,6187,1077,21414,744245492,443186,785524522,6429,94675,89315,8037,4661,5757325,50615,3593,80496,2523,291,26928099,18683,7217514,2166676,527932297,1463974,3282,970174845,49453,246522898,84725,61398,3367699,153445375,3836,990075108,1014,338538883,5173216,77661,737271586,1680944,2467,8785135,746625323,8994170,867,22,940941274,988402144,5336832,83884,275,161984,5737160,88105,6909,357737571,372210413,64343,4910215,711970640,80666,1914,8092,3652,231167703,96686,475421848,173612707,6596,5720,4146715,179549551,514717510,426150908,36445534,771051757,6678,675868983,12298314,4073,5533247,184332657,263965023,35802,27484,1577465,185102191,1824588,9810270,17081,3285,538315,75325,8986516,76962,98123,4430,81213,38262,9910369,87854277,6889964,8952416,6612320,3385,4630,253168856,10752,888614726,9735916,4770139,7856659,3627,81728,8287,2643,2602192,6880147,7155,5745,6718767,3366,339597211,4539,872445827,93031,356775277,8356242,9133,6727739,6465,706604,8390,56864,5299,678151023,700,50826,4017267,489596518,123195953,50192,9137,920909304,5497707,1058867,860625278,95105,9874,96808,2597383,668183409,47670,4703902,673018676,87464,40794,82330286,29324,83132,52634,14834,9110142,57702,55330,10275,123375487,3294642,6838508,9115341,66169,566766210,49117,64181,17163,399555,62357,8440270,20635,48562,16147,67234,3517563,957074670,690236164,76515,46901,53660,46821,34695,7987349,5754589,357198234,7838964,12477,2020,61585]
      const initOfGetAll = DateTime.now()
      const objects = await getAll()
      const initPublisher = DateTime.now()
      for(const [index,value] of objects.entries()){
        const body = {
          "content": {
             value
          },
          "fileName": `${folder}/${value.type}/${(value.name?value.name:value.title).replace('/','-')}.json`,
          "piInterations": interacoes[index]
        }
          //console.log(JSON.parse(JSON.stringify(body)))
          await kafkaPublisherService.save(JSON.parse(JSON.stringify(body)))
      }
      const endPublisher = DateTime.now()
      const result = {
        initOfGetAll,
        initPublisher,
        endPublisher,
        durationGetAll:initPublisher.diff(initOfGetAll).as('seconds'),
        durationPublisherl:endPublisher.diff(initPublisher).as('seconds')
      }
      return result

    }
  }