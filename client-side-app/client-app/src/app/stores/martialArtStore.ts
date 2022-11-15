
import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { MartialArt } from '../models/martialArt';

export default class MartialArtStore{
    martialArtRegistry = new Map<string, MartialArt>();
    selectedMartialArt: MartialArt | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    

    constructor(){
        makeAutoObservable(this)        
    }

    get martialArtsById() {
        return Array.from(this.martialArtRegistry.values()).sort((a, b) => a.id - b.id);
    }
    
loadMartialArts = async () => {
    this.loadingInitial = true;

    try{
        const result = await agent.MartialArts.list();
        result.value.forEach(martialArt => {
            this.setMartialArt(martialArt);
        })
        this.setLoadingInitial(false);
    }
    catch(error){
        console.log(error);
        this.setLoadingInitial(false);
    }
}

loadMartialArt = async (id: string) => {
 let martialArt = this.getMartialArt(id);
 if(martialArt){
    this.selectedMartialArt = martialArt;
 }else{
    this.loadingInitial = true;
    try{
        martialArt = await agent.MartialArts.details(id);
        this.setMartialArt(martialArt);
        this.selectedMartialArt = martialArt;
        this.setLoadingInitial(false);
    }catch(error){
        console.log(error);
        this.setLoadingInitial(false);
    }
 }
}

private setMartialArt = (martialArt: MartialArt) => {
    this.martialArtRegistry.set(martialArt.id.toString(), martialArt);
}

private getMartialArt = (id: string) => {
    return this.martialArtRegistry.get(id);
}


setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
}


createMartialArt =async (martialArt: MartialArt) => {
    this.loading = true;
    try{
        await agent.MartialArts.create(martialArt);
        runInAction(() => {
            this.martialArtRegistry.set(martialArt.id.toString(), martialArt);
            this.selectedMartialArt = martialArt;
            this.editMode = false;
            this.loading = false;
        })
    }catch(error){
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
}

updateMartialArt =async (martialArt: MartialArt) => {
    this.loading = true;
    try {
        await agent.MartialArts.edit(martialArt);
        runInAction(() => {
            this.martialArtRegistry.set(martialArt.id.toString(), martialArt)
            this.selectedMartialArt = martialArt;
            this.editMode = false;
            this.loading = false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
    
}

deleteMartialArt =async (id: number) => {
    this.loading = true;
    try {
        await agent.MartialArts.delete(id);
        runInAction(() => {
            this.martialArtRegistry.delete(id.toString());
            this.loading = false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
}

}