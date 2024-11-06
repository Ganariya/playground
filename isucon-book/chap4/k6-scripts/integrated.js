import initialize from "./initialize.js";
import comment from "./comment.js";
import postImage from "./postimage.js";

// initialize, comment, postImage をそれぞれ１つのシナリオとして実行する
// 各 js で記載シナリオを統合し、かつ options でそれぞれのシナリオの設定を行う

// k6 が実行できるように export
export { initialize, comment, postImage };

export const options = {
    scenarios: {
        initialize: {
            executor: "shared-iterations",
            vus: 1,
            iterations: 1,
            exec: "initialize", // 実行する関数名
            maxDuration: "10s",
        },
        comment: {
            executor: "constant-vus",
            vus: 3,
            duration: "30s",
            exec: "comment",
            startTime: "12s",
        },
        postImage: {
            executor: "constant-vus",
            vus: 3,
            duration: "30s",
            exec: "postImage",
            startTime: "12s",
        }
    }
}
