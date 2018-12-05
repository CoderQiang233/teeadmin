// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
    return sessionStorage.getItem('antd-pro-authority');
  }
  
  export function setAuthority(authority) {
    return sessionStorage.setItem('antd-pro-authority', authority);
  }

  export function getToken() {
    return sessionStorage.getItem('antd-pro-token');
  }
  
  export function setToken(key) {
    return sessionStorage.setItem('antd-pro-token', key);
  }
  export function getRole() {
    return sessionStorage.getItem('role');
  }
  
  export function setRole(role) {
    return sessionStorage.setItem('role', role);
  }

  export function getUserName() {
    return sessionStorage.getItem('userName');
  }
  
  export function setUserName(userName) {
    return sessionStorage.setItem('userName', userName);
  }
  export function getUserId() {
    return sessionStorage.getItem('userId');
  }
  
  export function setUserId(userId) {
    return sessionStorage.setItem('userId', userId);
  }

  export function getName() {
    return sessionStorage.getItem('name');
  }
  
  export function setName(name) {
    return sessionStorage.setItem('name', name);
  }
  
  