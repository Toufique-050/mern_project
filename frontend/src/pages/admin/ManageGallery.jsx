import { useEffect, useState } from "react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import Loader from "../../components/common/Loader";
import GalleryGrid from "../../components/gallery/GalleryGrid";
import {
  getGallery,
  deleteMedia
} from "../../services/mediaService";
import { errorMessage } from "../../utils/helpers";

export default function ManageGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");

  const loadGallery = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getGallery();

      console.log("Gallery response:", data);

      setItems(data.media || []);
    } catch (error) {
      console.error("Gallery loading error:", error);

      setError(
        errorMessage(
          error,
          "Unable to load gallery."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this media?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setBusy(id);

      await deleteMedia(id);

      await loadGallery();
    } catch (error) {
      console.error("Delete media error:", error);

      alert(errorMessage(error));
    } finally {
      setBusy("");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="dashboard-page">
      <div className="container">

        <DashboardHeader
          eyebrow="ADMIN"
          title="Manage gallery"
          description="Review and manage event photos and media."
        />

        {error && (
          <div className="alert error">
            {error}
          </div>
        )}

        {!error && items.length === 0 && (
          <div className="empty-state">
            No gallery media has been uploaded yet.
          </div>
        )}

        {items.length > 0 && (
          <GalleryGrid
            items={items}
            onDelete={handleDelete}
            busy={busy}
          />
        )}

      </div>
    </main>
  );
}