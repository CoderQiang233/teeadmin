import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { getAuthority,getToken } from './authority';

let Authorized = RenderAuthorized(getAuthority()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthority());
};

// const reloadToken=()=>{
//   Authorized = RenderAuthorized(getToken());
// }

export { reloadAuthorized };
export default Authorized;
