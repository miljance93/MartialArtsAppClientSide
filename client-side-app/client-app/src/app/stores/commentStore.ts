import { ChatComment } from "../models/comment";
import {HubConnection, HubConnectionBuilder, LogLevel} from '@microsoft/signalr';
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./store";

export default class CommentStore{
    comments: ChatComment[] = [];
    hubConnection: HubConnection | null = null;

    constructor(){
        makeAutoObservable(this);
    }

    createHubConnection = (martialArtId : string) => {
        if(store.martialArtStore.selectedMartialArt){
            this.hubConnection = new HubConnectionBuilder()
                .withUrl("https://localhost:5001/chat?martialArtId=" + martialArtId, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

                this.hubConnection.start().catch(error => console.log('Error establishing the connection'));
                
                this.hubConnection.on('LoadComments', (comments: ChatComment[]) => {
                    runInAction(() =>{
                        comments.forEach(comment => {
                            comment.createdAt = new Date(comment.createdAt);
                        })
                        this.comments = comments
                    } );
                })

                this.hubConnection.on('ReceiveComment', (comment: ChatComment) => {
                    runInAction(() => {
                        this.comments.forEach(comment => {
                            comment.createdAt = new Date(comment.createdAt);
                        })
                        this.comments.unshift(comment)
                    });
                })
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => console.log("Error stopping connection: " + error))
    }

    clearComments = () => {
        this.comments = [];
        this.stopHubConnection();
    }

    addComment = async (values: any) => {
        values.martialArtId = store.martialArtStore.selectedMartialArt?.id;
        try {
            await this.hubConnection?.invoke('SendComment', values);
        } catch (error) {
            console.log(error);
        }
    }
}