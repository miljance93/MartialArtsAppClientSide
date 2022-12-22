import { Profile } from "./profile";

export interface MartialArt {
    id: string;
    name: string;
    shortDescription: string;
    longDescription: string;
    hostUsername: string; 
    category: string;
    city: string;
    venue: string;
    date: Date | null;
    isCancelled: boolean;
    isGoing: boolean;
    isCoach: boolean;
    coach?: Profile;
    attendees: Profile[]
  }

  export class MartialArt implements MartialArt{
    constructor(init?: MartialArtFormValues){
      Object.assign(this, init);
    }
  }

  export class MartialArtFormValues{
    id?: string = undefined;
    name: string = "";
    shortDescription: string = "";
    longDescription: string = "";
    date: Date | null = null;
    city: string = "";
    venue: string = "";
    category: string = "";
    

    constructor(martialArt?: MartialArtFormValues){
      if(martialArt){
        this.id = martialArt.id;
        this.name = martialArt.name;
        this.longDescription = martialArt.longDescription;
        this.shortDescription = martialArt.shortDescription;
        this.date = martialArt.date;
        this.venue = martialArt.venue;
        this.city = martialArt.city;
        this.category = martialArt.category;
      }
    }
  }
  