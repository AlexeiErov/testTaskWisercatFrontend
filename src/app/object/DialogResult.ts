export class DialogResult {
    action: DialogAction;
    obj: any;
  static OK: DialogAction;
  
  
    constructor(action: DialogAction, obj?: any) {
      this.action = action;
      this.obj = obj;
    }
  }
  
  export enum DialogAction {
    SAVE,
    OK, 
    CANCEL
  }