import { get, post } from "./post";
import { serverUrl } from "./tools";

export const Login = (data) => post(serverUrl + "/login", data);

export const GetUser = () => get(serverUrl + "/user");
