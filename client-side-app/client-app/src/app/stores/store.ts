import {createContext, useContext} from 'react';
import MartialArtStore from './martialArtStore';

interface Store {
    martialArtStore: MartialArtStore
}

export const store: Store = {
    martialArtStore: new MartialArtStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}