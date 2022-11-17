import { observable, action, makeObservable} from "mobx";

class Store {
  constructor(){
    makeObservable(this)
  }
  @observable public title:string = 'title'
  
  @action public setGlobalTitle (data: string) {
    this.title = data;
  }
}

const store = new Store();
export default store;