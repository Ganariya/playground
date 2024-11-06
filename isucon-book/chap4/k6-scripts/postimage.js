import http from "k6/http";

import { parseHTML } from "k6/html";

import { url } from "./config.js";
import { getAccount } from "./account.js";

const testImage = open("testImage.png", "b");

export default function () {
    const account = getAccount();

    const login_response = http.post(url("/login"), {
        account_name: account.account_name,
        password: account.password
    });

    const docs = parseHTML(login_response.body);
    const token = docs.find('input[name="csrf_token"]').first().attr("value");

    http.post(url('/'), {
        file: http.file(testImage, "testImage.png", "image/png"),
        body: "Posted by k6",
        csrf_token: token,
    });
}
