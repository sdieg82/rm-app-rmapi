export interface Character{
    id: number;
    name: string;
    image:string;
    location:location[];
    status:string;
    species:string;
    gender:string;

}
export interface location{
    name: string;
    url:string;
}