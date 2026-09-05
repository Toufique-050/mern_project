import GalleryCard from "./GalleryCard";
export default function GalleryGrid({ items=[], onDelete }) { if(!items.length)return <div className="empty-state">No gallery items yet.</div>; return <div className="gallery-grid">{items.map((item)=><GalleryCard key={item._id} item={item} onDelete={onDelete}/>)}</div>; }
