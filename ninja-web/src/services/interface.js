import { get, post, del, put } from "./post";
import { serverUrl } from "./tools";

export const GetApiList = (data) => get(serverUrl + "/interface", data);

export const GetApiAll = () => get(serverUrl + "/interface");

export const PostNewApi = (data) => post(serverUrl + "/interface", data);

export const UpdateApi = (data) => put(serverUrl + "/interface", data);

export const DeleteApi = (id) => del(serverUrl + `/interface/${id}`);

export const RunApi = (id) => get(serverUrl + `/interface/run/${id}`);
