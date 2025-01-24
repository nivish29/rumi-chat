import React, { useState, useRef, useCallback, memo } from "react";
import {
  PictureAsPdfOutlined,
  TableChartOutlined,
} from "@mui/icons-material";
import {
  Box,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import RichTextRenderer from "./RichTextRenderer";
import DataTable from "./DataTable";
import Charts from "./Charts";
import ImageCards from "./ImageCards";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CSVLink } from "react-csv";

const ExportMenu = memo(({ anchorEl, onClose, onExport, showCSV }) => (
  <Menu
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
    onClose={onClose}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
  >
    <MenuItem onClick={() => onExport("pdf")}>
      <ListItemIcon>
        <PictureAsPdfOutlined fontSize="small" />
      </ListItemIcon>
      <ListItemText>Export as PDF</ListItemText>
    </MenuItem>
    {showCSV && (
      <MenuItem onClick={() => onExport("csv")}>
        <ListItemIcon>
          <TableChartOutlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>Export as CSV</ListItemText>
      </MenuItem>
    )}
  </Menu>
));

const MainVisuals = ({ content }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const contentRef = useRef(null);
  const csvLinkRef = useRef(null);

  const handleExportClick = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleExport = useCallback(
    async (format) => {
      handleClose();

      try {
        switch (format) {
          case "pdf":
            if (contentRef.current) {
              const canvas = await html2canvas(contentRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
              });
              const imgData = canvas.toDataURL("image/png");
              const pdf = new jsPDF({
                orientation: "landscape",
                unit: "px",
                format: [canvas.width / 2, canvas.height / 2],
              });
              pdf.addImage(
                imgData,
                "PNG",
                0,
                0,
                canvas.width / 2,
                canvas.height / 2
              );
              pdf.save(`${content.title || "export"}.pdf`);
            }
            break;

          case "csv":
            if (content.type === "table" && csvLinkRef.current) {
              csvLinkRef.current.link.click();
            }
            break;
        }
      } catch (error) {
        console.error("Export failed:", error);
      }
    },
    [content.title]
  );

  const renderExportOptions = useCallback(() => {
    if (
      !["table", "line-chart", "pie-chart", "bar-chart"].includes(content.type)
    ) {
      return null;
    }

    const csvData = content.type === "table" ? content.data : [];

    return (
      <>
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 1,
            zIndex: 50,
          }}
        ></Box>

        <ExportMenu
          anchorEl={anchorEl}
          onClose={handleClose}
          onExport={handleExport}
          showCSV={content.type === "table"}
        />

        {content.type === "table" && (
          <CSVLink
            data={csvData}
            filename={`${content.title || "export"}.csv`}
            ref={csvLinkRef}
            style={{ display: "none" }}
          />
        )}
      </>
    );
  }, [content.type, anchorEl, handleClose, handleExport, handleExportClick]);

  const renderContent = useCallback(() => {
    const animationProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.2 },
    };

    const animationWrapper = (children) => (
      <motion.div {...animationProps}>
        <Box
          ref={contentRef}
          sx={{
            bgcolor: "white",
            borderRadius: 4,
            boxShadow: 1,
            p: 4,
            width: "100%",
          }}
        >
          {children}
        </Box>
      </motion.div>
    );
    console.log(content.data);

    switch (content.type) {
      case "text":
        return animationWrapper(<RichTextRenderer content={content.data} />);

      case "code":
        return animationWrapper(
          <RichTextRenderer content={content.fullResponse} />
        );

      case "table":
        return animationWrapper(
          <div>
            <DataTable data={content.data} columns={content.columns} />
          </div>
        );

      case "line-chart":
        return animationWrapper(
          <Charts.LineChartComponent
            data={content.data}
            xKey={content.xKey}
            yKey={content.yKey}
            title={content.title}
          />
        );

      case "pie-chart":
        return animationWrapper(
          <Charts.PieChartComponent
            data={content.data}
            dataKey={content.dataKey}
            nameKey={content.nameKey}
            title={content.title}
          />
        );

      case "bar-chart":
        return animationWrapper(
          <Charts.BarChartComponent
            data={content.data}
            xKey={content.xKey}
            yKey={content.yKey}
            title={content.title}
          />
        );

      case "images":
        return animationWrapper(
          <ImageCards images={content.data} title={content.title} />
        );

      default:
        return animationWrapper(<RichTextRenderer content={content.data} />);
    }
  }, [content]);

  return (
    <Box sx={{ width: "100%", my: 2, position: "relative" }}>
      <RichTextRenderer content={content.fullResponse} />
      {content.fullResponse === "" ? null : renderContent()}
      {content.fullResponse === "" ? null : (
        <div className="flex justify-end hover:cursor-pointer">
          <Tooltip title="Export">
            <div
              className="mt-3 rounded-lg bg-white shadow-lg "
              onClick={handleExportClick}
              style={{
                backgroundImage:
                  "radial-gradient(circle at top left, #BCF6D6, #B8D9CB, #90D3C8)",
              }}
            >
              <h2 className="justify-end px-3 py-1 text-end text-xs font-normal tracking-wide ">
                Export
              </h2>
            </div>
          </Tooltip>
        </div>
      )}
      {renderExportOptions()}
    </Box>
  );
};

export default memo(MainVisuals);
