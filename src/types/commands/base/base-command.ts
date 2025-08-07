export interface CreateCommand extends CreateOrUpdateCommand{
}

export interface UpdateCommand extends CreateOrUpdateCommand{
    id: string;
    isDeleted: boolean;
}

export interface DeleteCommand extends BaseCommand{
    id?: string;
    isPermanent: boolean;
}


export interface CreateOrUpdateCommand {

}

export interface BaseCommand {

}