export interface Slide {
    src: string;
    width: number;
    height: number;
    srcSet: { src: string; width: number; height: number }[]; 
}