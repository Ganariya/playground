import { JWT } from 'jose'
import NextAuth from 'next-auth'
import { session } from 'next-auth/client'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Twitter({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET
    })
  ],
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      console.log('jwt')
      // Sign In して Callback したあとのみ user, account などが入っている
      // 一度サインインしたあとはChromeを更新たびにこのjwtメソッドは呼ばれるが
      // token 以外はからっぽ（Sign In したときのみuser~isNewUserは入っている）

      // token がおそらくクライアント（このアプリを使おうとする大勢のユーザ）に
      // セッション情報として渡すJWTトークンのペイロードのペイロードのペイロードのペイロード
      /*
      {
          name: 'ganariya',
          email: 'ganariya@com'
          picture: 'https://pbs.twimg.com/profile_images/1259093701063655425/dr6SqJoj.jpg',
          sub: '849911306404511744',
          iat: 1621466171,
          exp: 1624058171
      }
      */
      console.log(token)

      // accessTokenとoauth_token は同じ値が入っている
      // refreshTokenとoauth_token_secretも同じ
      // accessToken で Twitter の投稿などを行える
      // 一方，oauth_secret_token はリフレッシュトークンの機能も果たすシークレットトークん
      // https://developer.twitter.com/ja/docs/authentication/oauth-1-0a/obtaining-user-access-tokens
      /*
      {
        provider: 'twitter',
        type: 'oauth',
        id: '832329328329329',
        accessToken: '8398247928749287498274982719jfdakfja',
        refreshToken: 'skdfkafksdalfajslfjlsdjflkadsjflkdsa',
        results: [Object: null prototype] {
          user_id: '849911306404511744',
          screen_name: 'ganariya'
        },
        oauth_token: 'fdsaflak32jl323kj4lk2j4',
        oauth_token_secret: 'dksaflskafljakjlk23k2jl2',
        params: [Object: null prototype] {
          user_id: '849911306404511744',
          screen_name: 'ganariya'
        }
      }
      */
      console.log(user)

      // Provider側のアカウント
      /*
      {
        id: 849911306404511700,
        id_str: '849911306404511744',
        name: 'ganariya',
        screen_name: 'ganariya',
        location: '',
        description: 'Tsukuba M2',
        url: 'https://t.co/1pEN7HwOVq',
        entities: { url: { urls: [Array] }, description: { urls: [] } },
        protected: false,
        followers_count: 479,
        friends_count: 420,
        listed_count: 16,
        created_at: 'Thu Apr 06 09:07:00 +0000 2017',
        favourites_count: 15371,
        utc_offset: null,
        time_zone: null,
        geo_enabled: false,
        verified: false,
        statuses_count: 12083,
        lang: null,
        status: {
          created_at: 'Wed May 19 22:31:21 +0000 2021',
          id: 1395145076997824500,
          id_str: '1395145076997824516',
          text: '2021/05/20 https://t.co/bkH3ZRxfEA',
          truncated: false,
          entities: { hashtags: [], symbols: [], user_mentions: [], urls: [Array] },
          source: '<a href="https://help.twitter.com/en/using-twitter/how-to-tweet#source-labels" rel="nofollow">scrapbox-with-twitter-ganariya</a>',
          in_reply_to_status_id: null,
          in_reply_to_status_id_str: null,
          in_reply_to_user_id: null,
          in_reply_to_user_id_str: null,
          in_reply_to_screen_name: null,
          geo: null,
          coordinates: null,
          place: null,
          contributors: null,
          is_quote_status: false,
          retweet_count: 0,
          favorite_count: 0,
          favorited: false,
          retweeted: false,
          possibly_sensitive: false,
          lang: 'und'
        },
        contributors_enabled: false,
        is_translator: false,
        is_translation_enabled: false,
        profile_background_color: '000000',
        profile_background_image_url: 'http://abs.twimg.com/images/themes/theme1/bg.png',
        profile_background_image_url_https: 'https://abs.twimg.com/images/themes/theme1/bg.png',
        profile_background_tile: false,
        profile_image_url: 'http://pbs.twimg.com/profile_images/1259093701063655425/dr6SqJoj_normal.jpg',
        profile_image_url_https: 'https://pbs.twimg.com/profile_images/1259093701063655425/dr6SqJoj_normal.jpg',
        profile_banner_url: 'https://pbs.twimg.com/profile_banners/849911306404511744/1603239703',
        profile_link_color: '000000',
        profile_sidebar_border_color: '000000',
        profile_sidebar_fill_color: '000000',
        profile_text_color: '000000',
        profile_use_background_image: false,
        has_extended_profile: false,
        default_profile: false,
        default_profile_image: false,
        following: false,
        follow_request_sent: false,
        notifications: false,
        translator_type: 'none',
        withheld_in_countries: [],
        suspended: false,
        needs_phone_verification: false,
        email: 'ganariya@com
      }
      */
      // Twitter 固有のアカウント情報
      console.log(account)

      // Provider側のProfile
      console.log(profile)
      console.log(isNewUser)

      // もしアクセストークンがあったら jwt トークンのペイロードに追加する
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }

      // 保存されるペイロードを返す
      // 大量には含められないので，データはDBにおいておき
      // session コールバック内で一意に識別できるキーをいれておく
      return token
    },
    async session(session, token) {
      // ユーザーに session をCookieとして渡す？
      // ヘッダに乗せて渡す
      console.log('session')
      console.log(session)
      console.log(token)
      session.accessToken = token.accessToken
      return session
    }
  }
})
