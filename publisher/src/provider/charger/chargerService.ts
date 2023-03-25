import axios from 'axios'
import {DateTime} from 'luxon'
import kafkaPublisherService from '../kafkaPublisher/kafkaPublisherService'
import numbersFont from './numbers'

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
      const interacoes = numbersFont.interacoes()
      const coordenadas = numbersFont.coordenadas()
      const initOfGetAll = DateTime.now()
      const objects = await getAll()
      const endOfGetAll = DateTime.now()
      const initPublisher = DateTime.now()
      let count = 0
      for(const [index,value] of objects.entries()){
        for(var i=1;i<=4;i++){
        const body = {
          "content": {
             value
          },
          "fileName": `${folder}/${value.type}-${i}/${(value.name?value.name:value.title).replace('/','-')}.json`,
          "piInterations": interacoes[index],
          "coordenadas":coordenadas[index]
        }
          count ++
          //console.log(JSON.parse(JSON.stringify(body)))

          await kafkaPublisherService.save(JSON.parse(JSON.stringify(body)))
        }
      }
      const endPublisher = DateTime.now()
      const result = {
        count,
        initOfGetAll,
        initPublisher,
        endPublisher,
        durationGetAll:endOfGetAll.diff(initOfGetAll).as('seconds'),
        durationPublisherl:endPublisher.diff(initPublisher).as('seconds')
      }
      return result

    }
  }