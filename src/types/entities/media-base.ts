import { BaseEntity } from "./base/base";
export interface MediaBase extends BaseEntity {
  displayName?: string;
  title?: string;
  mimeType?: string;
  size: number;
  width?: number;
  height?: number;
  mediaUrl?: string;
  createdMediaBy?: string;
  takenMediaDate?: string;
  mediaBaseType: MediaBaseType;
}

export enum MediaBaseType {
  Image,
  Video,
}
