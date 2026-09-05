import { NavLink } from "react-router-dom";
export default function Sidebar({ items = [] }) { return <aside className="sidebar"><div className="side-title">Workspace</div>{items.map((item)=><NavLink key={item.to} to={item.to} end={item.end} className={({isActive})=>isActive?"active":""}><span>{item.icon}</span>{item.label}</NavLink>)}</aside>; }
