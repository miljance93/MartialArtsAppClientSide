
import { makeAutoObservable, runInAction, values } from 'mobx';
import agent from '../api/agent';
import { MartialArt } from '../models/martialArt';

export default class MartialArtStore{

    martialArts: MartialArt[] = [];
    selectedMartialArt: MartialArt | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)        
    }
    
loadMartialArts = async () => {
    this.setLoadingInitial(true);

    try{
        const result = await agent.MartialArts.list();
        result.value.forEach(martialArt => {
            this.martialArts.push(martialArt);
        })
        this.setLoadingInitial(false);
    }
    catch(error){
        console.log(error);
        this.setLoadingInitial(false);
    }
}

setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
}

selectMartialArt = (id: number) => {
    this.selectedMartialArt = this.martialArts.find(ma => ma.id == id)
}

cancelSelectedMartialArt = () => {
    this.selectedMartialArt = undefined;
}

openForm = (id? : number) => {
    id? this.selectMartialArt(id) : this.cancelSelectedMartialArt();
    this.editMode = true;
}

closeForm = ()=> {
    this.editMode = false;
}

createMartialArt =async (martialArt: MartialArt) => {
    this.loading = true;
    try{
        await agent.MartialArts.create(martialArt);
        runInAction(() => {
            this.martialArts.push(martialArt);
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
            this.martialArts = [...this.martialArts.filter(a => a.id !== martialArt.id), martialArt];
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
            this.martialArts = [...this.martialArts.filter(a => a.id !== id)];
            if(this.selectedMartialArt?.id === id) this.cancelSelectedMartialArt();
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