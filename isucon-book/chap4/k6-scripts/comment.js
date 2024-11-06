import http from "k6/http";
import { check } from "k6";
import { parseHTML } from "k6/html";
import { url } from "./config.js";
import { getAccount } from "./account.js";

export default function () {
    const account = getAccount();

    const login_response = http.post(url('/login'), {
        account_name: account.account_name,
        password: account.password,
    });

    check(login_response, {
        "Login successful": (r) => r.status === 200,
    });

    const response = http.get(url('/@terra'));
    const docs = parseHTML(response.body);
    const token = docs.find('input[name="csrf_token"]').first().attr("value");
    const postId = docs.find('input[name="post_id"]').first().attr("value");

    const comment_response = http.post(url('/comment'), {
        post_id: postId,
        comment: 'k6 test comment',
        csrf_token: token,
    });

    check(comment_response, {
        "Comment posted successfully": (r) => r.status === 200,
    });
}