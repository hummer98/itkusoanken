// import * as Ballcap from "@1amageek/ballcap"

import { Doc, Field } from "@1amageek/ballcap"

export class Anken extends Doc {
    // 投稿コメント
    @Field body?: string
    // FIXME: Firestorage image(s?)

    // FIXME: comments

    // FIXME: kuso count(incrementer)
}