import {requestplaylisthot} from './request';

//手机登陆 必选参数 :phone password
export function getphone(phone, password) {
    return requestplaylisthot({
        url: '/login/cellphone',
        params: {
            phone,
            password
        }
    })
}

//获取详情
export function getdetail(uid) {
    return requestplaylisthot({
        url: '/user/detail',
        params:{
            uid
        }
    })

}

//搜索 必选参数:keywords
export function getSearch(keywords) {
    return requestplaylisthot({
        url:'/search',
        params:{
            keywords
        }
    })
}

//获取音乐url 必选参数：id
export function getsongurl(id) {
    return requestplaylisthot({
        url:'/song/url',
        params:{
            id
        }
    })
}
//获取轮播图
export function getbanner() {
    return requestplaylisthot({
        url:'/banner'
    })
}

//获取发现入口列表
export function getball() {
    return requestplaylisthot({
        url:'/homepage/dragon/ball'
    })
}

//获取推荐歌单
export function getrecommend() {
    return requestplaylisthot({
        url:'/personalized?limit=8'
    })
}

//获取推荐音乐
export function getnewmusic() {
    return requestplaylisthot({
        url:'/personalized/newsong'
    })
}

//获取歌单详情 必选参数歌单id
export function getrecomdetail(id) {
    return requestplaylisthot({
        url:'/playlist/detail',
        params:{
            id
        }
    })
}

//获取歌单评论 必选参数歌单id
export function getcomment(id,limit) {
    return requestplaylisthot({
        url:'/comment/playlist',
        params:{
            id,
            limit
        }
    })
}

//获取歌曲详情数据 必选参数歌曲id
export function getsongdetail(ids) {
    return requestplaylisthot({
        url:'/song/detail',
        params:{
            ids
        }
    })
}