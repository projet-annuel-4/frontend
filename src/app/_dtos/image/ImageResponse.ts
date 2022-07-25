export class ImageResponse {
  id: number;
  file: [any];
  link: string; //id du user
  description: string;
  details: string;



  byteToBlob(byteCharacters, type: string): Blob{
    const arrayBuffer = new ArrayBuffer(byteCharacters.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteCharacters.length; i++) {
      int8Array[i] = byteCharacters.charCodeAt(i);
    }
    return new Blob([int8Array], {type: 'image/' + type});
  }

}
