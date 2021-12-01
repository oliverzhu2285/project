import * as type from '../types';

export function getPosts() {
  return { 
    type: type.GET_POSTS_REQUESTED,
    // payload: posts,
  }
}
export function getPostById(id) {
  return {
    type: type.GET_POST_BY_ID_REQUESTED,
    payload: { id: id }
  }
}
export function createPost(post) {
  return {
    type: type.CREATE_POST_REQUESTED,
    payload: { post: post }
  }
}
export function updatePost(post, id) {
  return {
    type: type.UPDATE_POST_REQUESTED,
    payload: { post: post, id: id }
  }
}
export function deletePost(id) {
  return {
    type: type.UPDATE_POST_REQUESTED,
    payload: { id: id }
  }
}