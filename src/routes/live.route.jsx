import LivePreviewDetailPage from "@/features/live/DetailPreview";
import LiveGraphReportPage from "@/features/live/GraphicPage";
import LivePreviewPage from "@/features/live/PreviewPage";
import { Route } from "react-router-dom";

export const liveRoutes = (
  <>
    <Route path="/live/preview" element={<LivePreviewPage />} />
    <Route path="/live/preview-detail" element={<LivePreviewDetailPage />} />
    {/* <Route path="/live/report" element={<LiveReportPage />} /> */}
    <Route path="/live/graph" element={<LiveGraphReportPage />} />
  </>
);
