import { instance } from "../axios/axios";

export function getReviews(data) {
    return instance.post('/reviews/get', data)
}

export function makeReview(data) {
    return instance.post('/reviews/make', data)
}

export function deleteReview(id) {
    return instance.delete('/reviews/'+id)
}

