import { useEffect, useState } from "react";
import { getGallery } from "../../services/mediaService";
import { getEvents } from "../../services/eventService";
import GalleryGrid from "../../components/gallery/GalleryGrid";
import Loader from "../../components/common/Loader";
import { Link } from "react-router-dom";

export default function Gallery() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadGallery = async () => {
            setLoading(true);
            setError("");

            try {
                // First try to get gallery images
                const galleryData = await getGallery();
                let mediaItems = galleryData.media || [];

                // If no gallery images, fetch events with banners
                if (mediaItems.length === 0) {
                    try {
                        const eventsData = await getEvents({ status: "approved" });
                        const events = eventsData.events || [];
                        
                        // Convert events to gallery items
                        mediaItems = events
                            .filter(e => e.bannerImage) // Only events with banner images
                            .map(e => ({
                                _id: e._id,
                                title: e.title,
                                description: e.description || "",
                                imageUrl: e.bannerImage,
                                type: "image",
                                event: e,
                                createdAt: e.createdAt || new Date().toISOString()
                            }));
                    } catch (e) {
                        // If events fail, use fallback images
                        mediaItems = getFallbackImages();
                    }
                }

                // If still no items, use fallback images
                if (mediaItems.length === 0) {
                    mediaItems = getFallbackImages();
                }

                setItems(mediaItems);
            } catch (err) {
                setError("Unable to load gallery. Using placeholder images.");
                // Fallback images
                setItems(getFallbackImages());
            } finally {
                setLoading(false);
            }
        };

        // Fallback images function
        const getFallbackImages = () => {
            return [
                {
                    _id: "1",
                    title: "Tech Innovation Summit",
                    description: "Annual tech event with industry leaders",
                    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
                    type: "image",
                    createdAt: new Date().toISOString()
                },
                {
                    _id: "2",
                    title: "Campus Sports Festival",
                    description: "Inter-department sports competition",
                    imageUrl: "https://images.unsplash.com/photo-1461896836934-bde2b75ab0d7?w=600&h=400&fit=crop",
                    type: "image",
                    createdAt: new Date().toISOString()
                },
                {
                    _id: "3",
                    title: "Music & Arts Festival",
                    description: "Annual cultural extravaganza",
                    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop",
                    type: "image",
                    createdAt: new Date().toISOString()
                },
                {
                    _id: "4",
                    title: "Career Fair 2024",
                    description: "Connect with top employers",
                    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop",
                    type: "image",
                    createdAt: new Date().toISOString()
                },
                {
                    _id: "5",
                    title: "Hackathon 2024",
                    description: "48-hour coding competition",
                    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop",
                    type: "image",
                    createdAt: new Date().toISOString()
                },
                {
                    _id: "6",
                    title: "Alumni Meetup",
                    description: "Networking with alumni",
                    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop",
                    type: "image",
                    createdAt: new Date().toISOString()
                }
            ];
        };

        loadGallery();
    }, []);

    return (
        <main className="page">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700;800&display=swap');

                /* ===== ANIMATIONS ===== */
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.92); }
                    to { opacity: 1; transform: scale(1); }
                }

                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                }

                @keyframes zoomIn {
                    from { transform: scale(1); }
                    to { transform: scale(1.05); }
                }

                /* ===== PAGE ===== */
                .page {
                    min-height: 100vh;
                    background: #f7f6f2;
                    font-family: 'Inter', sans-serif;
                    padding: 44px 24px 64px;
                }

                .page .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }

                /* ===== PAGE INTRO ===== */
                .page .page-intro {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    margin-bottom: 32px;
                    animation: fadeInUp 0.5s ease both;
                }

                .page .page-intro .eyebrow {
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    text-transform: uppercase;
                    color: #e29a4d;
                    background: rgba(226, 154, 77, 0.08);
                    padding: 4px 16px;
                    border-radius: 16px;
                    display: inline-block;
                    margin-bottom: 8px;
                }

                .page .page-intro h1 {
                    font-family: 'Fraunces', serif;
                    font-size: 38px;
                    font-weight: 600;
                    color: #1c1830;
                    margin: 0 0 6px 0;
                    letter-spacing: -0.02em;
                }

                .page .page-intro p {
                    font-size: 15.5px;
                    color: #6a665a;
                    line-height: 1.6;
                    margin: 0;
                }

                .page .page-intro .count-badge {
                    font-size: 13px;
                    color: #8a8676;
                    background: #ffffff;
                    padding: 6px 18px;
                    border-radius: 20px;
                    border: 1px solid #eae7dd;
                    white-space: nowrap;
                }

                .page .page-intro .count-badge strong {
                    color: #1c1830;
                    font-weight: 600;
                }

                /* ===== GALLERY GRID ===== */
                .page .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 24px;
                    animation: fadeInUp 0.5s ease both 0.1s;
                }

                .page .gallery-grid .gallery-item {
                    border-radius: 16px;
                    overflow: hidden;
                    background: #ffffff;
                    border: 1px solid #eae7dd;
                    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow: 0 1px 2px rgba(28, 24, 48, 0.03), 0 8px 24px -16px rgba(28, 24, 48, 0.08);
                    position: relative;
                    animation: fadeInScale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                    cursor: pointer;
                }

                .page .gallery-grid .gallery-item:nth-child(1) { animation-delay: 0.05s; }
                .page .gallery-grid .gallery-item:nth-child(2) { animation-delay: 0.10s; }
                .page .gallery-grid .gallery-item:nth-child(3) { animation-delay: 0.15s; }
                .page .gallery-grid .gallery-item:nth-child(4) { animation-delay: 0.20s; }
                .page .gallery-grid .gallery-item:nth-child(5) { animation-delay: 0.25s; }
                .page .gallery-grid .gallery-item:nth-child(6) { animation-delay: 0.30s; }
                .page .gallery-grid .gallery-item:nth-child(7) { animation-delay: 0.35s; }
                .page .gallery-grid .gallery-item:nth-child(8) { animation-delay: 0.40s; }

                .page .gallery-grid .gallery-item::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #e29a4d, #f0c27a, #e29a4d);
                    background-size: 200% 100%;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    z-index: 2;
                }

                .page .gallery-grid .gallery-item:hover::before {
                    opacity: 1;
                    animation: shimmer 2s linear infinite;
                }

                .page .gallery-grid .gallery-item:hover {
                    transform: translateY(-10px) scale(1.015);
                    box-shadow: 0 25px 70px rgba(28, 24, 48, 0.10), 0 8px 24px rgba(28, 24, 48, 0.04);
                    border-color: #d6d0bf;
                }

                .page .gallery-grid .gallery-item:active {
                    transform: translateY(-3px) scale(0.98);
                    transition-duration: 0.1s;
                }

                .page .gallery-grid .gallery-item .image-wrapper {
                    position: relative;
                    overflow: hidden;
                    height: 220px;
                }

                .page .gallery-grid .gallery-item .image-wrapper img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    transition: transform 0.6s ease;
                }

                .page .gallery-grid .gallery-item:hover .image-wrapper img {
                    transform: scale(1.06);
                }

                .page .gallery-grid .gallery-item .image-wrapper .placeholder {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #eae7dd, #d6d0bf);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 48px;
                    color: rgba(28, 24, 48, 0.1);
                }

                .page .gallery-grid .gallery-item .gallery-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(0deg, rgba(28, 24, 48, 0.4) 0%, transparent 60%);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    padding: 20px;
                    z-index: 1;
                }

                .page .gallery-grid .gallery-item:hover .gallery-overlay {
                    opacity: 1;
                }

                .page .gallery-grid .gallery-item .gallery-overlay span {
                    color: #ffffff;
                    font-size: 12px;
                    font-weight: 600;
                    background: rgba(0, 0, 0, 0.4);
                    padding: 6px 16px;
                    border-radius: 20px;
                    backdrop-filter: blur(4px);
                }

                .page .gallery-grid .gallery-item .gallery-info {
                    padding: 16px 20px 18px;
                }

                .page .gallery-grid .gallery-item .gallery-info h4 {
                    font-family: 'Inter', sans-serif;
                    font-size: 15px;
                    font-weight: 600;
                    color: #1c1830;
                    margin: 0 0 4px 0;
                    letter-spacing: -0.01em;
                }

                .page .gallery-grid .gallery-item .gallery-info p {
                    font-size: 13px;
                    color: #8a8676;
                    margin: 0 0 8px 0;
                    line-height: 1.4;
                }

                .page .gallery-grid .gallery-item .gallery-info .meta {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 11px;
                    color: #b5b0a4;
                }

                .page .gallery-grid .gallery-item .gallery-info .meta span {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .page .gallery-grid .gallery-item .type-badge {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    font-size: 10px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.04em;
                    color: #ffffff;
                    background: rgba(28, 24, 48, 0.6);
                    backdrop-filter: blur(4px);
                    padding: 4px 12px;
                    border-radius: 12px;
                    z-index: 3;
                }

                /* ===== EMPTY STATE ===== */
                .page .empty-state {
                    text-align: center;
                    padding: 80px 32px;
                    background: #ffffff;
                    border: 1px solid #eae7dd;
                    border-radius: 18px;
                    animation: fadeInScale 0.5s ease both;
                    transition: all 0.3s ease;
                }

                .page .empty-state:hover {
                    border-color: #d6d0bf;
                    box-shadow: 0 4px 20px rgba(28, 24, 48, 0.04);
                }

                .page .empty-state .empty-icon {
                    font-size: 64px;
                    display: block;
                    margin-bottom: 16px;
                    animation: float 3s ease-in-out infinite;
                }

                .page .empty-state h3 {
                    font-family: 'Fraunces', serif;
                    font-size: 24px;
                    font-weight: 600;
                    color: #1c1830;
                    margin: 0 0 8px 0;
                }

                .page .empty-state p {
                    font-size: 14px;
                    color: #8a8676;
                    line-height: 1.7;
                    margin: 0 0 20px 0;
                    max-width: 400px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .page .empty-state .btn {
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    font-weight: 600;
                    padding: 12px 28px;
                    border-radius: 10px;
                    border: 1px solid transparent;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: linear-gradient(135deg, #e29a4d, #d48a3a);
                    color: #ffffff;
                    border-color: #e29a4d;
                    box-shadow: 0 2px 12px rgba(226, 154, 77, 0.25);
                }

                .page .empty-state .btn:hover {
                    background: linear-gradient(135deg, #f0c27a, #e29a4d);
                    transform: translateY(-2px) scale(1.02);
                    box-shadow: 0 8px 30px rgba(226, 154, 77, 0.35);
                }

                /* ===== RESPONSIVE ===== */
                @media (max-width: 820px) {
                    .page {
                        padding: 32px 16px 48px;
                    }

                    .page .page-intro {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 12px;
                    }

                    .page .page-intro h1 {
                        font-size: 32px;
                    }

                    .page .page-intro .count-badge {
                        align-self: flex-start;
                    }

                    .page .gallery-grid {
                        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                        gap: 18px;
                    }

                    .page .gallery-grid .gallery-item .image-wrapper {
                        height: 180px;
                    }

                    .page .gallery-grid .gallery-item:hover {
                        transform: translateY(-6px) scale(1.01);
                    }
                }

                @media (max-width: 480px) {
                    .page {
                        padding: 20px 12px 36px;
                    }

                    .page .page-intro h1 {
                        font-size: 26px;
                    }

                    .page .page-intro p {
                        font-size: 14px;
                    }

                    .page .gallery-grid {
                        grid-template-columns: 1fr;
                        gap: 16px;
                    }

                    .page .gallery-grid .gallery-item .image-wrapper {
                        height: 200px;
                    }

                    .page .gallery-grid .gallery-item:hover {
                        transform: translateY(-4px) scale(1.005);
                    }

                    .page .empty-state {
                        padding: 40px 20px;
                    }

                    .page .empty-state .empty-icon {
                        font-size: 48px;
                    }

                    .page .empty-state h3 {
                        font-size: 20px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .page * {
                        animation: none !important;
                        transition: none !important;
                    }
                    .page .gallery-grid .gallery-item::before {
                        display: none !important;
                    }
                }
            `}</style>

            <div className="container">
                {/* Page Intro */}
                <div className="page-intro">
                    <div>
                        <div className="eyebrow">📸 EVENT MEMORIES</div>
                        <h1>Gallery</h1>
                        <p>Photos and videos shared by EventSphere organizers.</p>
                    </div>
                    {!loading && (
                        <div className="count-badge">
                            <strong>{items.length}</strong> {items.length === 1 ? 'memory' : 'memories'}
                        </div>
                    )}
                </div>

                {/* Content */}
                {loading ? (
                    <Loader />
                ) : (
                    <div className="gallery-grid">
                        {items.map((item) => (
                            <div key={item._id} className="gallery-item">
                                <div className="image-wrapper">
                                    {item.imageUrl ? (
                                        <img 
                                            src={item.imageUrl} 
                                            alt={item.title || "Gallery image"}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.parentElement.innerHTML = `
                                                    <div class="placeholder">📷</div>
                                                `;
                                            }}
                                        />
                                    ) : (
                                        <div className="placeholder">📷</div>
                                    )}
                                    <div className="gallery-overlay">
                                        <span>🔍 View</span>
                                    </div>
                                    <span className="type-badge">
                                        {item.type || '📷 Photo'}
                                    </span>
                                </div>
                                <div className="gallery-info">
                                    <h4>{item.title || "Untitled"}</h4>
                                    <p>{item.description || "No description available."}</p>
                                    <div className="meta">
                                        <span>📅 {new Date(item.createdAt).toLocaleDateString()}</span>
                                        {item.event && (
                                            <span>🎯 {typeof item.event === 'object' ? item.event.title : 'Event'}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && items.length === 0 && (
                    <div className="empty-state">
                        <span className="empty-icon">🖼️</span>
                        <h3>No memories yet</h3>
                        <p>
                            No photos or videos have been uploaded yet. 
                            Check back later for event memories!
                        </p>
                        <Link className="btn" to="/events">
                            Browse Events →
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}