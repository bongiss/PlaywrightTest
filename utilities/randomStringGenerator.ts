

export function makeString(len:any):string {
    let outString: string = '';
    let inOptions: string = 'abcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < len; i++) {
      outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
    }
    return outString;
  }
