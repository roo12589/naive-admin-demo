import request from './index'

export function getUsers(data = {}) {
    return request({
        url: '/users',
        method: 'get',
        data,
    })
}

export function getUser(id?) {
    if (id) {
        return request({
            url: `/user/${id}`,
            method: 'get',
        })
    }
    return request({
        url: '/user',
        method: 'get',
    })
}
export function login(data) {
    if (data) {
        return request({
            url: `/user`,
            method: 'post',
            data,
        })
    }
    return request({
        url: '/user',
        method: 'get',
    })
}

export function saveUser(data = {}, id) {
    if (id) {
        return request({
            url: '/user',
            method: 'put',
            data,
        })
    }

    return request({
        url: `/user/${id}`,
        method: 'put',
        data,
    })
}
