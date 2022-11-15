import {createContext, useContext} from 'react';
import CommentStore from './commentStore';
import MartialArtStore from './martialArtStore';

interface Store {
    martialArtStore: MartialArtStore;
    commentStore: CommentStore;
}

export const store: Store = {
    martialArtStore: new MartialArtStore(),
    commentStore: new CommentStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}