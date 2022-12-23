import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { MartialArt, MartialArtFormValues } from '../models/martialArt';
import { Profile } from '../models/profile';
import { store } from './store';
import { Pagination, PagingParams } from '../models/pagination';

export default class MartialArtStore{
    martialArtRegistry = new Map<string, MartialArt>();
    selectedMartialArt: MartialArt | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    

    constructor(){
        makeAutoObservable(this)        
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        return params;
    }

    get martialArtsByDate() {
        return Array.from(this.martialArtRegistry.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime());
    }
    
loadMartialArts = async () => {
    this.loadingInitial = true;

    try{
        const result = await agent.MartialArts.list(this.axiosParams);
        result.data.forEach(martialArt => {
            this.setMartialArt(martialArt);
        })
        this.setPagination(result.pagination);
        this.setLoadingInitial(false);
    }
    catch(error){
        console.log(error);
        this.setLoadingInitial(false);
    }
}

setPagination = (pagination: Pagination) =>{
    this.pagination = pagination;
}

loadMartialArt = async (id: string) => {
 let martialArt = this.getMartialArt(id);
 if(martialArt){
    this.selectedMartialArt = martialArt;
    return martialArt;
 }else{
    this.loadingInitial = true;
    try{
        martialArt = await agent.MartialArts.details(id.toString());
        this.setMartialArt(martialArt);
        runInAction(() => {
            this.selectedMartialArt = martialArt;
        })        
        this.setLoadingInitial(false);
    }catch(error){
        console.log(error);
        this.setLoadingInitial(false);
    }
 }
}

private setMartialArt = (martialArt: MartialArt) => {
    const user = store.userStore.user;
    if(user) {
        martialArt.isGoing = martialArt.attendees!.some(
            ma => ma.username === user.username
        )
        martialArt.isCoach = martialArt.hostUsername === user.username;
        martialArt.coach = martialArt.attendees?.find(x => x.username === martialArt.hostUsername);
    }
    martialArt.date = new Date(martialArt.date!);
    this.martialArtRegistry.set(martialArt.id.toString(), martialArt);
}

private getMartialArt = (id: string) => {
    return this.martialArtRegistry.get(id.toString());
}


setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
}

createMartialArt =async (martialArt: MartialArtFormValues) => {
    const user = store.userStore!.user;
    const attendee = new Profile(user!);
    try{
        await agent.MartialArts.create(martialArt);
        const newMartialArt = new MartialArt(martialArt);
        newMartialArt.hostUsername = user!.username;
        newMartialArt.attendees =[attendee];
        this.setMartialArt(newMartialArt);
        runInAction(() => {
            this.selectedMartialArt = newMartialArt;
        })
    }catch(error){
        console.log(error);
    }
    finally{
        this.loading = false;
    }
}

updateMartialArt =async (martialArt: MartialArtFormValues) => {
    try {
        await agent.MartialArts.edit(martialArt);
        runInAction(() => {
            if(martialArt.id){
                let updatedMartialArt = {...this.getMartialArt(martialArt.id.toString()), ...martialArt};
                this.martialArtRegistry.set(martialArt.id.toString(), updatedMartialArt as MartialArt);
                this.selectedMartialArt = updatedMartialArt as MartialArt;
            }          
        })
    } catch (error) {
        console.log(error);
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

updateAttendance = async () => {
    const user = store.userStore.user;
    this.loading = true;
    try{
        await agent.MartialArts.attend(this.selectedMartialArt!.id);
        runInAction(() => {
            if(this.selectedMartialArt?.isGoing){
                this.selectedMartialArt.attendees = this.selectedMartialArt.attendees?.filter(m => m.username !== user?.username);
                this.selectedMartialArt.isGoing = false;
            }
            else{
                const attendee = new Profile(user!);
                this.selectedMartialArt?.attendees?.push(attendee);
                this.selectedMartialArt!.isGoing = true;
            }

            this.martialArtRegistry.set(this.selectedMartialArt!.id.toString(), this.selectedMartialArt!);
        })
    }catch(error)
    {
        console.log(error);
    }
    finally{
        runInAction(() => this.loading = false);
    }
}

cancelMartialArtToggle = async () => {
    this.loading = true;
    try{
        await agent.MartialArts.attend(this.selectedMartialArt!.id);
        runInAction(() => {
            this.selectedMartialArt!.isCancelled = !this.selectedMartialArt?.isCancelled;
            this.martialArtRegistry.set(this.selectedMartialArt!.id, this.selectedMartialArt!);
        })
    }catch(error){
        console.log(error);
    }finally{
        runInAction(() => this.loading= false);
    }
}

clearSelectedMartialArt = () => {
    this.selectedMartialArt = undefined;
}

updateAttendeeFollowing = (username: string) =>{
    this.martialArtRegistry.forEach(martialArt => {
        martialArt.attendees.forEach(attendee => {
            if(attendee.username === username){
                attendee.following ? attendee.followersCount-- : attendee.followersCount++;
                attendee.following = !attendee.following;
            }
        })
    })
}

}