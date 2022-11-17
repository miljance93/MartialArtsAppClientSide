import {createContext, useContext} from 'react';
import CommentStore from './commentStore';
import CommonStore from './commonStore';
import MartialArtStore from './martialArtStore';

interface Store {
    martialArtStore: MartialArtStore;
    commentStore: CommentStore;
    commonStore: CommonStore;
}

export const store: Store = {
    martialArtStore: new MartialArtStore(),
    commentStore: new CommentStore(),
    commonStore: new CommonStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}