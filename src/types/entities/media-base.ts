import { BaseEntity } from "./base/base";
export interface MediaBase extends BaseEntity {
  displayName?: string;
  title?: string;
  format?: string;
  size: number;
  width?: number;
  height?: number;
  mediaUrl?: string;
  createdMediaBy?: string;
  takenMediaDate?: string;
  resourceType: ResourceType;
}

export enum ResourceType {
  /** Images in various formats (jpg, png, etc.) */
  Image,
  /** Any files (text, binary) */
  Raw,
  /** Video files in various formats (mp4, etc.) */
  Video,
  /** Auto upload format */
  Auto,
}
