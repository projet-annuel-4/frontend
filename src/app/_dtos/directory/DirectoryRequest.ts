import {FileRequest} from "../file/FileRequest";

export class DirectoryRequest {
  id: number;
  title: string;
  files: Set<FileRequest>;

}
