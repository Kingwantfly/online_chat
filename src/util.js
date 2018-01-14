
export function getRedirectPath({type, avatar}) {
  // 根据用户信息，返回跳转路径
  // user.type  ?  /boss  /eagle
  // uer.avatar ?  /bossInfo  /eagleInfo
  let url = (type ==='boss') ? '/boss' : '/eagle';
  if (!avatar) {
    url += 'info'
  }
  return url
}

export function getChatId(userId, targetId) {
  return [userId,targetId].sort().join("_");
}