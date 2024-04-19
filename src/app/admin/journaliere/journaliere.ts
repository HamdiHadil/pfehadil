
export class Journaliere {
  constructor(
    public id?: string,
    public sector?: string,
    public planificationId?: string,
    public start?: Date,
    public end?: Date,
    public ho?: number,
    public et?: boolean,
    public farmarUid?: string,

  ) { }
}
