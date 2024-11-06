import http from "k6/http";
import { url } from "./config.js";

export default function () {
    http.get(url('/'));
}