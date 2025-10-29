import {
  CreateCommand,
  DeleteCommand,
  UpdateCommand,
} from "./base/base-command";

// Create
export interface AlbumCreateCommand extends CreateCommand {
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  eventDate?: string | null;
  brideName?: string | null;
  groomName?: string | null;
  location?: string | null;
  photographer?: string | null;
  isFeatured: boolean;
}

// Update
export interface AlbumUpdateCommand extends UpdateCommand {
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  eventDate?: string | null;
  brideName?: string | null;
  groomName?: string | null;
  location?: string | null;
  photographer?: string | null;
  isFeatured?: boolean;
}

export interface AlbumWithImagesCreateCommand extends CreateCommand {
  albumId: string;
  imageIds: string[];
}

export interface AlbumSetCoverUpdateCommand extends UpdateCommand {
  albumId: string;
  imageId: string;
}


// Delete
export interface AlbumDeleteCommand extends DeleteCommand {}
