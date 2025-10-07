export interface UploadResult {
  assetId?: string;
  publicId?: string;
  assetFolder?: string;
  displayName?: string;
  version?: string;
  url?: string;
  secureUrl?: string;
  bytes?: number;
  format?: string;
  metadataFields?: any;
  status?: string;
  moderation?: Moderation[];
  moderationKind?: string;
  moderationStatus?: string | null;
  hookExecution?: any;
}

export interface Moderation {
  kind?: string;
  status?: string;
  response?: any;
  updatedAt?: string;
}

export type ModerationStatus = "approved" | "pending" | "rejected" | string;
