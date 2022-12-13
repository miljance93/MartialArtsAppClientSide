import {createContext, useContext} from 'react';
import CommentStore from './commentStore';
import CommonStore from './commonStore';
import MartialArtStore from './martialArtStore';
import ModalStore from './modalStore';
import ProfileStore from './profileStore';
import UserStore from './userStore';

interface Store {
    martialArtStore: MartialArtStore;
    commentStore: CommentStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
}

export const store: Store = {
    martialArtStore: new MartialArtStore(),
    commentStore: new CommentStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}